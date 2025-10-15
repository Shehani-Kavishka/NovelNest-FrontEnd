import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { colors } from '../utils/colors'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import BookSettingsBar from '../components/BookReactionsBar';


import { db } from '../firebaseConfig';
import { doc, getDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';


const ReadScreen = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const {storyId, chapterId} = route.params || {};

  const [chapterData, setChapterData] = useState(null);
  const [novelData, setNovelData] = useState(null);
  const [allChapters, setAllChapters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapter = async () => {
      if (!storyId || !chapterId) {
        Alert.alert('Error', 'Story ID or Chapter ID is missing.');
        navigation.goBack();
        return;
      }
      setLoading(true);

      try {
        const chapterDocRef = doc(db, 'stories', storyId, 'chapters', chapterId);
        const chapterSnap = await getDoc(chapterDocRef);

        if(!chapterSnap.exists()) {
          Alert.alert('Error', 'Chapter not found.');
          navigation.goBack();
          return;
        }
        setChapterData(chapterSnap.data());

        const chaptersRef = collection(db, 'stories', storyId, 'chapters');
        const q = query(chaptersRef, where ("status","==", "published"), orderBy("chapterNo","asc"))
        const chaptersSnapshot = await getDocs(q);
        const chaptersList = chaptersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllChapters(chaptersList);

        const currentChapterIndex = chaptersList.findIndex(chap => chap.id === chapterId);
        setCurrentIndex(currentChapterIndex);

        const storyDocRef = doc(db, 'stories', storyId);
        const storySnap = await getDoc(storyDocRef);
        if(storySnap.exists()) {
          setNovelData(storySnap.data());
        }

        
          const functions = getFunctions();
          const incrementReadCount = httpsCallable(functions, 'story-incrementReadCount');
          await incrementReadCount({ storyId, chapterId });
        }
        catch(error){
          console.error("Could not update read count:",error)
        }
        finally{
          setLoading(false)
        }
      };
      fetchChapter();
    },[storyId, chapterId]);

    const handleNextChapter = () => {
      if(currentIndex > -1 && currentIndex< allChapters.length-1){
        const nextChapter = allChapters[currentIndex+1]
        navigation.push('read',{
          storyId:storyId,
          chapterId:nextChapter.id,
        })
      }
    }

    if(loading){
      return (
        <View style={[styles.container, { justifyContent: 'center' }]}>
                <ActivityIndicator size="large" color={colors.white} />
            </View>
      )
    }

    if (!chapterData) {
        return (
            <View style={[styles.container, { justifyContent: 'center' }]}>
                <Text style={styles.headingText}>Could not load chapter.</Text>
            </View>
        );
    }

    const isLastChapter = currentIndex === allChapters.length - 1;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={styles.headingText}>{chapterData['chapterTitle']}</Text>

        <View style={styles.statsContainer}>
            <View style={styles.statsSubContainer}>
                <Icon name="eye" size={15} color={colors.white}/>
                <Text style={styles.textStyle}>{chapterData['readCount'] || 0} Reads</Text>
            </View>

            <View style={styles.statsSubContainer}>
                <Icon name="star" size={15} color={colors.white}/>
                <Text style={styles.textStyle}>{chapterData['rateCount'] || 0} Rates</Text>
            </View>

            <View style={styles.statsSubContainer}>
                <Icon name="list" size={15} color={colors.white}/>
                <Text style={styles.textStyle}>{novelData ? `${allChapters.length} Parts` : '...'}</Text>
            </View>
        </View>

        <View>
        
        <Text style={styles.storyChapterPara}>
          {chapterData['chapterContent'].replace(/\\n/g, '\n\n')}
          </Text>

        </View>

      {!isLastChapter && (
        <View style={styles.nextButtonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNextChapter}>
          <Text style={styles.nextText}>Next Chapter </Text>
          <Icon name={'angle-right'} size={30} color={colors.white}/>
        </TouchableOpacity>
        </View>
      )}

      </ScrollView>

      <BookSettingsBar storyId={storyId} chapterId={chapterId} />
    </View>
  )
}

export default ReadScreen

const styles = StyleSheet.create({
    container:
    {
        flex:1,
        backgroundColor:colors.primary,
        justifyContent:'center',
        alignItems:'center'
    },
    headingText:
    {
        fontSize:22,
        fontWeight:"bold",
        color:colors.white,
        textAlign:'center'
    },
    statsContainer:{
        flexDirection:'row',
        gap:30,
        marginVertical:25,
        justifyContent:'center'
      },
      statsSubContainer:{
        flexDirection:'row',
        alignItems:'center',
        gap:5
      },
      textStyle:{
        fontSize:13,
        fontWeight:'bold',
        color:colors.white,
        textAlign:'justify'
      },
      storyChapterPara:{
        width:350,
        color:colors.white,
        fontSize:13,
        textAlign:'justify',
        marginVertical:20,
        lineHeight:30
      },
      nextText:{
        color:colors.white,
        fontSize:20,
        fontWeight:'bold'
      },
      nextButtonContainer:{
        alignItems:'flex-end',
        marginTop:10,
        marginBottom:100
      },
      nextButton:{
        gap:20,
        flexDirection:'row',
      },
      
})