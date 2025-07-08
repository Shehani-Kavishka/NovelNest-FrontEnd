import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../utils/colors'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Checkbox } from 'react-native-paper';

const CreateStoryScreen = () => {

    const navigation = useNavigation();
    
    const gotoAddChapter = () => {
        navigation.navigate("add-chapter")
    }


  return (
    <View style={styles.container}>
        <Text style={styles.titleText}>Add Story Info</Text>
      <View style={styles.formContainer}>
        <View style={styles.imageContainer}>
            <View style={styles.image}>
                <Text style={styles.imageText}>+</Text>
            </View>
            <Text style={styles.passwordText}>Add Cover picture</Text>
        </View>
        <Text style={styles.passwordText}>Story Title</Text>
        <View style={styles.inputContainer}>
          
            <TextInput 
                style={styles.textInput}
                placeholder='Story Title'
                placeholderTextColor={colors.primary}
              
            />
        </View>
        <Text style={styles.passwordText}>Story Description</Text>
        <View style={styles.inputContainer}>
            <TextInput 
                style={[styles.textInput,{height:80}]}
                placeholder='Story Description'
                placeholderTextColor={colors.primary}
                
            />
        </View>
       <Text style={styles.passwordText}>Story Tags</Text>
        <View style={styles.inputContainer}>
          
            <TextInput 
                style={styles.textInput}
                placeholder='Add some tags to your story'
                placeholderTextColor={colors.primary}
               
            />
        </View>
        <Text style={styles.passwordText}>Story Genre</Text>
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.textInput}
                placeholder='Story Genre'
                placeholderTextColor={colors.primary}
                
            />
        </View>
        
      </View>

      <View style={styles.nextButtonContainer}>
              <TouchableOpacity style={styles.nextButton} onPress={gotoAddChapter}>
                <Text style={styles.nextText}>Next</Text>
                <Icon name={'angle-right'} size={25} color={colors.white}/>
              </TouchableOpacity>
              </View>
    </View>
  )
}


export default CreateStoryScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.primary,
        flex:1,
    },
    titleText:{
        color:colors.white,
        fontSize:22,
        fontWeight:"bold",
        marginLeft:40
    },
    formContainer:{
        marginVertical:50,
        marginLeft:30
    },
    inputContainer:{
        borderRadius:10,
        backgroundColor:colors.white,
        paddingHorizontal:15,
        width:350,
        height:'auto',
       marginBottom:30

    },
    textInput:{
        color:colors.primary,
        fontSize:15,
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
        fontSize:15,
        fontWeight:"bold",
        width:280,
        marginBottom:15
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
    imageContainer:{
      flexDirection:'row',
      alignItems:'center',
      gap:40,
      marginBottom:30
    },
    image:{
      height:100,
      width:80,
      backgroundColor:colors.white,
      alignItems:'center',
      justifyContent:'center'
    },
    imageText:{
      color:colors.primary,
      fontSize:30,
        fontWeight:"bold",
    },
    nextText:{
        color:colors.white,
        fontSize:18,
        fontWeight:'bold'
      },
      nextButtonContainer:{
        alignItems:'flex-end',
        marginRight:40
      },
      nextButton:{
        gap:20,
        flexDirection:'row',
      },
})