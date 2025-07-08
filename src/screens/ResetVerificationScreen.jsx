import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../utils/colors'
import { useNavigation } from '@react-navigation/native';

const ResetVerificationScreen = () => {

    const navigation = useNavigation();
    
    const handleVerify = () => {
        navigation.navigate("reset-password")
    }


  return (
    <View style={styles.container}>
        <Text style={styles.titleText}>Reset Password Verification</Text>
      <View style={styles.formContainer}>
        <View style={styles.passwordTextContainer}>
            <View style={styles.bulletRow}>
                <Text style={styles.verifyText}>
                  We've sent a Verification Code to your email address. Please enter it below to complete the verification process
                </Text>
            </View>
        </View>
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.textInput}
                placeholder='Verification Code'
                placeholderTextColor={colors.primary}
                keyboardType='number-pad'
            />
        </View>
        <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleVerify}
        >
            <Text style={styles.loginText}>Verify</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default ResetVerificationScreen;

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
        textAlign:"center"
    },
    formContainer:{
        marginVertical:75,
        alignItems:"center"
    },
    inputContainer:{
        borderRadius:10,
        backgroundColor:colors.white,
        paddingHorizontal:15,
        width:280,
        height:50,
        marginTop:20,
        marginBottom:100


    },
    textInput:{
        color:colors.primary,
        fontSize:18,
    },
    passwordTextContainer:{
        marginTop:10,
    },
    bulletRow:{
        flexDirection:"row",
        alignItems:"center",
        marginBottom:15
    },
    bulletIcon:{
        marginRight:8
    },
    verifyText:{
        color:colors.white,
        fontSize:14,
        fontWeight:"bold",
        width:280,
        height:100
    },
    loginButton:{
        backgroundColor:colors.secondary,
        width:150,
        height:50,
        borderRadius:10,
        justifyContent:"center",
        marginTop:50
    },
    loginText:{
        color:colors.white,
        fontWeight:"bold",
        fontSize:18,
        textAlign:"center",
    },
    forgetText:{
        color:colors.white,
        fontWeight:"bold",
        fontSize:14,
        textAlign:"center",
        marginTop:30
    },
    signUpContainer:{
        alignItems:"center",
        marginTop:50
    },
    signUpText:{
        color:colors.white,
        fontWeight:"bold",
        fontSize:14,
        textAlign:"center",
    },
    checkRow:{
        flexDirection:"row",
        alignItems:"center",
        padding:10,
        height:100
    },
    checkText:{
        marginLeft:8,
        color:colors.white,
        fontSize:12,
        fontWeight:"bold",
        width:280,
    }
})