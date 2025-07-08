import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';

const BookEditBar = () => {

    const navigation = useNavigation();
          
        

  return (
    <View style={styles.bottomReactionBar}>
            <TouchableOpacity>
              <Icon name="bold" size={25} color={colors.white}/>
            </TouchableOpacity>
            <TouchableOpacity >
              <Icon name="italic" size={25} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity >
              <Icon name="underline" size={25} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity >
              <Icon name="align-left" size={25} color={colors.white} />
            </TouchableOpacity>
             <TouchableOpacity>
              <Icon name="ellipsis-v" size={25} color={colors.white} />
            </TouchableOpacity>
          </View>
  )
}

export default BookEditBar

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