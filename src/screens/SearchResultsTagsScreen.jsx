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

const SearchResultsTagsScreen = () => {
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
  const [activeCategory, setActiveCategory] = useState('search-tags');

  const handleCategoryPress = (category) => {
    
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
          <View style={styles.headerContainer}>
            <View style={styles.optionWrapper}>
            <Text style={styles.subText}>Sort By</Text>
            <Icon name="sort" size={20} color="white" />
            </View>
             <View style={styles.optionWrapper}>
            <Text style={styles.subText}>Filters</Text>
            <Icon name="sliders" size={20} color="white" />
            </View>
          </View>

          <View style={styles.list}>
            <View style={styles.listItem}>
              <TouchableOpacity>
                <Image
                  source={require('../assets/albus.jpg')}
                  style={styles.bookCover}
                />
              </TouchableOpacity>

              <View style={styles.bookDetails}>
                <Text style={styles.bookTitle}>The Return of Guardian Albus</Text>
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
                  source={require('../assets/expecto.jpg')}
                  style={styles.bookCover}
                />
              </TouchableOpacity>

              <View style={styles.bookDetails}>
                <Text style={styles.bookTitle}>Expecto Patronum</Text>
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
                  source={require('../assets/lily.jpg')}
                  style={styles.bookCover}
                />
              </TouchableOpacity>

            <View style={styles.bookDetails}>
                <Text style={styles.bookTitle}>The tale of Lily Snape</Text>
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
                  source={require('../assets/always.jpeg')}
                  style={styles.bookCover}
                />
              </TouchableOpacity>

             <View style={styles.bookDetails}>
                <Text style={styles.bookTitle}>After All This Time? Always</Text>
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

export default SearchResultsTagsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop:20,
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
    marginHorizontal: 25,
  },
  activeTagItem:{
    backgroundColor:colors.secondary
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
  },
  optionWrapper:{
    flexDirection:'row',
    alignItems:'baseline',
    gap:5,
    marginRight:125
  }
});
