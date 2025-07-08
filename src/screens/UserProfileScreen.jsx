import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const UserProfileScreen = () => {

    const navigation = useNavigation();
        
      const goToSettings = () => {
          navigation.navigate("profile-settings")
      }
      const goToAbout = () => {
        navigation.navigate("about")
    }
    const goToReadingPreferences = () => {
        navigation.navigate("reading-preferences")
    }



  return (
    <View style={styles.container}>
      <Image source={require("../assets/profile-pic.jpg")} style={styles.profilePic}/>
      <Text style={styles.userName}>Anne Fernando</Text>
      <View style={styles.followBaseContainer}>
        <Text style={styles.followText}>2.5K Followers</Text>
        <Text style={styles.followText}>1.8K Followings</Text>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={goToSettings}>
            <Text style={styles.optionText}>Profile Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToReadingPreferences}>
            <Text style={styles.optionText}>Reading Preferences</Text>
        </TouchableOpacity>
        <View style={styles.darkmode}>
            <Text style={styles.optionText}>Dark Mode</Text>
            <TouchableOpacity>
                <Icon name="toggle-on" size={30} color="white" style={styles.toggleButton}/>
            </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={goToAbout}>
            <Text style={styles.optionText}>About NovelNest</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style={styles.optionText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default UserProfileScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.primary,
        alignItems:'center'
    },
    profilePic:{
        width:100,
        height:100,
        borderRadius:100,
        marginTop:50,
    },
    userName:{
        fontSize:22,
        fontWeight:"bold",
        color:colors.white,
        marginVertical:30
    },
    followBaseContainer:{
        flexDirection:'row',
        gap:30
    },
    followText:{
        width:80,
        fontWeight:"bold",
        color:colors.white,
        fontSize:13,
        textAlign:"center",
        height:50,
    },
    optionsContainer:{
        width:270,
    },
    optionText:{
        color:colors.white,
        fontSize:15,
        fontWeight:"bold",
        marginTop:50
    },
    darkmode:{
        flexDirection:'row',
        alignItems:"center",
        gap:160
    },
    toggleButton:{
        marginTop:50
    }
})