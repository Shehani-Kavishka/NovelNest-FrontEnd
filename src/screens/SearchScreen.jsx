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
import React from 'react';
import { ProgressBar } from 'react-native-paper';
import { colors } from '../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomNavBar from '../components/BottomNavBar';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
  const CATEGORIES = [
    'Romance',
    'Fantasy',
    'Non-Fiction',
    'Horror',
    'Thriller',
    'Mystery',
    'Fanfiction',
    'Werewolf',
  ];

  const renderCategory = ({ item }) => (
    <TouchableOpacity>
      <Text style={styles.tagItem}>{item}</Text>
    </TouchableOpacity>
  );

  const navigation = useNavigation();
  
  const search  = () => {
    navigation.navigate("search-stories")
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
          <TouchableOpacity onPress={search}>
          <Icon name="search" size={25} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.listWrapper}>
          <FlatList
            data={CATEGORIES}
            renderItem={renderCategory}
            keyExtractor={item => item}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContentContainer}
          />
        </View>

        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.headingText}>2.02K Stories</Text>
            <Text style={styles.subText}>Sort By</Text>
            <Icon
              name="sort"
              size={20}
              color="white"
              style={styles.headerIcon}
            />
            <Text style={styles.subText}>Filters</Text>
            <Icon name="sliders" size={20} color="white" />
          </View>

          <View style={styles.list}>
            <View style={styles.listItem}>
              <TouchableOpacity>
                <Image
                  source={require('../assets/oursecretlove.jpg')}
                  style={styles.bookCover}
                />
              </TouchableOpacity>

              <View style={styles.bookDetails}>
                <Text style={styles.bookTitle}>Our Secret Love</Text>
                <View style={styles.statsContainer}>
                  <View style={styles.statsSubContainer}>
                    <Icon name="eye" size={15} color={colors.white} />
                    <Text style={styles.textStyle}>155K Reads</Text>
                  </View>
                  <View style={styles.statsSubContainer}>
                    <Icon name="star" size={15} color={colors.white} />
                    <Text style={styles.textStyle}>4.58K Rates</Text>
                  </View>
                  <View style={styles.statsSubContainer}>
                    <Icon name="list" size={15} color={colors.white} />
                    <Text style={styles.textStyle}>14 Parts</Text>
                  </View>
                </View>
                <Text style={[styles.textStyle,{fontWeight:'regular'}]}>
                  A heartfelt journey of young love, dreams, and self-discovery
                  as two people navigate the highs and lows of their first
                  romance.
                </Text>
              </View>
            </View>
            <View style={styles.listItem}>
              <TouchableOpacity>
                <Image
                  source={require('../assets/fightingfor.jpg')}
                  style={styles.bookCover}
                />
              </TouchableOpacity>

              <View style={styles.bookDetails}>
                <Text style={styles.bookTitle}>Fighting For</Text>
                <View style={styles.statsContainer}>
                  <View style={styles.statsSubContainer}>
                    <Icon name="eye" size={15} color={colors.white} />
                    <Text style={styles.textStyle}>155K Reads</Text>
                  </View>
                  <View style={styles.statsSubContainer}>
                    <Icon name="star" size={15} color={colors.white} />
                    <Text style={styles.textStyle}>4.58K Rates</Text>
                  </View>
                  <View style={styles.statsSubContainer}>
                    <Icon name="list" size={15} color={colors.white} />
                    <Text style={styles.textStyle}>14 Parts</Text>
                  </View>
                </View>
                <Text style={[styles.textStyle,{fontWeight:'regular'}]}>
                  A heartfelt journey of young love, dreams, and self-discovery
                  as two people navigate the highs and lows of their first
                  romance.
                </Text>
              </View>
            </View>
            <View style={styles.listItem}>
              <TouchableOpacity>
                <Image
                  source={require('../assets/love.jpg')}
                  style={styles.bookCover}
                />
              </TouchableOpacity>

            <View style={styles.bookDetails}>
                <Text style={styles.bookTitle}>Love</Text>
                <View style={styles.statsContainer}>
                  <View style={styles.statsSubContainer}>
                    <Icon name="eye" size={15} color={colors.white} />
                    <Text style={styles.textStyle}>155K Reads</Text>
                  </View>
                  <View style={styles.statsSubContainer}>
                    <Icon name="star" size={15} color={colors.white} />
                    <Text style={styles.textStyle}>4.58K Rates</Text>
                  </View>
                  <View style={styles.statsSubContainer}>
                    <Icon name="list" size={15} color={colors.white} />
                    <Text style={styles.textStyle}>14 Parts</Text>
                  </View>
                </View>
                <Text style={[styles.textStyle,{fontWeight:'regular'}]}>
                  A heartfelt journey of young love, dreams, and self-discovery
                  as two people navigate the highs and lows of their first
                  romance.
                </Text>
              </View>
            </View>
            <View style={styles.listItem}>
              <TouchableOpacity>
                <Image
                  source={require('../assets/100chances.png')}
                  style={styles.bookCover}
                />
              </TouchableOpacity>

             <View style={styles.bookDetails}>
                <Text style={styles.bookTitle}>100 Chances To Be With You</Text>
                <View style={styles.statsContainer}>
                  <View style={styles.statsSubContainer}>
                    <Icon name="eye" size={15} color={colors.white} />
                    <Text style={styles.textStyle}>155K Reads</Text>
                  </View>
                  <View style={styles.statsSubContainer}>
                    <Icon name="star" size={15} color={colors.white} />
                    <Text style={styles.textStyle}>4.58K Rates</Text>
                  </View>
                  <View style={styles.statsSubContainer}>
                    <Icon name="list" size={15} color={colors.white} />
                    <Text style={styles.textStyle}>14 Parts</Text>
                  </View>
                </View>
                <Text style={[styles.textStyle,{fontWeight:'regular'}]}>
                  A heartfelt journey of young love, dreams, and self-discovery
                  as two people navigate the highs and lows of their first
                  romance.
                </Text>
              </View>
            </View>
            <View style={styles.listItem}>
              <TouchableOpacity>
                <Image
                  source={require('../assets/waitingforyou.jpg')}
                  style={styles.bookCover}
                />
              </TouchableOpacity>

            <View style={styles.bookDetails}>
                <Text style={styles.bookTitle}>Waiting For You</Text>
                <View style={styles.statsContainer}>
                  <View style={styles.statsSubContainer}>
                    <Icon name="eye" size={15} color={colors.white} />
                    <Text style={styles.textStyle}>155K Reads</Text>
                  </View>
                  <View style={styles.statsSubContainer}>
                    <Icon name="star" size={15} color={colors.white} />
                    <Text style={styles.textStyle}>4.58K Rates</Text>
                  </View>
                  <View style={styles.statsSubContainer}>
                    <Icon name="list" size={15} color={colors.white} />
                    <Text style={styles.textStyle}>14 Parts</Text>
                  </View>
                </View>
                <Text style={[styles.textStyle,{fontWeight:'regular'}]}>
                  A heartfelt journey of young love, dreams, and self-discovery
                  as two people navigate the highs and lows of their first
                  romance.
                </Text>
              </View>
            </View>
            <View style={styles.listItem}>
              <TouchableOpacity>
                <Image
                  source={require('../assets/rose.png')}
                  style={styles.bookCover}
                />
              </TouchableOpacity>

          <View style={styles.bookDetails}>
                <Text style={styles.bookTitle}>Her Name is Rose</Text>
                <View style={styles.statsContainer}>
                  <View style={styles.statsSubContainer}>
                    <Icon name="eye" size={15} color={colors.white} />
                    <Text style={styles.textStyle}>155K Reads</Text>
                  </View>
                  <View style={styles.statsSubContainer}>
                    <Icon name="star" size={15} color={colors.white} />
                    <Text style={styles.textStyle}>4.58K Rates</Text>
                  </View>
                  <View style={styles.statsSubContainer}>
                    <Icon name="list" size={15} color={colors.white} />
                    <Text style={styles.textStyle}>14 Parts</Text>
                  </View>
                </View>
                <Text style={[styles.textStyle,{fontWeight:'regular'}]}>
                  A heartfelt journey of young love, dreams, and self-discovery
                  as two people navigate the highs and lows of their first
                  romance.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomNavBar/>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
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
    marginBottom:100
  },
  listItem: {
    flexDirection: 'row',
    alignItems:'center',
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
    marginHorizontal: 5,
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
  bookDetails:{
    flexDirection:'column',
    marginLeft:20,
    width:275,
    gap:10
  }
});
