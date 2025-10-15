import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import { colors } from '../utils/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from 'react';

import { auth, db } from '../firebaseConfig';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { isDisabled } from 'react-native/types_generated/Libraries/LogBox/Data/LogBoxData';

const CommentsScreen = () => {
  const route = useRoute();
  const { storyId, chapterId, chapterTitle } = route.params;
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const commentsRef = collection(
      db,
      'stories',
      storyId,
      'chapters',
      chapterId,
      'comments',
    );
    const q = query(commentsRef, orderBy('commented-at', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      querySnapshot => {
        const commentsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(commentsData);
        setLoading(false);
      },
      error => {
        Alert.alert('Error', 'Failed to load comments.');
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [storyId, chapterId]);

  const handleSaveComment = async () => {
    if (!newCommentText.trim()) return;

    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'You must be logged in to post a comment.');
      return;
    }

    setIsSaving(true);

    const commentsRef = collection(
      db,
      'stories',
      storyId,
      'chapters',
      chapterId,
      'comments',
    );

    try {
      await addDoc(commentsRef, {
        'comment-content': newCommentText,
        'commented-at': serverTimestamp(),
        'sender-id': user.uid,
        'sender-username': user.displayName || 'Anonymous',
        'sender-profile-pic-url': user.photoURL || null,
      });

      setNewCommentText('');
    } catch (error) {
      Alert.alert('Error', 'Failed to save comment.');
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = timestamp => {
    if (!timestamp) return 'Just now';
    return new Date(timestamp.seconds * 1000).toLocaleString();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{chapterTitle || 'Comments'}</Text>
      <ScrollView>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.white}
            style={{ marginTop: 50 }}
          />
        ) : comments.length === 0 ? (
          <Text style={styles.noCommentsText}>Be the first to comment!</Text>
        ) : (
          <View style={styles.notificationsContainer}>
            <View style={styles.notification}>
              <Image
                source={
                  auth.currentUser?.photoURL
                    ? { uri: auth.currentUser.photoURL }
                    : require('../assets/profile-pic.jpg')
                }
                style={styles.profilepicture}
              />
              <View style={styles.commentBar}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Write your thoughts..."
                  placeholderTextColor={colors.primary}
                  multiline={true}
                  value={newCommentText}
                  onChangeText={setNewCommentText}
                />
              </View>
              <TouchableOpacity onPress={handleSaveComment} disabled={isSaving}>
                {isSaving ? (
                  <ActivityIndicator size="small" color={colors.white} />
                ) : (
                  <Icon name="share" size={25} color={colors.white} />
                )}
              </TouchableOpacity>
            </View>

            {comments.map(comment => (
              <View key={comment.id} style={styles.notification}>
                <Image
                  source={
                    comment['Sender profile pic url']
                      ? { uri: comment['Sender profile pic url'] }
                      : require('../assets/profile-common.png')
                  }
                  style={styles.profilepicture}
                />
                <View style={styles.notificationTextContainer}>
                  <Text style={styles.notificationWriter}>
                    {comment['Sender username']}
                  </Text>
                  <Text style={styles.notificationText}>
                    {comment['Comment content']}
                  </Text>
                  <Text style={styles.notificationTimeStamp}>
                    {formatDate(comment['Commented at'])}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
    marginVertical: 50,
    textAlign: 'center',
  },
  notificationsContainer: {
    marginHorizontal: 30,
    gap: 30,
  },
  profilepicture: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  notificationTextContainer: {
    flexDirection: 'column',
    width: 210,
  },
  notification: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  notificationText: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 13,
    marginBottom: 12,
  },
  notificationTimeStamp: {
    color: colors.secondary,
    fontSize: 11,
    marginVertical: 3,
  },
  notificationWriter: {
    color: colors.white,
    fontSize: 11,
  },
  bookcover: {
    height: 70,
    width: 60,
  },
  commentBar: {
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderRadius: 10,
    padding: 10,
    width: 250,
  },
  textInput: {
    color: colors.primary,
    fontSize: 13,
  },
});
