import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';

const BookSettingsBar = () => {

    const navigation = useNavigation();
          
        const viewChapters = () => {
            navigation.navigate("view-chapters")
        }
    
        const goToReadingPreferences = () => {
          navigation.navigate("reading-preferences")
        }
    
        const goToComments = () => {
          navigation.navigate("chapter-comments")
        }

  return (
    <View style={styles.bottomReactionBar}>
            <TouchableOpacity>
              <Icon name="star" size={25} color={colors.white}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToComments}>
              <Icon name="comments" size={25} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity onPress={goToReadingPreferences}>
              <Icon name="cog" size={25} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity onPress={viewChapters}>
              <Icon name="list" size={25} color={colors.white} />
            </TouchableOpacity>
          </View>
  )
}

export default BookSettingsBar

const styles = StyleSheet.create({
    bottomReactionBar:{
        height:50,
        backgroundColor:colors.secondary,
        bottom:0,
        left:0,
        right:0,
        position:'absolute',
        flexDirection:'row',
        justifyContent:'space-around',
        paddingVertical:10,
        alignItems:'center',
      },
})