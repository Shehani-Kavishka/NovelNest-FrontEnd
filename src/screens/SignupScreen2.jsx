import { StyleSheet, Text, TextInput, TouchableOpacity, View,Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../utils/colors'
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Checkbox } from 'react-native-paper';

import { httpsCallable } from "firebase/functions"; 
import { functions } from '../firebaseConfig';     


const SignupScreen2 = () => {

     const route = useRoute();
    const { email, username } = route.params;

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    
    const handleSignup = async () => {
        if (password !== confirmPassword) return Alert.alert("Error", "Passwords do not match.");
        if (password.length < 10) return Alert.alert("Error", "Password must be at least 10 characters long.");
        if (!checked) return Alert.alert("Error", "You must agree to the Terms of Service.");

        setLoading(true);
        try {
            
            const registerUser = httpsCallable(functions, 'user-register');
            const result = await registerUser({
                email: email,
                username: username,
                password: password,
            });

              const data = result.data;
            console.log(data.message);

             navigation.navigate("signup3", { uid: data.uid, email: email, password: password });
         } catch (error) {
            console.error("Function call failed:", error);
            Alert.alert("Signup Failed", error.message);
        } finally {
            setLoading(false);
        }
    }


  return (
    <View style={styles.container}>
        <Text style={styles.titleText}>Create an Account</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.textInput}
                placeholder='Password'
                placeholderTextColor={colors.primary}
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
        </View>
        <View style={styles.passwordTextContainer}>
            <View style={styles.bulletRow}>
                <Icon name="circle" size={6} color="white" style={styles.bulletIcon} />
                <Text style={styles.passwordText}>
                    Must contain both uppercase and lowercase letters, a number, and a special character
                </Text>
            </View>
            <View style={styles.bulletRow}>
                <Icon name="circle" size={6} color="white" style={styles.bulletIcon} />
                <Text style={styles.passwordText}>
                    Must be at least 10 characters in length
                </Text>
            </View>
        </View>
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.textInput}
                placeholder='Re-enter password'
                placeholderTextColor={colors.primary}
                secureTextEntry={true}
                  value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
        </View>
        <View style={styles.checkContainer}>
            <View style={styles.checkRow}>
                <Checkbox 
                    status={checked ? 'checked':'unchecked'}
                    onPress={() => setChecked(!checked)}
                    color='white'
                    style={styles.checkbox}
                />
                <Text style={styles.checkText}>
                    Yes, I have read and agree to Terms of Service and Privacy Policy
                </Text>
            </View>
        </View>
        <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleSignup}
             disabled={loading}
        >
            {loading ? <ActivityIndicator color={colors.white} /> : <Text style={styles.loginText}>Sign up</Text>}
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default SignupScreen2

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
        marginVertical:20

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
        fontSize:12,
        fontWeight:"bold",
        width:280,
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