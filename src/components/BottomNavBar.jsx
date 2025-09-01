import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../utils/colors';

const BottomNavBar = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const navButtons = [
        {
            iconName: 'home',
            routeName: 'home',
            onPress: () => navigation.navigate('home'),
        },
        {
            iconName: 'search',
            routeName: 'search',
            onPress: () => navigation.navigate('search'),
        },
        {
            iconName: 'book',
            routeName: 'library',
            onPress: () => navigation.navigate('library'),
        },
        {
            iconName: 'pencil-square',
            routeName: 'author',
            onPress: () => navigation.navigate('author'),
        },
        {
            iconName: 'bell',
            routeName: 'notifications',
            onPress: () => navigation.navigate('notifications'),
        }
    ];
      
    

  return (
    <View style={styles.bottomNavBar}>
      {navButtons.map((button, index) => {
        const isActive = route.name === button.routeName;
        return (
          <TouchableOpacity key={index} onPress={button.onPress} style={styles.navButton}>
            <View style={isActive ? styles.activeIconContainer : styles.iconContainer}>
                        <Icon 
                            name={button.iconName} 
                            size={25} 
                            // Set the color conditionally based on the 'isActive' state
                            color={isActive ? colors.primary : 'white'} 
                        />
                    </View>
          </TouchableOpacity>
        )})}
          </View>
  )
}

export default BottomNavBar

const styles = StyleSheet.create({
    bottomNavBar: {
        height: 60,
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
      navButton: {
        flex: 1, // Each button takes up equal space
        alignItems: 'center',
        justifyContent: 'center',
      },
      iconContainer: {
        // Style for the default, inactive icon
        padding: 5,
      },
      activeIconContainer: {
        // Style for the selected, active icon
        backgroundColor: 'white',
        borderRadius: 10, // Gives it rounded corners
        padding: 8,
      }
})