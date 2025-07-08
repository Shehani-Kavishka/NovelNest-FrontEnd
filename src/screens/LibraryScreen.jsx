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

const LibraryScreen = () => {
  const CATEGORIES = ['All', 'Readings', 'Completed'];

  const renderCategory = ({ item }) => {
    return (
      <TouchableOpacity>
        <Text style={[styles.tagItem]}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const clickMore = () => {
    return(
      <View style={styles.moreContainer}>
        <TouchableOpacity onPress={gotoStoryDetails}>
          <Text style={styles.subText}>Story Info</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.subText}>Remove from Library</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState();

  const handleCategoryPress = category => {
    navigation.navigate(category.route);

    setActiveCategory(category.route);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Library</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <FlatList
            data={CATEGORIES}
            renderItem={renderCategory}
            keyExtractor={item => item}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContentContainer}
          />
        </View>

        <View style={styles.countContainer}>
          <Text style={styles.fieldText}>All Saved Reads</Text>
          <Text style={styles.fieldText}>6 Stories</Text>
        </View>

        <View style={styles.list}>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image
                source={require('../assets/pencil.jpeg')}
                style={styles.bookCover}
              />
            </TouchableOpacity>
            <View style={styles.bookDetails}>
              <Text style={styles.subText}>Pencil</Text>
              <Text style={styles.authorText}>Liversack</Text>
              <ProgressBar
                progress={1.0}
                style={styles.progress}
                color={colors.secondary}
              />
              <Text style={styles.partsText}>0 parts left</Text>
            </View>
            <Icon name="ellipsis-v" size={20} color="white" style={styles.moreButton} />
          </View>
        

        
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image
                source={require('../assets/soul.jpg')}
                style={styles.bookCover}
              />
            </TouchableOpacity>
            <View style={styles.bookDetails}>
              <Text style={styles.subText}>Soul</Text>
              <Text style={styles.authorText}>Henry Paul</Text>
              <ProgressBar
                progress={1.0}
                style={styles.progress}
                color={colors.secondary}
              />
              <Text style={styles.partsText}>0 parts left</Text>
            </View>
            <Icon name="ellipsis-v" size={20} color="white" style={styles.moreButton} />
          </View>
       

        
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image
                source={require('../assets/starlight.jpg')}
                style={styles.bookCover}
              />
            </TouchableOpacity>
            <View style={styles.bookDetails}>
              <Text style={styles.subText}>Star Light</Text>
              <Text style={styles.authorText}>Issac Mattew</Text>
              <ProgressBar
                progress={1.0}
                style={styles.progress}
                color={colors.secondary}
              />
              <Text style={styles.partsText}>0 parts left</Text>
            </View>
            <Icon name="ellipsis-v" size={20} color="white" style={styles.moreButton} />
          </View>
        

       
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image
                source={require('../assets/moths.jpg')}
                style={styles.bookCover}
              />
            </TouchableOpacity>
            <View style={styles.bookDetails}>
              <Text style={styles.subText}>Moths</Text>
              <Text style={styles.authorText}>Liversack</Text>
              <ProgressBar
                progress={1.0}
                style={styles.progress}
                color={colors.secondary}
              />
              <Text style={styles.partsText}>0 parts left</Text>
            </View>
            <Icon name="ellipsis-v" size={20} color="white" style={styles.moreButton} />
          </View>
       

       
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image
                source={require('../assets/thread.jpg')}
                style={styles.bookCover}
              />
            </TouchableOpacity>
            <View style={styles.bookDetails}>
              <Text style={styles.subText}>Thread</Text>
              <Text style={styles.authorText}>John Winsly</Text>
              <ProgressBar
                progress={1.0}
                style={styles.progress}
                color={colors.secondary}
              />
              <Text style={styles.partsText}>0 parts left</Text>
            </View>
            <Icon name="ellipsis-v" size={20} color="white" style={styles.moreButton} />
          </View>
       

     
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image
                source={require('../assets/staywithme.jpg')}
                style={styles.bookCover}
              />
            </TouchableOpacity>
            <View style={styles.bookDetails}>
              <Text style={styles.subText}>Stay With Me</Text>
              <Text style={styles.authorText}>Ladybird</Text>
              <ProgressBar
                progress={1.0}
                style={styles.progress}
                color={colors.secondary}
              />
              <Text style={styles.partsText}>0 parts left</Text>
            </View>
            <Icon name="ellipsis-v" size={20} color="white" style={styles.moreButton} />
          </View>
        </View>

      </ScrollView>

      <BottomNavBar />
    </View>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: 20,
    marginVertical: 40,
  },

 
  list: {
    flexDirection: 'column',
    marginTop:30,
    marginBottom:100
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical:20
  },
  bookCover: {
    width: 70,
    height: 100,
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
    gap:12,
    marginLeft:30,
    width:250
  },
   subText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.white,
  },
  authorText:{
    color:colors.white
  },
  progress: {
    backgroundColor: colors.white,
    width: 70,
    borderRadius: 10,
    height: 6,
  },
  partsText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.white,
  },
  moreButton:{
    marginTop:-75,
  },
  moreContainer:{
    width:200,
    borderWidth:1,
    borderColor:colors.secondary
  }
});
