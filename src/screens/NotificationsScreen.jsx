import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomNavBar from '../components/BottomNavBar';

const NotificationsScreen = () => {

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


  return (
  <View style={styles.container}>
    
    
    <Text style={styles.heading}>Notifications</Text>
      <ScrollView>
        <View style={styles.notificationsContainer}>
          <View style={styles.notification}>
            <Image source={require("../assets/profile-common.png")} style={styles.profilepicture}/>
            <View style={styles.notificationTextContainer}>
              <Text style={styles.notificationText}>Olivia Wilson added a New Chapter to Pencil </Text>
              <Text style={styles.notificationTimeStamp}>31 Oct 2024 09.30 pm </Text>
            </View>
            <Image source={require("../assets/pencil.jpeg")} style={styles.bookcover}/>
          </View>

          <View style={styles.notification}>
            <Image source={require("../assets/profile-common.png")} style={styles.profilepicture}/>
            <View style={styles.notificationTextContainer}>
              <Text style={styles.notificationText}>Olivia Wilson added a New Chapter to Pencil </Text>
              <Text style={styles.notificationTimeStamp}>31 Oct 2024 09.30 pm </Text>
            </View>
            <Image source={require("../assets/pencil.jpeg")} style={styles.bookcover}/>
          </View>

          <View style={styles.notification}>
            <Image source={require("../assets/profile-common.png")} style={styles.profilepicture}/>
            <View style={styles.notificationTextContainer}>
              <Text style={styles.notificationText}>Jones Kaley started following you </Text>
              <Text style={styles.notificationTimeStamp}>31 Oct 2024 09.30 pm </Text>
            </View>
          </View>


        </View>
    </ScrollView>

    <BottomNavBar/>
  </View>
  )
}

export default NotificationsScreen

const styles = StyleSheet.create({
  container:
  {
    flex:1,
    backgroundColor:colors.primary,
  },
  heading:{
    fontSize:22,
    fontWeight:"bold",
    color:colors.white,
    marginLeft:50,
    marginVertical:50
},
notificationsContainer:{
  marginHorizontal:30,
  gap:30
},
profilepicture:{
  width:50,
  height:50,
},
notificationTextContainer:{
  flexDirection:'column',
  gap:15,
  width:210,
},
notification:{
  flexDirection:'row',
  gap:20,
  alignItems:'center'
},
notificationText:{
  fontWeight:'bold',
  color:colors.white,
  fontSize:12
},
notificationTimeStamp:{
  color:colors.secondary,
  fontSize:11
},
bookcover:{
  height:70,
  width:60,
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