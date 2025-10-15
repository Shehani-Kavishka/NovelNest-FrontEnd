import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View , ActivityIndicator, Alert} from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import { colors } from '../utils/colors';
import { useNavigation, useRoute } from '@react-navigation/native';

import { db } from '../firebaseConfig';
import { doc, getDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';

const ViewChaptersScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { storyId } = route.params || {} ;

    const [storyData, setStoryData] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchStoryAndChapters = async () => {
        if (!storyId) {
          console.error('No storyId provided in route params');
          Alert.alert('Error', 'No storyId provided');
          setLoading(false);
          return;
        }

        try {
          // Fetch story details
          const storyDocRef = doc(db, 'stories', storyId);
          const storyDocSnap = await getDoc(storyDocRef);

          if (storyDocSnap.exists()) {
            setStoryData(storyDocSnap.data());
          } else {
            console.error('No such story document!');
            Alert.alert('Error', 'Story not found');
            navigation.goBack();
            return;
          }

          const chaptersRef = collection(db, 'stories', storyId, 'chapters');
          const q = query(chaptersRef, where("chapterStatus", "==", "published"), orderBy('chapterNo', 'asc'));

          const querySnapshot = await getDocs(q);
          const chaptersList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setChapters(chaptersList);
        }
        catch (error) {
          console.error('Error fetching story or chapters:', error);
          Alert.alert('Error', 'Failed to load story or chapters');
        } finally {
          setLoading(false);
        }
      };

      fetchStoryAndChapters();
    }, [storyId]);

        const goToChapter = (chapterId) => {
            navigation.navigate("read", {
            storyId: storyId,
            chapterId: chapterId
        });
        }

    if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  if (!storyData) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.headingText}>Story not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bookdetails}>
          <Image
            source={{ uri: storyData.storyCoverImageUrl }}
            style={styles.MainBookCover}
          />
          <Text style={styles.headingText}>{storyData.storyTitle}</Text>
          <Text style={[styles.author,{marginVertical:0}]}>{storyData.author}</Text>
        </View>

        <View style={styles.chapterList}>
                    {chapters.length > 0 ? (
                        chapters.map(chapter => (
                            <TouchableOpacity key={chapter.id} onPress={() => goToChapter(chapter.id)}>
                                <Text style={styles.author}>{chapter.chapterTitle}</Text>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text style={styles.author}>No published chapters yet.</Text>
                    )}
                </View>
      </ScrollView>
    </View>
  );
};

export default ViewChaptersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    
  },
  MainBookCover: {
    height: 150,
    width: 120,
    marginBottom: 20,
  },
  bookdetails: {
    alignItems: 'center',
    gap: 10,
  },
  author: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
    marginVertical:10
  },
  Booktype: {
    color: colors.white,
    fontSize: 13,
    fontWeight: 'bold',
    backgroundColor: colors.secondary,
    // height:25,
    width: 90,
    borderRadius: 25,
    textAlign: 'center',
    paddingVertical: 5,
  },
  headingText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
  chapterList:{
   alignItems:'left',
   marginLeft:50,
   marginTop:30
  }
});
