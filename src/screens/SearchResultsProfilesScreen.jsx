import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { ProgressBar } from 'react-native-paper';
import { colors } from '../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomNavBar from '../components/BottomNavBar';
import { useNavigation } from '@react-navigation/native';

const SearchResultsProfilesScreen = () => {
  const CATEGORIES = [
    {
      title: 'Stories',
      route: 'search-stories',
    },
    {
      title: 'Profiles',
      route: 'search-profiles',
    },
    {
      title: 'Tags',
      route: 'search-tags',
    },
  ];

  const renderCategory = ({ item }) => {
    const isActive = item.route === activeCategory;

    return (
      <TouchableOpacity onPress={() => handleCategoryPress(item)}>
        <Text style={[styles.tagItem, isActive && styles.activeTagItem]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState('search-profiles');

  const handleCategoryPress = category => {
    navigation.navigate(category.route);

    setActiveCategory(category.route);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.textInput}
            placeholder="Search Novels, Authors"
            placeholderTextColor={colors.primary}
          />
          <Icon name="search" size={25} color={colors.primary} />
        </View>

        <View style={styles.listWrapper}>
          <FlatList
            data={CATEGORIES}
            renderItem={renderCategory}
            keyExtractor={item => item.route}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContentContainer}
          />
        </View>

        <View>
          <View style={styles.notificationsContainer}>

            <View style={styles.notification}>
              <Image
                source={require('../assets/profile-common.png')}
                style={styles.profilepicture}
              />
              <View style={styles.notificationTextContainer}>
                <Text style={styles.notificationText}>Harry Styles</Text>
                <TouchableOpacity>
                  <Text style={styles.followButton}>+ Follow</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.notification}>
              <Image
                source={require('../assets/profile-common.png')}
                style={styles.profilepicture}
              />
              <View style={styles.notificationTextContainer}>
                <Text style={styles.notificationText}>Harry 1 </Text>
                <TouchableOpacity>
                  <Text style={styles.followButton}>+ Follow</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.notification}>
              <Image
                source={require('../assets/profile-common.png')}
                style={styles.profilepicture}
              />
              <View style={styles.notificationTextContainer}>
                <Text style={styles.notificationText}>Harry James </Text>
                <TouchableOpacity>
                  <Text style={styles.followButton}>+ Follow</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.notification}>
              <Image
                source={require('../assets/profile-common.png')}
                style={styles.profilepicture}
              />
              <View style={styles.notificationTextContainer}>
                <Text style={styles.notificationText}>Harry Styles</Text>
                <TouchableOpacity>
                  <Text style={styles.followButton}>+ Follow</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.notification}>
              <Image
                source={require('../assets/profile-common.png')}
                style={styles.profilepicture}
              />
              <View style={styles.notificationTextContainer}>
                <Text style={styles.notificationText}>Harry 1 </Text>
                <TouchableOpacity>
                  <Text style={styles.followButton}>+ Follow</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.notification}>
              <Image
                source={require('../assets/profile-common.png')}
                style={styles.profilepicture}
              />
              <View style={styles.notificationTextContainer}>
                <Text style={styles.notificationText}>Harry James </Text>
                <TouchableOpacity>
                  <Text style={styles.followButton}>+ Follow</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomNavBar />
    </View>
  );
};

export default SearchResultsProfilesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 20,
  },
  headingText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
    marginTop: 30,
    marginRight: 20,
  },
  subText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.white,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 35,
  },
  list: {
    flexDirection: 'column',
    marginTop: 30,
    gap: 30,
    marginBottom: 100,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookCover: {
    width: 70,
    height: 100,
  },

  partsText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'right',
    marginTop: 10,
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
    marginHorizontal: 25,
  },
  activeTagItem: {
    backgroundColor: colors.secondary,
  },
  searchBar: {
    borderColor: colors.white,
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    width: 'auto',
    height: 50,
    marginVertical: 30,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 80,
  },
  textInput: {
    color: colors.primary,
    fontSize: 18,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 20,
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
  bookTitle: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  bookDetails: {
    flexDirection: 'column',
    marginLeft: 20,
    width: 275,
    gap: 10,
  },
  optionWrapper: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 5,
    marginRight: 125,
  },
  notificationsContainer: {
    marginHorizontal: 30,
    gap: 30,
    marginTop: 50,
  },
  profilepicture: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  notificationTextContainer: {
    flexDirection: 'row',
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
    fontSize: 15,
    marginBottom: 12,
    width:160
  },

  followButton: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
    borderColor: colors.secondary,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignContent:'flex-end',
    marginLeft:5
  },
});
