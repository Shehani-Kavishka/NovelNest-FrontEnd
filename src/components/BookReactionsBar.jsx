import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';

import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

const BookSettingsBar = ({ storyId, chapterId }) => {
  const navigation = useNavigation();

  const [isRated, setIsRated] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const checkRatingStatus = async () => {
      const user = auth.currentUser;
      if (!user || !storyId || !chapterId) return;

      // Path to the user's specific rating document
      const ratingDocRef = doc(
        db,
        'stories',
        storyId,
        'chapters',
        chapterId,
        'ratings',
        user.uid,
      );

      try {
        const docSnap = await getDoc(ratingDocRef);
        setIsRated(docSnap.exists());
      } catch (error) {
        console.error('Failed to check rating status:', error);
      }
    };

    checkRatingStatus();
  }, [storyId, chapterId]);

  const handleRateChapter = async () => {
    if (isProcessing) return; // Prevent double-clicks
    setIsProcessing(true);

    try {
      const functions = getFunctions();
      const toggleChapterRating = httpsCallable(
        functions,
        'story-toggleChapterRating',
      );

      const result = await toggleChapterRating({ storyId, chapterId });

      // Update the UI state based on the response from the function
      setIsRated(result.data.rated);
    } catch (error) {
      console.error('Rating failed:', error);
      Alert.alert('Error', 'Could not update your rating. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const viewChapters = () => 
    navigation.navigate('view-chapters', { storyId: storyId });
  const goToReadingPreferences = () =>
    navigation.navigate('reading-preferences');
  const goToComments = () =>
    navigation.navigate('chapter-comments', { storyId: storyId, chapterId: chapterId });

  return (
    <View style={styles.bottomReactionBar}>
      <TouchableOpacity onPress={handleRateChapter} disabled={isProcessing}>
         <Icon 
                    name={isRated ? "star" : "star-o"} 
                    size={25} 
                    color={isRated ? colors.white : colors.secondary} 
                />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToComments}>
        <Icon name="comments" size={25} color={colors.white} />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToReadingPreferences}>
        <Icon name="cog" size={25} color={colors.white} />
      </TouchableOpacity>
      <TouchableOpacity onPress={viewChapters}>
        <Icon name="list" size={25} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

export default BookSettingsBar;

const styles = StyleSheet.create({
  bottomReactionBar: {
    height: 50,
    backgroundColor: colors.secondary,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    alignItems: 'center',
  },
});
