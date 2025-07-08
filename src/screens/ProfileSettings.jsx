import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'
import { Icon } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const ProfileSettings = () => {

    const navigation = useNavigation();
    const gotoForgotPassword = () => {
        navigation.navigate("forgot-password")
    }

    const gotoChangePassword = () => {
        navigation.navigate("change-password")
    }

  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Profile Settings</Text>
        <View style={styles.profilePicContainer}>
            <TouchableOpacity>
                <Image source={require("../assets/profile-pic.jpg")} style={styles.profilePic}/>
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.fieldText}>Profile Picture</Text>
                <Text style={styles.subText}>Tap to change</Text>
            </View>
        </View>
        <View style={styles.formContainer}>
            <Text style={styles.fieldText}>Username</Text>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.textInput}
                    placeholder='Username'
                    placeholderTextColor={colors.primary}
                />
            </View>
            <Text style={styles.fieldText}>Email</Text>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.textInput}
                    placeholder='Email'
                    placeholderTextColor={colors.primary}
                    keyboardType='email-address'
                />
            </View>
        </View>
        <View style={styles.optionslist}>
            <TouchableOpacity onPress={gotoChangePassword}>
                <Text style={[styles.fieldText,{marginBottom:50}]}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={gotoForgotPassword}>
                <Text style={[styles.fieldText,{marginBottom:50}]}>Forgot Password</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={[styles.fieldText,{color:colors.red}]}>Delete Account</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default ProfileSettings

const styles = StyleSheet.create({
    container:{
            flex:1,
            backgroundColor:colors.primary,
    
        },
        heading:{
            fontSize:22,
            fontWeight:"bold",
            color:colors.white,
            marginLeft:50
        },
        profilePicContainer:{
            flexDirection:"row",
            width:150,
            marginLeft:50,
            marginVertical:50

        },
        textContainer:{
            flexDirection:"column",
            marginLeft:20,
            gap:10
        },
        profilePic:{
            width:50,
            height:50,
            borderRadius:100
        },
        formContainer:{
            marginLeft:50,

        },
        fieldText:{
            fontSize:15,
            color:colors.white,
            fontWeight:"bold"
        },
        subText:{
            fontSize:12,
            color:colors.white
        },
        inputContainer:{
            borderRadius:10,
            backgroundColor:colors.white,
            paddingHorizontal:15,
            width:280,
            height:40,
            marginVertical:20,
            justifyContent:"center",
        },
        textInput:{
            color:colors.primary,
            fontSize:12,
        },
        optionslist:{
            marginLeft:50,
            marginVertical:50
        }
})
