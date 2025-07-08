import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../utils/colors'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Checkbox } from 'react-native-paper';

const SignupScreen2 = () => {

    const [checked, setChecked] = useState(false);

    const navigation = useNavigation();
    
    const handleSignup = () => {
        navigation.navigate("signup3")
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
        >
            <Text style={styles.loginText}>Sign up</Text>
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