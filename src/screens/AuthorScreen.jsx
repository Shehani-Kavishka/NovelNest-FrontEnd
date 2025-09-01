// no backend is needed 

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import BottomNavBar from '../components/BottomNavBar';

const AuthorScreen = () => {

  const navigation = useNavigation();
      
    const gotoAllStories = () => {
        navigation.navigate("all-stories")
    }
    const gotoCreateStory = () => {
       navigation.navigate("create-stories")
    }
    const gotoEditStories = () => {
navigation.navigate("edit-stories")
    }
    


  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Love Sharing Stories </Text>
      <Text style={styles.titleText}>Write your own Stories with NovelNest</Text>

      <BottomNavBar/>

      <View>
        <TouchableOpacity onPress={gotoCreateStory}>
          <Text style={styles.subtext}>Create a new story</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={gotoEditStories}>
          <Text style={styles.subtext}>Edit my stories</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={gotoAllStories}>
          <Text style={styles.subtext}>All my stories</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AuthorScreen

const styles = StyleSheet.create({
  container:{
      flex:1,
      backgroundColor:colors.primary,
      paddingHorizontal:30,
      paddingVertical:50
    },
    titleText:{
      color:colors.white,
      fontSize:30,
      fontWeight:"bold",
      marginVertical:50
  },
  subtext:{
    color:colors.white,
      fontSize:22,
      fontWeight:"bold",
      marginVertical:20
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