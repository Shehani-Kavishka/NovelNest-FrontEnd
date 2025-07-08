import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';

const ViewChaptersScreen = () => {
    const navigation = useNavigation();
          
        const goToChapter = () => {
            navigation.navigate("read")
        }
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bookdetails}>
          <Image
            source={require('../assets/myfirstlove.jpg')}
            style={styles.MainBookCover}
          />
          <Text style={styles.headingText}>My First Love</Text>
          <Text style={[styles.author,{marginVertical:0}]}>Olivia Wilson</Text>
        </View>

        <View style={styles.chapterList}>
            <TouchableOpacity onPress={goToChapter}><Text style={styles.author}>Chapter 01</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.author}>Chapter 02</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.author}>Chapter 03</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.author}>Chapter 04</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.author}>Chapter 05</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.author}>Chapter 06</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.author}>Chapter 07</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ViewChaptersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    
  },
  MainBookCover: {
    height: 150,
    width: 120,
    marginBottom: 20,
  },
  bookdetails: {
    alignItems: 'center',
    gap: 10,
  },
  author: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
    marginVertical:10
  },
  Booktype: {
    color: colors.white,
    fontSize: 13,
    fontWeight: 'bold',
    backgroundColor: colors.secondary,
    // height:25,
    width: 90,
    borderRadius: 25,
    textAlign: 'center',
    paddingVertical: 5,
  },
  headingText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
  chapterList:{
   alignItems:'left',
   marginLeft:50,
   marginTop:30
  }
});
