import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../utils/colors'
import { useNavigation } from '@react-navigation/native';

const SignupScreen4 = () => {

    const navigation = useNavigation();
    
    const handleContinue = () => {
        navigation.navigate("home")
    }


  return (
    <View style={styles.container}>
        <Text style={styles.titleText}>What are your 3 favorite genres to read?</Text>
      <View style={styles.formContainer}>
        <View style={styles.passwordTextContainer}>
            <View style={styles.bulletRow}>
                <Text style={styles.verifyText}>
                Choose at least 3 genres to get started with personalized recommendations 
                </Text>
            </View>
        </View>

        <View style={styles.genreContainer}>
            <View style={styles.genreRow}>
                <TouchableOpacity style={[styles.genreButton,{width:122}]}><Text style={styles.genreText}>Romance</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.genreButton,{width:122}]}><Text style={styles.genreText}>Fantasy</Text></TouchableOpacity>
            </View>
            <View style={styles.genreRow}>
                <TouchableOpacity style={[styles.genreButton,{width:265}]}><Text style={styles.genreText}>Non Fiction</Text></TouchableOpacity>
            </View>
            <View style={styles.genreRow}>
                <TouchableOpacity style={[styles.genreButton,{width:80}]}><Text style={styles.genreText}>Horror</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.genreButton,{width:80}]}><Text style={styles.genreText}>Thriller</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.genreButton,{width:80}]}><Text style={styles.genreText}>Mystery</Text></TouchableOpacity>
            </View>
            <View style={styles.genreRow}>
                <TouchableOpacity style={[styles.genreButton,{width:140}]}><Text style={styles.genreText}>Fanfiction</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.genreButton,{width:110}]}><Text style={styles.genreText}>Werewolf</Text></TouchableOpacity>
            </View>
            <View style={styles.genreRow}>
                <TouchableOpacity style={[styles.genreButton,{width:80}]}><Text style={styles.genreText}>Humor</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.genreButton,{width:175}]}><Text style={styles.genreText}>Science Fiction</Text></TouchableOpacity>
            </View>
            <View style={styles.genreRow}>
            <TouchableOpacity style={[styles.genreButton,{width:140}]}><Text style={styles.genreText}>Short story</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.genreButton,{width:110}]}><Text style={styles.genreText}>Poetry</Text></TouchableOpacity>
            </View>
        </View>
        
        <TouchableOpacity  
            style={styles.loginButton}
            onPress={handleContinue}
        >
            <Text style={styles.loginText}>Continue</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default SignupScreen4;

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.primary,
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    titleText:{
        color:colors.white,
        fontSize:30,
        fontWeight:"bold",
        width:265,
    },
    formContainer:{
        marginVertical:30,
        alignItems:"center"
    },
    bulletRow:{
        flexDirection:"row",
        alignItems:"center",
        // marginBottom:15
    },
    verifyText:{
        color:colors.white,
        fontSize:14,
        fontWeight:"bold",
        width:265,
        // height:100
    },
    genreContainer:{
        alignItems:"center",
        marginVertical:40
    },
    genreRow:{
        flexDirection:"row",
        marginVertical:8,
        gap:10
    },
    genreButton:{
        height:45,
        backgroundColor:colors.white,
        borderRadius:25,
        width:100,
        justifyContent:"center",
        alignItems:"center"
    },
    genreText:{
        color:colors.primary,
        fontSize:15,
        fontWeight:"bold"
    },
    loginButton:{
        backgroundColor:colors.secondary,
        width:150,
        height:50,
        borderRadius:10,
        justifyContent:"center",
    },
    loginText:{
        color:colors.white,
        fontWeight:"bold",
        fontSize:18,
        textAlign:"center",
    },
})