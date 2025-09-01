// no backend is needed 

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'
import Icon from 'react-native-vector-icons/FontAwesome';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.heading}>About NovelNest</Text>
        <Text style={styles.title}>NovelNest</Text>
        <Text style={styles.subtitle}>
            <Icon name="copyright" size={12} color="white" />
            2024 NovelNest
        </Text>
        <Text style={styles.title}>Version</Text>
        <Text style={styles.subtitle}>1.0.0</Text>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.title}>Terms of Use</Text>
        <Text style={styles.title}>Code of Conduct</Text>
        <Text style={styles.title}>Content Guidelines</Text>
        <Text style={styles.title}>Licenses</Text>
    </View>
  )
}

export default AboutScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.primary,

    },
    heading:{
        fontSize:22,
        fontWeight:"bold",
        color:colors.white,
        marginLeft:50
    },
    title:{
        color:colors.white,
        fontSize:15,
        fontWeight:"bold",
        marginTop:50,
        marginLeft:50
    },
    subtitle:{
        color:colors.white,
        fontSize:12,
        marginTop:10,
        marginLeft:50,
    },
})