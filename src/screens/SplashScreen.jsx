import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'
import { useNavigation } from '@react-navigation/native'

const SplashScreen = () => {

    const navigation = useNavigation();

    const handleNavigate = () => {
        navigation.navigate("login")
    }

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigate}>
            <Image source={require("../assets/full-logo.png")} style={styles.logo}/>
        </TouchableOpacity>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.primary,
        alignItems:"center",
        justifyContent:"center"
    },
    logo:{
        width:200,
        height:150,
    }
})