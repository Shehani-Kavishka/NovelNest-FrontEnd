import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
  Modal,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-native-paper';
import { colors } from '../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomNavBar from '../components/BottomNavBar';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import { auth, db, functions } from '../firebaseConfig';
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';

const EditMyStoriesScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'No user is currently logged in.');
      setLoading(false);
      return;
    }

    const storiesRef = collection(db, 'stories');
    const q = query(
      storiesRef,
      where('authorId', '==', user.uid),
      where('status', '!=', 'draft'),
    );

    const unsubscribe = onSnapshot(
      q,
      querySnapshot => {
        const fetchedStories = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStories(fetchedStories);
        setLoading(false);
      },
      error => {
        console.error('Error fetching stories: ', error);
        Alert.alert('Error', 'There was an error fetching your stories.');
        setLoading(false);
      },
    );
    return () => unsubscribe();
  }, [isFocused]);

  const openMenu = story => {
    setSelectedStory(story);
    setModalVisible(true);
  };

  const handleHideStory = async () => {
    if (!selectedStory) return;
    setModalVisible(false);

    try {
      const hideStoryFunc = httpsCallable(functions, 'story-hide');
      const result = await hideStoryFunc({ storyId: selectedStory.id });
      Alert.alert('Success', result.data.message);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleDeleteStory = async () => {
    if (!selectedStory) return;
    setModalVisible(false);

    Alert.alert(
      'Delete Story',
      `Are you sure you want to permanently delete "${selectedStory.storyTitle}"? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const deleteStoryFunc = httpsCallable(functions, 'story-delete');
              await deleteStoryFunc({ storyId: selectedStory.id });
              Alert.alert('Success', 'Story has been deleted.');
            } catch (error) {
              Alert.alert('Error', error.message);
            }
          },
        },
      ],
    );
  };

  const gotoEditStoryPublished = storyId => {
    // Navigate to a screen where you can edit the story info or chapters
    // You would pass the storyId here
    navigation.navigate('edit-story-published', { storyId: storyId });
  };

  const renderStoryItem = ({ item }) => (
    <View style={styles.listItem}>
      <TouchableOpacity onPress={() => gotoEditStoryPublished(item.id)}>
        <Image
          source={{ uri: item.storyCoverImageUrl }}
          style={styles.bookCover}
        />
      </TouchableOpacity>
      <View style={styles.bookDetails}>
        <Text style={styles.subText}>{item.storyTitle}</Text>
        <Text style={styles.authorText}>
          Drafts: {item.chapterCount?.drafts || 0}
        </Text>
        <Text style={styles.authorText}>
          Published: {item.chapterCount?.published || 0}
        </Text>
        <View style={styles.statsContainer}>
          <View style={styles.statsSubContainer}>
            <Icon name="eye" size={15} color="white" />
            <Text style={styles.textStyle}>{item.readCount || 0}</Text>
          </View>
          <View style={styles.statsSubContainer}>
            <Icon name="star" size={15} color="white" />
            <Text style={styles.textStyle}>{item.rateCount || 0}</Text>
          </View>
          <View style={styles.statsSubContainer}>
            <Icon name="comments" size={15} color="white" />
            <Text style={styles.textStyle}>{item.commentCount || 0}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => openMenu(item)}
        style={styles.moreButton}
      >
        <Icon name="ellipsis-v" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>My Stories</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.white }]}
        >
          <Text style={[styles.buttonText, { color: colors.primary }]}>
            Published
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.secondary }]}
          onPress={() => navigation.navigate('edit-story-drafts')}
        >
          <Text style={[styles.buttonText, { color: colors.white }]}>
            Drafts
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={stories}
        renderItem={renderStoryItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            You have no published stories yet.
          </Text>
        }
      />

      {/* Options Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleHideStory}
            >
              <Text style={styles.modalButtonText}>
                {selectedStory?.status === 'hidden'
                  ? 'Unhide Story'
                  : 'Hide Story'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleDeleteStory}
            >
              <Text style={[styles.modalButtonText, styles.deleteText]}>
                Delete Story
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default EditMyStoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 170,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 20,
    marginLeft: 40,
  },

  list: {
    flexDirection: 'column',
    marginTop: 30,
    marginBottom: 100,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    justifyContent: 'center',
  },
  bookCover: {
    width: 80,
    height: 120,
  },
  tagItem: {
    color: colors.white,
    fontSize: 13,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 15,
    textAlign: 'center',
    verticalAlign: 'middle',
    marginHorizontal: 20,
  },

  fieldText: {
    fontSize: 15,
    color: colors.white,
    fontWeight: 'bold',
    marginInlineEnd: 110,
  },
  countContainer: {
    flexDirection: 'row',
    marginTop: 30,
    gap: 50,
    marginLeft: 20,
  },
  bookDetails: {
    flexDirection: 'column',
    marginLeft: 30,
    width: 230,
  },
  subText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 10,
  },
  authorText: {
    color: colors.white,
  },
  moreContainer: {
    width: 200,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 15,
  },
  statsSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  textStyle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'justify',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 50,
    marginBottom: 20,
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    width: 110,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  moreButton: {
    marginTop: -50,
  },
  emptyText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: colors.secondary,
    borderRadius: 15,
    padding: 20,
    width: '80%',
    elevation: 5,
  },
  modalButton: {
    paddingVertical: 15,
  },
  modalButtonText: {
    color: colors.white,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  deleteText: {
    color: colors.red,
  },
});
