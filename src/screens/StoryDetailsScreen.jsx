import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const StoryDetailsScreen = () => {

  const navigation = useNavigation();

  const handleRead =() => {
    navigation.navigate("read")
  }

  return (
    <View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>

      <View style={styles.bookdetails}>
      <Image source={require("../assets/myfirstlove.jpg")} style={styles.MainBookCover}/>
        <Text style={styles.headingText}>My First Love</Text>
        <Text style={styles.author}>Olivia Wilson</Text>
        <Text style={styles.Booktype}>Ongoing</Text>
      </View>

      <View style={styles.statsContainer}>

        <View style={styles.statsSubContainer}>
          <Icon name="eye" size={15} color={colors.white}/>
          <Text style={styles.textStyle}>155K Reads</Text>
        </View>

        <View style={styles.statsSubContainer}>
          <Icon name="star" size={15} color={colors.white}/>
          <Text style={styles.textStyle}>4.58K Rates</Text>
        </View>

        <View style={styles.statsSubContainer}>
          <Icon name="list" size={15} color={colors.white}/>
          <Text style={styles.textStyle}>14 Parts</Text>
        </View>

      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button,{backgroundColor:colors.secondary}]} onPress={handleRead}>
          <Text style={[styles.buttonText,{color:colors.white}]}>
            Read
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button,{backgroundColor:colors.white}]}>
          <Text style={[styles.buttonText,{color:colors.primary}]}>
            + Library
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.storyDescription}>
        <Text style={[styles.textStyle,{fontWeight:'regular'}]}>
          A heartfelt journey of young love, dreams, and self-discovery as two people navigate the highs and lows of their first romance.
        </Text>
      </View>

      <View style={styles.storyDescription}> 
        <View style={{flexDirection:'row',gap:180}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Icon name="list" size={15} color={colors.white}/>
            <Text style={styles.textStyle}>14 Parts</Text>
          </View>
          <Text style={styles.Booktype}>Ongoing</Text>
        </View>
        <View style={{flexDirection:'row',gap:210,marginTop:20}}>
          <View>
            <Text style={[styles.textStyle,{fontWeight:'regular'}]}>Chapter 14</Text>
            <Text style={[styles.textStyle,{fontWeight:'regular'}]}>Chapter 13</Text>
            <Text style={[styles.textStyle,{fontWeight:'regular'}]}>Chapter 12</Text>
            <Text style={[styles.textStyle,{fontWeight:'regular'}]}>Chapter 11</Text>
            <Text style={[styles.textStyle,{fontWeight:'regular'}]}>Chapter 10</Text>
          </View>
          <View>
            <Text style={[styles.textStyle,{fontWeight:'regular'}]}>date 4</Text>
            <Text style={[styles.textStyle,{fontWeight:'regular'}]}>date 3</Text>
            <Text style={[styles.textStyle,{fontWeight:'regular'}]}>date 2</Text>
            <Text style={[styles.textStyle,{fontWeight:'regular'}]}>date 1</Text>
            <Text style={[styles.textStyle,{fontWeight:'regular'}]}>date 0</Text>
          </View>
        </View>
      </View>

      <View style={styles.tagList}>
        <Text style={styles.tagItem}>Romance</Text>
        <Text style={styles.tagItem}>Youth</Text>
        <Text style={styles.tagItem}>Drama</Text>
      </View>

      <View style={styles.recommandsContainer}>
              <Text style={styles.headingText}>Similar Stories</Text>
              <View style={styles.list}>
                <View style={styles.listItem}>
                  <TouchableOpacity>
                    <Image source={require("../assets/oursecretlove.jpg")} style={styles.bookCover}/>
                  </TouchableOpacity>
                  <Text style={styles.bookTitle}>Our Secret Love</Text>
                </View>
                <View style={styles.listItem}>
                  <TouchableOpacity>
                    <Image source={require("../assets/love.jpg")} style={styles.bookCover}/>
                  </TouchableOpacity>
                  <Text style={styles.bookTitle}>Love</Text>
                </View>
                <View style={styles.listItem}>
                  <TouchableOpacity>
                    <Image source={require("../assets/waitingforyou.jpg")} style={styles.bookCover}/>
                  </TouchableOpacity>
                  <Text style={styles.bookTitle}>Waiting For You</Text>
                </View>
                <View style={styles.listItem}>
                  <TouchableOpacity>
                    <Image source={require("../assets/fightingfor.jpg")} style={styles.bookCover}/>
                  </TouchableOpacity>
                  <Text style={styles.bookTitle}>Fighting For</Text>
                </View>
              </View>
            </View>
    </ScrollView>          
    </View>
  )
}

export default StoryDetailsScreen

const styles = StyleSheet.create({
  container:{
        flex:1,
        backgroundColor:colors.primary,
        justifyContent:'center',
        alignItems:'center'
      },
      headingText:{
        fontSize:22,
        fontWeight:"bold",
        color:colors.white,
        textAlign:'center'
      },
      list:{
        flexDirection:"row",
        marginVertical:30,
        gap:25
      },
      listItem:{
        flexDirection:'column'
      },
      bookCover:{
        width:70,
        height:90
      },
      bookTitle:{
        fontSize:13,
        width:70,
        fontWeight:"bold",
        color:colors.white,
        marginTop:10
      },
      MainBookCover:{
        height:150,
        width:120,
        marginBottom:20
      },
      bookdetails:{
        alignItems:'center',
        gap:10
      },
      mainTitle:{
        color:colors.white,
        fontSize:22,
        fontWeight:'bold'
      },
      author:{
        fontSize:16,
        color:colors.white,
        fontWeight:'bold'
      },
      Booktype:{
        color:colors.white,
        fontSize:13,
        fontWeight:"bold",
        backgroundColor:colors.secondary,
        // height:25,
        width:90,
        borderRadius:25,
        textAlign:'center',
        paddingVertical:5
      },
      statsContainer:{
        flexDirection:'row',
        gap:30,
        marginVertical:25,
        justifyContent:'center'
      },
      statsSubContainer:{
        flexDirection:'row',
        alignItems:'center',
        gap:5
      },
      textStyle:{
        fontSize:13,
        fontWeight:'bold',
        color:colors.white,
        textAlign:'justify'
      },
      buttonContainer:{
        flexDirection:'row',
        gap:50,
        marginBottom:20,
        justifyContent:'center'
      },
      button:{
        width:120,
        height:40,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center'
      },
      buttonText:{
        fontSize:18,
        fontWeight:'bold'
      },
      storyDescription:{
        borderColor:colors.secondary,
        borderWidth:1,
        width:360,
        padding:10,
        marginVertical:10
      },
      tagList:{
        flexDirection:'row',
        gap:20,
        marginTop:10,
        justifyContent:'center'
      },
      tagItem:{
        color:colors.white,
        fontSize:13,
        fontWeight:'bold',
        borderWidth:1,
        borderColor:colors.secondary,
        borderRadius:25,
        paddingVertical:5,
        paddingHorizontal:15,
        textAlign:'center',
        verticalAlign:'middle'
      },
      recommandsContainer:{
        marginVertical:15
      },

})