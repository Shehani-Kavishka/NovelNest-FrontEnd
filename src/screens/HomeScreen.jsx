import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
  FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { colors } from '../utils/colors';
import { ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import BottomNavBar from '../components/BottomNavBar';

import { functions, auth } from '../firebaseConfig';
import { httpsCallable } from 'firebase/functions';
import { onAuthStateChanged } from 'firebase/auth';

// helper component for a horizontal list of stories
const StoryList = ({ title, stories, navigation }) => {
  const handleStoryClick = storyId => {
    navigation.navigate('story-details', { storyId });
  };

  if (!stories || stories.length === 0) {
    return null;
  }

  return (
    <View style={styles.recommandsContainer}>
      <Text style={styles.headingText}>{title}</Text>
      <FlatList
        data={stories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.storyId}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <TouchableOpacity onPress={() => handleStoryClick(item.storyId)}>
              <Image
                source={{ uri: item.storyCoverImageUrl }}
                style={styles.bookCover}
              />
            </TouchableOpacity>
            <Text style={styles.bookTitle} numberOfLines={2}>
              {item.storyTitle}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

// main home screen component

const HomeScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(true);
  const [homedata, setHomeData] = useState(null);
  const [userProfilePic, setUserProfilePic] = useState(null);

  useEffect(() => {
    if (isFocused) {
      const fetchHomeData = async () => {
        try {
          const getHomeScreenData = httpsCallable(
            functions,
            'story-getHomeScreenData',
          );
          const result = await getHomeScreenData();
          setHomeData(result.data);
          setUserProfilePic(auth.currentUser?.photoURL);
        } catch (error) {
          console.error('Error fetching home data:', error);
          Alert.alert(
            'Error',
            'Failed to load home data. Please try again later.',
          );
        } finally {
          setLoading(false);
        }
      };

      fetchHomeData();
    }
  }, [isFocused]);

  const handleProfilePress = () => {
    navigation.navigate('user-profile');
  };
  const handleBookClick = novelId => {
    navigation.navigate('story-details');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerArea}>
          <Image source={require('../assets/logo_icon.png')} />
          <Image source={require('../assets/novelnest-name.png')} />
          <TouchableOpacity onPress={handleProfilePress}>
            <Image
              source={
                userProfilePic
                  ? { uri: userProfilePic }
                  : require('../assets/profile-common.png')
              }
              style={styles.profilePic}
            />
          </TouchableOpacity>
        </View>

        {/* your reading list section */}
        {homeData?.readingList && homeData.readingList.length > 0 && (
          <View style={styles.readingListContainer}>
            <Text style={styles.headingText}>Your Reading List</Text>
            <Text style={styles.subText}>
              Pick up where you left off on your favorite stories
            </Text>

            <FlatList
              data={homedata.readingList}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.storyId}
              contentContainerStyle={styles.list}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('story-details', {
                        storyId: item.storyId,
                      })
                    }
                  >
                    <Image
                      source={{ uri: item.storyCoverImageUrl }}
                      style={styles.bookCover}
                    />
                  </TouchableOpacity>
                  <ProgressBar
                    progress={item.progress}
                    style={styles.progress}
                    color={colors.secondary}
                  />
                  <Text style={styles.partsText}>
                    {item.chaptersLeft} parts left
                  </Text>
                </View>
              )}
            />
          </View>
        )}

        {/* Must-Read Picks (This uses the topStoriesByGenre data) */}
        {homeData?.topStoriesByGenre && (
          <StoryList 
            title="Must-Read Picks for You"
            // Flatten all stories from favorite genres into one list
            stories={Object.values(homeData.topStoriesByGenre).flat()}
            navigation={navigation}
          />
        )}

        {/* Popular on NovelNest */}
        <StoryList
          title="Popular on NovelNest"
          stories={homeData?.popular}
          navigation={navigation}
        />

        {/* NEW SECTION 6: By Authors You Love */}
        {homeData?.authorsYouLove && homeData.authorsYouLove.length > 0 && (
          <StoryList 
            title="By Authors You Love"
            stories={homeData.authorsYouLove}
            navigation={navigation}
          />
        )}


        {/* Top Stories by Favorite Genres */}
        {homeData?.topStoriesByGenre &&
          Object.keys(homeData.topStoriesByGenre).map(genre => (
            <StoryList
              key={genre}
              title={`Top ${
                genre.charAt(0).toUpperCase() + genre.slice(1)
              } Stories`}
              stories={homeData.topStoriesByGenre[genre]}
              navigation={navigation}
            />
          ))}

          {/* NEW SECTION 8: Since You Enjoyed [Story] */}
        {homeData?.sinceYouEnjoyed && homeData.sinceYouEnjoyed.stories.length > 0 && (
          <StoryList 
            title={`Since you enjoyed ${homeData.sinceYouEnjoyed.title}`}
            stories={homeData.sinceYouEnjoyed.stories}
            navigation={navigation}
          />
        )}

{/* NEW SECTION 9: Explore a Different Genre */}
        {homeData?.exploreGenre && homeData.exploreGenre.stories.length > 0 && (
          <StoryList 
            title={`Explore ${homeData.exploreGenre.genre}`}
            stories={homeData.exploreGenre.stories}
            navigation={navigation}
          />
        )}

      </ScrollView>
      <BottomNavBar />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
  },
  headerArea: {
    marginVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 70,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  headingText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
  },
  subText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.white,
    marginTop: 10,
  },
  list: {
    flexDirection: 'row',
    marginVertical: 30,
    gap: 25,
  },
  listItem: {
    flexDirection: 'column',
  },
  bookCover: {
    width: 70,
    height: 90,
  },
  progress: {
    backgroundColor: colors.white,
    width: 70,
    borderRadius: 10,
    height: 6,
    marginTop: 10,
  },
  partsText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'right',
    marginTop: 10,
  },
  bookTitle: {
    fontSize: 13,
    width: 70,
    fontWeight: 'bold',
    color: colors.white,
    marginTop: 10,
  },
  bottomNavBar: {
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
