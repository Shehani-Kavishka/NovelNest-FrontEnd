import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { colors } from '../utils/colors'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';

import { db, auth } from '../firebaseConfig';
import { doc, getDoc, setDoc, deleteDoc, serverTimestamp, collection, query, where, getDocs, orderBy } from 'firebase/firestore';

// const mockNovelData = {
//     Title: 'My First Love',
//     'Author name': 'Elara Vance',
//     Status: 'Ongoing',
//     'Read count': 12700,
//     'Rating count': 856,
//     Description: 'In a city powered by forgotten magic, a disgraced cartographer discovers a map that leads not to treasure, but to a labyrinth that reshapes itself. She must navigate its shifting walls to uncover a truth that could save her city or shatter it forever.',
//     Tags: ['Romance', 'Young', 'Teenagers'],
//     Genre: 'Romance', // Needed for the similar stories logic
// };

// const mockChaptersData = [
//     { id: 'chap1', 'Chapter title': 'The Inked Anomaly', 'Published date': { seconds: 1672531200 } }, // Jan 1, 2023
//     { id: 'chap2', 'Chapter title': 'Whispers in the Walls', 'Published date': { seconds: 1673136000 } }, // Jan 8, 2023
//     { id: 'chap3', 'Chapter title': 'A Compass of Bone', 'Published date': { seconds: 1673740800 } }, // Jan 15, 2023
//     { id: 'chap4', 'Chapter title': 'The Shifting City', 'Published date': { seconds: 1674345600 } }, // Jan 22, 2023
// ];

const StoryDetailsScreen = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const {storyId} = route.params;

   const [storyData, setStoryData] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [isInLibrary, setIsInLibrary] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAllData = async () => {
            if (!storyId) {
                Alert.alert("Error", "No story ID provided.");
                setLoading(false);
                return;
            }
            const user = auth.currentUser;

            try {
                // 1. Fetch the main story document
                const storyDocRef = doc(db, 'stories', storyId); // Use the exact collection name
                const storyDocSnap = await getDoc(storyDocRef);

                if (storyDocSnap.exists()) {
                    setStoryData(storyDocSnap.data());
                }else{
                  Alert.alert("Error", "Story not found.");
                  navigation.goBack();
                  return;
                }

                 const chaptersRef = collection(db, 'stories', storyId, 'chapters');
                const q = query(chaptersRef, where("chapterStatus", "==", "published"), orderBy("chapterNo", "asc"));
                const querySnapshot = await getDocs(q);
                const chaptersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setChapters(chaptersList);

                if (user) {
                    const libraryDocRef = doc(db, 'users', user.uid, 'library', storyId);
                    const libraryDocSnap = await getDoc(libraryDocRef);
                    setIsInLibrary(libraryDocSnap.exists());
                }

                } catch (error) {
                console.error("Error fetching story details:", error);
                Alert.alert("Error", "Could not load story details.");
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [storyId]); // Re-run if the storyId changes

                    
 const handleToggleLibrary = async () => {
        const user = auth.currentUser;
        if (!user) {
            Alert.alert("Login Required", "Please log in to add stories to your library.");
            return;
        }

        const libraryDocRef = doc(db, 'users', user.uid, 'library', storyId);

        if (isInLibrary) {
            // Remove from library
            await deleteDoc(libraryDocRef);
            setIsInLibrary(false);
            Alert.alert("Removed", `${storyData.storyTitle} has been removed from your library.`);
        } else {
            // Add to library
            await setDoc(libraryDocRef, {
                addedAt: serverTimestamp(),
                storyTitle: storyData.storyTitle,
                storyCoverImageUrl: storyData.storyCoverImageUrl,
                author: storyData.author,
                readingStatus: 'to read' // Initial status
            });
            setIsInLibrary(true);
            Alert.alert("Added", `${storyData.storyTitle} has been added to your library.`);
        }
    };


const handleRead = () => {
        if (chapters.length > 0) {
            navigation.navigate("read", { storyId: storyId, chapterId: chapters[0].id });
        } else {
            Alert.alert("No Chapters", "This story has no published chapters yet.");
        }
    };

    const formatCount = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num;
    };

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center' }]}>
                <ActivityIndicator size="large" color={colors.white} />
            </View>
        );
    }

    if (!storyData) {
        // This will show if the data fetch failed after loading
        return (
            <View style={[styles.container, { justifyContent: 'center' }]}>
                <Text style={styles.headingText}>Story could not be loaded.</Text>
            </View>
        );
    }


  return (
    <View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>

      <View style={styles.bookdetails}>
      <Image source={require("../assets/myfirstlove.jpg")}  style={styles.MainBookCover}/>
        <Text style={styles.headingText}>{novelData.Title}</Text>
        <Text style={styles.author}>{novelData['Author name']}</Text>
        <Text style={styles.Booktype}>{novelData.Status}</Text>
      </View>

      <View style={styles.statsContainer}>

        <View style={styles.statsSubContainer}>
          <Icon name="eye" size={15} color={colors.white}/>
          <Text style={styles.textStyle}>{formatCount(novelData['Read count'])} Reads</Text>
        </View>

        <View style={styles.statsSubContainer}>
          <Icon name="star" size={15} color={colors.white}/>
          <Text style={styles.textStyle}>{formatCount(novelData['Rating count'])} Rates</Text>
        </View>

        <View style={styles.statsSubContainer}>
          <Icon name="list" size={15} color={colors.white}/>
          <Text style={styles.textStyle}>{chapters.length} Parts</Text>
        </View>

      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button,{backgroundColor:colors.secondary}]} onPress={handleRead}>
          <Text style={[styles.buttonText,{color:colors.white}]}>
            Read
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: isInLibrary ? colors.secondary : colors.white }]} onPress={handleToggleLibrary}>
                        <Text style={[styles.buttonText, { color: isInLibrary ? colors.white : colors.primary }]}>
                            {isInLibrary ? '✓ In Library' : '+ Library'}
                        </Text>
                    </TouchableOpacity>
      </View>

      <View style={styles.storyDescription}>
        <Text style={[styles.textStyle,{fontWeight:'regular'}]}>
          {novelData.Description}
        </Text>
      </View>

      <View style={styles.storyDescription}> 
        <View style={{flexDirection:'row',gap:180}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Icon name="list" size={15} color={colors.white}/>
            <Text style={styles.textStyle}>{chapters.length} Parts</Text>
          </View>
          <Text style={styles.Booktype}>{novelData.Status}</Text>
        </View>
        <View style={{flexDirection:'row',gap:210,marginTop:20}}>
          {chapters.slice(0, 5).map(chapter => (
              <View key={chapter.id} style={{flexDirection:'row', justifyContent:'space-between', marginBottom: 5}}>
                  <Text style={[styles.textStyle,{fontWeight:'normal'}]}>{chapter['Chapter title']}</Text>
                  <Text style={[styles.textStyle,{fontWeight:'normal'}]}>{new Date(chapter['Published date'].seconds * 1000).toLocaleDateString()}</Text>
              </View>
          ))}
          {chapters.length > 5 && <Text style={styles.textStyle}>... and more</Text>}

        </View>
      </View>

      <View style={styles.tagList}>
        {novelData.Tags.map((tag, index) => (
            <Text key={index} style={styles.tagItem}>{tag}</Text>
        ))}

      </View>

      <View style={styles.recommandsContainer}>
              <Text style={styles.headingText}>Similar Stories</Text>
              <View style={styles.list}>
                        <View style={styles.listItem}>
                          <TouchableOpacity>
                            <Image source={require("../assets/oursecretlove.jpg")} style={styles.bookCover}/>
                          </TouchableOpacity>
                          <Text style={styles.bookTitle}>Our Secret Love</Text>
                        </View>
                        <View style={styles.listItem}>
                          <TouchableOpacity>
                            <Image source={require("../assets/love.jpg")} style={styles.bookCover}/>
                          </TouchableOpacity>
                          <Text style={styles.bookTitle}>Love</Text>
                        </View>
                        <View style={styles.listItem}>
                          <TouchableOpacity>
                            <Image source={require("../assets/waitingforyou.jpg")} style={styles.bookCover}/>
                          </TouchableOpacity>
                          <Text style={styles.bookTitle}>Waiting For You</Text>
                        </View>
                        <View style={styles.listItem}>
                          <TouchableOpacity>
                            <Image source={require("../assets/fightingfor.jpg")} style={styles.bookCover}/>
                          </TouchableOpacity>
                          <Text style={styles.bookTitle}>Fighting For</Text>
                        </View>
                      </View>
            </View>
    </ScrollView>          
    </View>
  )
}

