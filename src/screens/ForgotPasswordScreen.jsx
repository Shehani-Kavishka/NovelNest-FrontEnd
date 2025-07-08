import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../utils/colors'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Checkbox } from 'react-native-paper';

const ForgotPasswordScreen = () => {

    const [checked, setChecked] = useState(false);

    const navigation = useNavigation();
    
    const handleOTPSend = () => {
        navigation.navigate("reset-verification")
    }


  return (
    <View style={styles.container}>
        <Text style={styles.titleText}>Forgot Password</Text>
      <View style={styles.formContainer}>
        <View style={styles.passwordTextContainer}>
            <View style={styles.bulletRow}>
                <Text style={styles.passwordText}>
                  To reset your password, please enter your email address below. We'll send you a verification code to proceed
                </Text>
            </View>
        </View>
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.textInput}
                placeholder='Email'
                placeholderTextColor={colors.primary}
                keyboardType='email-address'
            />
        </View>
        <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleOTPSend}
        >
            <Text style={styles.loginText}>Send</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default ForgotPasswordScreen

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
        fontWeight:"bold"
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
        marginVertical:60

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
    passwordText:{
        color:colors.white,
        fontSize:14,
        fontWeight:"bold",
        width:270,
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
        fontSize:14,
        fontWeight:"bold",
        width:280,
    },
})