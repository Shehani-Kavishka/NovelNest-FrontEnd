import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../utils/colors';

const BottomNavBar = () => {
    const navigation = useNavigation();
    
      const handleHome = () => {
        navigation.navigate('home');
      };
      const handleSearch = () => {
        navigation.navigate('search');
      };
      const handleLibrary = () => {
        navigation.navigate('library');
      };
      const handleAuthor = () => {
        navigation.navigate('author');
      };
      const handleNotifications = () => {
        navigation.navigate('notifications');
      };

  return (
    <View style={styles.bottomNavBar}>
            <TouchableOpacity onPress={handleHome}>
              <Icon name="home" size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSearch}>
              <Icon
                name="search"
                size={25}
                color={colors.primary}
                backgroundColor={colors.white}
                paddingHorizontal={3}
                paddingVertical={3}
                borderRadius={5}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLibrary}>
              <Icon name="book" size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAuthor}>
              <Icon name="pencil-square" size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNotifications}>
              <Icon name="bell" size={25} color="white" />
            </TouchableOpacity>
          </View>
  )
}

export default BottomNavBar

const styles = StyleSheet.create({
    bottomNavBar: {
        height: 50,
        backgroundColor: colors.secondary,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        alignItems: 'center',
      },
})