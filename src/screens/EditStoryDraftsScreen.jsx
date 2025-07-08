import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Checkbox } from 'react-native-paper';

const EditStoryDraftsScreen = () => {
  const navigation = useNavigation();

  const gotoAddChapter = () => {
    navigation.navigate('add-chapter');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Edit Story Drafts</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <View style={styles.imageContainer}>
            <View style={styles.image}>
              <Image
                source={require('../assets/lovestory.jpg')}
                style={styles.bookCover}
              />
            </View>
            <Text style={styles.passwordText}>Edit Cover picture</Text>
          </View>
          <Text style={styles.passwordText}>Edit Story Title</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="A Pinky Promise"
              placeholderTextColor={colors.primary}
            />
            
          </View>
          <Text style={styles.passwordText}>Edit Story Description</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.textInput, { height: 80 }]}
              placeholder="Childhood best friends made a pinky promise to always stay together, but life pulled them apart."
              placeholderTextColor={colors.primary}
              multiline={true}
              textAlignVertical="top" 
            />
            
          </View>
          <Text style={styles.passwordText}>Edit Story Tags</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="love, romance, college love"
              placeholderTextColor={colors.primary}
            />
          </View>
          <Text style={styles.passwordText}>Edit Story Genre</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Romance"
              placeholderTextColor={colors.primary}
            />
           
          </View>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity>
            <Text style={[styles.optionText,{color:colors.cyan}]}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.optionText}>Go to Chapters</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.optionText}>Add a New Chapter</Text>
          </TouchableOpacity>
           <TouchableOpacity>
            <Text style={[styles.optionText,{color:colors.red}]}>Delete Story</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditStoryDraftsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  titleText: {
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 40,
  },
  formContainer: {
    marginTop: 40,
    marginLeft: 30,
    marginBottom:20
  },
  inputContainer: {
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    width: 350,
    height: 'auto',
    marginBottom: 30,
    flexDirection:'row',
    alignItems:'center',
    gap:170,
    position: 'relative'
  },
  textInput: {
    color: colors.primary,
    fontSize: 15,
  },
  passwordTextContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  bulletIcon: {
    marginRight: 8,
  },
  passwordText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
    width: 280,
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: colors.secondary,
    width: 150,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 50,
  },
  loginText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  forgetText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 30,
  },
  signUpContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  signUpText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    height: 100,
  },
  checkText: {
    marginLeft: 8,
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    width: 280,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40,
    marginBottom: 30,
  },
  image: {
    height: 100,
    width: 80,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageText: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: 'bold',
  },
  nextText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextButtonContainer: {
    alignItems: 'flex-end',
    marginRight: 40,
  },
  nextButton: {
    gap: 20,
    flexDirection: 'row',
  },
  bookCover: {
    width: 80,
    height: 100,
  },
  icon:{
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  optionsContainer:{
    marginLeft:40,
    gap:40,
    marginBottom:40
  },
  optionText:{
    color:colors.white,
    fontWeight:'bold',
    fontSize:15,
  }
});
