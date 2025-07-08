import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'
import { useNavigation } from '@react-navigation/native'

const ResetConfirmation = () => {

    const navigation = useNavigation();
    
    const handleLogin = () => {
        navigation.navigate("login")
    }

  return (
    <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text style={styles.confirmText}>Your Password is reset !</Text>
        </View>
        <View style={styles.loginTextContainer}>
            <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.loginText}>Log in Back</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default ResetConfirmation

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.primary,
        justifyContent:"center",
        alignItems:"center"
    },
    textContainer:{
        width:300,
        height:200,
        backgroundColor:colors.secondary,
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center",
        marginVertical:150
    },
    confirmText:{
        fontSize:30,
        fontWeight:"bold",
        color:colors.white,
        width:280,
        textAlign:"center"
    },
    loginText:{
        color:colors.white,
        fontSize:16,
        fontWeight:"bold"
    }
})