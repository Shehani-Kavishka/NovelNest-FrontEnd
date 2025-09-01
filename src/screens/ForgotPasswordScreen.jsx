import { StyleSheet, Text, TextInput, TouchableOpacity, View , Alert, ActivityIndicator} from 'react-native'
import React, { useState } from 'react'
import { colors } from '../utils/colors'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Checkbox } from 'react-native-paper';

import { getFunctions, httpsCallable } from "firebase/functions";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPasswordScreen = () => {

     const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    // const [message, setMessage] = useState('');
    const [checked, setChecked] = useState(false);

    const navigation = useNavigation();
const handleSendResetEmail = async () => {
    if (!email.trim()) {
        Alert.alert("Input Required", "Please enter an email address.");
        return;
    }

    setLoading(true);

    try {
        const auth = getAuth();
        // The ONLY call you need is this one.
        // It will automatically check if the user exists.
        await sendPasswordResetEmail(auth, email);

        // If the line above doesn't throw an error, the email was sent.
        Alert.alert(
            "Email Sent",
            "A password reset link has been sent to your email address. Please check your inbox.",
            [{ text: "OK", onPress: () => navigation.goBack() }]
        );

    } catch (error) {
        // Now, you can directly catch the error from the Auth SDK
        if (error.code === 'auth/user-not-found') {
            Alert.alert(
                "Account Not Found",
                "No account is found under this email. Please sign up to proceed."
            );
        } else {
            // Handle other potential errors (e.g., invalid email format)
            console.error("Password Reset Error:", error);
            Alert.alert("Error", "An unexpected error occurred. Please try again.");
        }
    } finally {
        setLoading(false);
    }
}

  return (
    <View style={styles.container}>
        <Text style={styles.titleText}>Forgot Password</Text>
      <View style={styles.formContainer}>
        <View style={styles.passwordTextContainer}>
            <View style={styles.bulletRow}>
                <Text style={styles.passwordText}>
                  To reset your password, please enter your email address below. We'll send you an email to proceed
                </Text>
            </View>
        </View>
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
        <TouchableOpacity 
            style={[styles.loginButton, loading && styles.disabledButton]}
            onPress={handleSendResetEmail}
            disabled={loading}
        >
            {loading ? (
                <ActivityIndicator color={colors.white} />
            ) : (
                <Text style={styles.loginText}>Send Email</Text>
            )}

            
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
    disabledButton: {
        backgroundColor: colors.secondary,
    },
    messageText: {
        color: '#FFD700', // A warning yellow color
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 20,
        width: '90%',
    }
})