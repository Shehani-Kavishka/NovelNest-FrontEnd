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

const EditMyStoriesScreenDrafts = () => {
  const CATEGORIES = ['All', 'Readings', 'Completed'];

  const clickMore = () => {
    return (
      <View style={styles.moreContainer}>
        <TouchableOpacity onPress={gotoStoryDetails}>
          <Text style={styles.subText}>Story Info</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.subText}>Remove from Library</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState();

  const handleCategoryPress = category => {
    navigation.navigate(category.route);

    setActiveCategory(category.route);
  };


  const gotoEditMyStory = () => {
    navigation.navigate("edit-stories")
  }

  const gotoEditStoryDraft = () => {
    navigation.navigate("edit-story-drafts")
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Edit my Stories - Drafts</Text>
      </View>

      <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button,{backgroundColor:colors.secondary}]} onPress={gotoEditMyStory}>
                <Text style={[styles.buttonText,{color:colors.white}]}>
                  Published
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button,{backgroundColor:colors.white}]} >
                <Text style={[styles.buttonText,{color:colors.primary}]}>
                  Drafts
                </Text>
              </TouchableOpacity>
            </View>


      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.list}>
          <View style={styles.listItem}>
            <TouchableOpacity onPress={gotoEditStoryDraft}>
              <Image
                source={require('../assets/honestqueen.jpg')}
                style={styles.bookCover}
              />
            </TouchableOpacity>
            <View style={styles.bookDetails}>
              <Text style={styles.subText}>Honest Queen</Text>
              <Text style={styles.authorText}>Drafts - 5</Text>
              <View style={styles.statsContainer}>
                <View style={styles.statsSubContainer}>
                  <Icon name="eye" size={15} color={colors.white} />
                  <Text style={styles.textStyle}>155K</Text>
                </View>
                <View style={styles.statsSubContainer}>
                  <Icon name="star" size={15} color={colors.white} />
                  <Text style={styles.textStyle}>4.58K</Text>
                </View>
                <View style={styles.statsSubContainer}>
                  <Icon name="comments" size={15} color={colors.white} />
                  <Text style={styles.textStyle}>2.5K</Text>
                </View>
              </View>
            </View>
            {/* <TouchableOpacity> */}
            {/* <Icon
              name="ellipsis-v"
              size={20}
              color="white"
              style={styles.moreButton}
            /> */}
            {/* </TouchableOpacity> */}
          </View>

          <View style={styles.listItem}>
            <TouchableOpacity >
              <Image
                source={require('../assets/mirage.jpg')}
                style={styles.bookCover}
              />
            </TouchableOpacity>
            <View style={styles.bookDetails}>
              <Text style={styles.subText}>Mirage</Text>
              <Text style={styles.authorText}>Drafts - 5</Text>
              <View style={styles.statsContainer}>
                <View style={styles.statsSubContainer}>
                  <Icon name="eye" size={15} color={colors.white} />
                  <Text style={styles.textStyle}>155K</Text>
                </View>
                <View style={styles.statsSubContainer}>
                  <Icon name="star" size={15} color={colors.white} />
                  <Text style={styles.textStyle}>4.58K</Text>
                </View>
                <View style={styles.statsSubContainer}>
                  <Icon name="comments" size={15} color={colors.white} />
                  <Text style={styles.textStyle}>2.5K</Text>
                </View>
              </View>
            </View>
            {/* <TouchableOpacity> */}
            {/* <Icon
          name="ellipsis-v"
              size={20}
              color="white"
              style={styles.moreButton}
            />
            </TouchableOpacity> */}
          </View>

        </View>
      </ScrollView>

     
    </View>
  );
};

export default EditMyStoriesScreenDrafts;

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
    marginLeft:40
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
    justifyContent:'center'
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
    marginBottom:10
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
    marginTop:15
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
        buttonContainer:{
        flexDirection:'row',
        gap:50,
        marginBottom:20,
        justifyContent:'center',
        marginTop:20
      },
      button:{
        width:110,
        height:35,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center'
      },
      buttonText:{
        fontSize:15,
        fontWeight:'bold'
      },
      moreButton:{
        marginTop:-50
      }
});
