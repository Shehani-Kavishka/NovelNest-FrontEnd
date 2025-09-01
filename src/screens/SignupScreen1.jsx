import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../utils/colors'
import { useNavigation } from '@react-navigation/native';

const SignupScreen1 = () => {

    // user inputs
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    const navigation = useNavigation();
    
        const handleContinue = () => {

            // check fields are filled 
            if (!email || !username) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

            navigation.navigate("signup2", { email: email.trim(), username: username.trim() });
        }

        const handleLogin = () => {
            navigation.navigate("login")
        }

        

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")}/>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.textInput}
                placeholder='Email'
                placeholderTextColor={colors.primary}
                keyboardType='email-address'
                autoCapitalize='none' 
                value={email} 
                onChangeText={setEmail}
            />
        </View>
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.textInput}
                placeholder='Username'
                placeholderTextColor={colors.primary}
                autoCapitalize='words' 
                value={username} 
                onChangeText={setUsername} 
            />
        </View>
        <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleContinue}
        >
            <Text style={styles.loginText}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.signUpContainer}>
            <TouchableOpacity
                onPress={handleLogin}
            >
                <Text style={styles.signUpText}>Already have an account?</Text>
                <Text style={styles.signUpText}>Log in</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default SignupScreen1

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