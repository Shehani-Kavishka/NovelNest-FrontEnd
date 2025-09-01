import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../utils/colors'
import { useNavigation, useRoute } from '@react-navigation/native';

import { httpsCallable } from "firebase/functions";
import { functions } from '../firebaseConfig';


const SignupScreen3 = () => {

    const navigation = useNavigation();
     const route = useRoute();
    const { uid } = route.params;

    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

     const handleVerify = async () => {
        if (otp.length !== 6) {
            Alert.alert("Invalid Code", "Please enter the 6-digit code from your email.");
            return;
        }

        setLoading(true);
        try {
            // Call our new verification function
            const verifyOtpFunc = httpsCallable(functions, 'user-verifyOtp');
            const result = await verifyOtpFunc({ uid: uid, otp: otp });

            console.log(result.data.message);
            Alert.alert("Success", "Your email has been verified!");

            // Navigate to the final step
            navigation.navigate("signup4", { uid: uid, email:route.params.email, password: route.params.password });

        } catch (error) {
            console.error("OTP Verification failed:", error);
            Alert.alert("Verification Failed", error.message);
        } finally {
            setLoading(false);
        }
    }


  return (
    <View style={styles.container}>
        <Text style={styles.titleText}>Verify your email</Text>
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
                maxLength={6}
                value={otp}
                onChangeText={setOtp}
            />
        </View>
        <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleVerify}
            disabled={loading}
        >
            {loading ? <ActivityIndicator/> :  <Text style={styles.loginText}>Verify</Text> }
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default SignupScreen3;

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