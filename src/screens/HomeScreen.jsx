import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { colors } from '../utils/colors'
import { ProgressBar } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'
import BottomNavBar from '../components/BottomNavBar'

const HomeScreen = () => {

  const navigation = useNavigation();
    
  const handleHome = () => {
      navigation.navigate("home")
  }
  const handleSearch = () => {
    navigation.navigate("search")
  }
  const handleLibrary = () => {
    navigation.navigate("library")
  }
  const handleAuthor = () => {
    navigation.navigate("author")
  }
  const handleNotifications = () => {
    navigation.navigate("notifications")
  }
  const handleProfilePress =() => {
    navigation.navigate("user-profile")
  }
  const handleBookClick =() => {
    navigation.navigate("story-details")
  }

  return (
    <View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.headerArea}>
        <Image source={require("../assets/logo_icon.png")}/>
        <Image source={require("../assets/novelnest-name.png")}/>
        <TouchableOpacity onPress={handleProfilePress}>
          <Image source={require("../assets/profile-pic.jpg")} style={styles.profilePic}/>
        </TouchableOpacity>
      </View>

      <View style={styles.readingListContainer}>
        <Text style={styles.headingText}>Your Reading List</Text>
        <Text style={styles.subText}>Pick up where you left off on your favorite stories</Text>
        <View style={styles.list}>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image source={require("../assets/pencil.jpeg")} style={styles.bookCover}/>
            </TouchableOpacity>
            <ProgressBar progress={0.3} style={styles.progress} color={colors.secondary}/>
            <Text style={styles.partsText}>24 parts left</Text>
          </View>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image source={require("../assets/staywithme.jpg")} style={styles.bookCover}/>
            </TouchableOpacity>
            <ProgressBar progress={0.8} style={styles.progress} color={colors.secondary}/>
            <Text style={styles.partsText}>9 parts left</Text>
          </View>
        </View>
      </View>

      <View style={styles.recommandsContainer}>
        <Text style={styles.headingText}>Must-Read Picks for You</Text>
        <View style={styles.list}>
          <View style={styles.listItem}>
            <TouchableOpacity onPress={handleBookClick}>
              <Image source={require("../assets/myfirstlove.jpg")} style={styles.bookCover}/>
            </TouchableOpacity>
            <Text style={styles.bookTitle}>My First Love</Text>
          </View>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image source={require("../assets/loneplanet.jpg")} style={styles.bookCover}/>
            </TouchableOpacity>
            <Text style={styles.bookTitle}>The Lone Planet</Text>
          </View>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image source={require("../assets/midnight.jpg")} style={styles.bookCover}/>
            </TouchableOpacity>
            <Text style={styles.bookTitle}>Midnight</Text>
          </View>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image source={require("../assets/hero.jpg")} style={styles.bookCover}/>
            </TouchableOpacity>
            <Text style={styles.bookTitle}>Hero</Text>
          </View>
        </View>
      </View>

      <View style={styles.recommandsContainer}>
        <Text style={styles.headingText}>Popular on NovelNest</Text>
        <View style={styles.list}>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image source={require("../assets/rose.png")} style={styles.bookCover}/>
            </TouchableOpacity>
            <Text style={styles.bookTitle}>Her Name is Rose</Text>
          </View>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image source={require("../assets/prayerjournal.jpg")} style={styles.bookCover}/>
            </TouchableOpacity>
            <Text style={styles.bookTitle}>Prayer Journal</Text>
          </View>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image source={require("../assets/hungrywolves.jpeg")} style={styles.bookCover}/>
            </TouchableOpacity>
            <Text style={styles.bookTitle}>Hungry Wolves</Text>
          </View>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image source={require("../assets/eye.jpg")} style={styles.bookCover}/>
            </TouchableOpacity>
            <Text style={styles.bookTitle}>Eye</Text>
          </View>
        </View>
      </View>

      <View style={styles.recommandsContainer}>
        <Text style={styles.headingText}>By Authors You Love </Text>
        <View style={styles.list}>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image source={require("../assets/ocean.jpg")} style={styles.bookCover}/>
            </TouchableOpacity>
            <Text style={styles.bookTitle}>Mystery of the Ocean</Text>
          </View>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image source={require("../assets/girlinthewoods.jpg")} style={styles.bookCover}/>
            </TouchableOpacity>
            <Text style={styles.bookTitle}>The Girl in the Woods</Text>
          </View>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image source={require("../assets/roman.jpg")} style={styles.bookCover}/>
            </TouchableOpacity>
            <Text style={styles.bookTitle}>Roman</Text>
          </View>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image source={require("../assets/lovestory.jpg")} style={styles.bookCover}/>
            </TouchableOpacity>
            <Text style={styles.bookTitle}>Love Story</Text>
          </View>
        </View>
      </View>

      <View style={styles.recommandsContainer}>
        <Text style={styles.headingText}>Top Romance Stories</Text>
        <View style={styles.list}>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image source={require("../assets/oursecretlove.jpg")} style={styles.bookCover}/>
            </TouchableOpacity>
            <Text style={styles.bookTitle}>Our Secret Love</Text>
          </View>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image source={require("../assets/love.jpg")} style={styles.bookCover}/>
            </TouchableOpacity>
            <Text style={styles.bookTitle}>Love</Text>
          </View>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image source={require("../assets/waitingforyou.jpg")} style={styles.bookCover}/>
            </TouchableOpacity>
            <Text style={styles.bookTitle}>Waiting For You</Text>
          </View>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image source={require("../assets/fightingfor.jpg")} style={styles.bookCover}/>
            </TouchableOpacity>
            <Text style={styles.bookTitle}>Fighting For</Text>
          </View>
        </View>
      </View>

      <View style={styles.recommandsContainer}>
        <Text style={styles.headingText}>Top Mystery Stories</Text>
        <View style={styles.list}>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image source={require("../assets/thread.jpg")} style={styles.bookCover}/>
            </TouchableOpacity>
            <Text style={styles.bookTitle}>Thread</Text>
          </View>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image source={require("../assets/dontgothere.jpg")} style={styles.bookCover}/>
            </TouchableOpacity>
            <Text style={styles.bookTitle}>Don't Go There</Text>
          </View>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image source={require("../assets/moths.jpg")} style={styles.bookCover}/>
            </TouchableOpacity>
            <Text style={styles.bookTitle}>Walk With Moths</Text>
          </View>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image source={require("../assets/mirage.jpg")} style={styles.bookCover}/>
            </TouchableOpacity>
            <Text style={styles.bookTitle}>Mirage</Text>
          </View>
        </View>
      </View>

      <View style={styles.recommandsContainer}>
        <Text style={styles.headingText}>Top Science Fiction Stories</Text>
        <View style={styles.list}>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image source={require("../assets/bloodmoon.jpg")} style={styles.bookCover}/>
            </TouchableOpacity>
            <Text style={styles.bookTitle}>Blood Moon</Text>
          </View>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image source={require("../assets/spaceroad.jpg")} style={styles.bookCover}/>
            </TouchableOpacity>
            <Text style={styles.bookTitle}>Space Road</Text>
          </View>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image source={require("../assets/dreamhome.jpg")} style={styles.bookCover}/>
            </TouchableOpacity>
            <Text style={styles.bookTitle}>Dream Home</Text>
          </View>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image source={require("../assets/cybernetic.jpg")} style={styles.bookCover}/>
            </TouchableOpacity>
            <Text style={styles.bookTitle}>Cybernetic Stranger</Text>
          </View>
        </View>
      </View>

      <View style={styles.recommandsContainer}>
        <Text style={styles.headingText}>Since you enjoyed Pencil</Text>
        <View style={styles.list}>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image source={require("../assets/soul.jpg")} style={styles.bookCover}/>
            </TouchableOpacity>
            <Text style={styles.bookTitle}>Soul</Text>
          </View>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image source={require("../assets/invisibleman.jpg")} style={styles.bookCover}/>
            </TouchableOpacity>
            <Text style={styles.bookTitle}>Invisible Man</Text>
          </View>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image source={require("../assets/inyoureyes.jpg")} style={styles.bookCover}/>
            </TouchableOpacity>
            <Text style={styles.bookTitle}>In Your Eyes</Text>
          </View>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <Image source={require("../assets/talesunderpurplesly.jpg")} style={styles.bookCover}/>
            </TouchableOpacity>
            <Text style={styles.bookTitle}>Tales Under a Purple Sky</Text>
          </View>
        </View>
      </View>
      <View>
        <Text></Text>
      </View>
      </ScrollView>

      <BottomNavBar/>

    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.primary,
    paddingHorizontal:20,
  },
  headerArea:{
    marginVertical:30,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    gap:70
    
  },
  profilePic:{
    width:50,
    height:50,
    borderRadius:100
  },
  headingText:{
    fontSize:22,
    fontWeight:"bold",
    color:colors.white,
  },
  subText:{
    fontSize:13,
    fontWeight:"bold",
    color:colors.white,
    marginTop:10
  },
  list:{
    flexDirection:"row",
    marginVertical:30,
    gap:25
  },
  listItem:{
    flexDirection:'column'
  },
  bookCover:{
    width:70,
    height:90
  },
  progress:{
    backgroundColor:colors.white,
    width:70,
    borderRadius:10,
    height:6,
    marginTop:10
  },
  partsText:{
    fontSize:10,
    fontWeight:"bold",
    color:colors.white,
    textAlign:"right",
    marginTop:10
  },
  bookTitle:{
    fontSize:13,
    width:70,
    fontWeight:"bold",
    color:colors.white,
    marginTop:10
  },
  bottomNavBar:{
    height:50,
    backgroundColor:colors.secondary,
    bottom:0,
    left:0,
    right:0,
    position:'absolute',
    flexDirection:'row',
    justifyContent:'space-around',
    paddingVertical:10,
    alignItems:'center',
  },
})