import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {

    const navigation = useNavigation();
    
        const handleLogin = () => {
            navigation.navigate("home")
        }

        const handleSigup = () => {
            navigation.navigate("signup1")
        }

        const handleForgotPassword = () => {
            navigation.navigate("forgot-password")
        }

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")}/>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.textInput}
                placeholder='Username'
                placeholderTextColor={colors.primary}
            />
        </View>
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.textInput}
                placeholder='Password'
                placeholderTextColor={colors.primary}
                secureTextEntry={true}
            />
        </View>
        <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleLogin}
        >
            <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={handleForgotPassword}
        >
            <Text style={styles.forgetText}>Forgot password?</Text>
        </TouchableOpacity>
        <View style={styles.signUpContainer}>
            <TouchableOpacity
                onPress={handleSigup}
            >
                <Text style={styles.signUpText}>Don't have an account?</Text>
                <Text style={styles.signUpText}>Sign up</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.primary,
        flex:1,
        alignItems:"center",
        justifyContent:"center"
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
        marginVertical:20

    },
    textInput:{
        color:colors.primary,
        fontSize:18,
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
    }
})