export default StoryDetailsScreen

const styles = StyleSheet.create({
  container:{
        flex:1,
        backgroundColor:colors.primary,
        justifyContent:'center',
        alignItems:'center'
      },
      headingText:{
        fontSize:22,
        fontWeight:"bold",
        color:colors.white,
        textAlign:'center'
      },
      list:{
        flexDirection:"row",
        marginVertical:30,
        gap:25
      },
      listItem:{
        flexDirection:'column'
      },
      bookCover:{
        width:70,
        height:90
      },
      bookTitle:{
        fontSize:13,
        width:70,
        fontWeight:"bold",
        color:colors.white,
        marginTop:10
      },
      MainBookCover:{
        height:150,
        width:120,
        marginBottom:20
      },
      bookdetails:{
        alignItems:'center',
        gap:10
      },
      mainTitle:{
        color:colors.white,
        fontSize:22,
        fontWeight:'bold'
      },
      author:{
        fontSize:16,
        color:colors.white,
        fontWeight:'bold'
      },
      Booktype:{
        color:colors.white,
        fontSize:13,
        fontWeight:"bold",
        backgroundColor:colors.secondary,
        // height:25,
        width:90,
        borderRadius:25,
        textAlign:'center',
        paddingVertical:5
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
      buttonContainer:{
        flexDirection:'row',
        gap:50,
        marginBottom:20,
        justifyContent:'center'
      },
      button:{
        width:120,
        height:40,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center'
      },
      buttonText:{
        fontSize:18,
        fontWeight:'bold'
      },
      storyDescription:{
        borderColor:colors.secondary,
        borderWidth:1,
        width:360,
        padding:10,
        marginVertical:10
      },
      tagList:{
        flexDirection:'row',
        gap:20,
        marginTop:10,
        justifyContent:'center'
      },
      tagItem:{
        color:colors.white,
        fontSize:13,
        fontWeight:'bold',
        borderWidth:1,
        borderColor:colors.secondary,
        borderRadius:25,
        paddingVertical:5,
        paddingHorizontal:15,
        textAlign:'center',
        verticalAlign:'middle'
      },
      recommandsContainer:{
        marginVertical:15
      },

})