import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../utils/colors'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Checkbox } from 'react-native-paper';

const ResetPasswordScreen = () => {

    const [checked, setChecked] = useState(false);

    const navigation = useNavigation();
    
    const handleReset = () => {
        navigation.navigate("reset-confirm")
    }


  return (
    <View style={styles.container}>
        <Text style={styles.titleText}>Reset Password</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.textInput}
                placeholder='New Password'
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
        <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleReset}
        >
            <Text style={styles.loginText}>Reset</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default ResetPasswordScreen

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
        marginVertical:40

    },
    textInput:{
        color:colors.primary,
        fontSize:18,
    },
    passwordTextContainer:{
        marginTop:10,
        marginBottom:20
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