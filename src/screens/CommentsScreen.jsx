import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CommentsScreen = () => {
  const navigation = useNavigation();

  const saveComment = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Chapter 1</Text>
      <ScrollView>
        <View style={styles.notificationsContainer}>
          <View style={styles.notification}>
            <Image
              source={require('../assets/profile-pic.jpg')}
              style={styles.profilepicture}
            />
            <View style={styles.commentBar}>
              <TextInput
                style={styles.textInput}
                placeholder="Write yout Thoughts"
                placeholderTextColor={colors.primary}
                secureTextEntry={true}
              />
              
            </View>
            <TouchableOpacity onPress={saveComment}>
                <Icon name="share" size={25} color={colors.white} />
              </TouchableOpacity>
          </View>

          <View style={styles.notification}>
            <Image
              source={require('../assets/profile-common.png')}
              style={styles.profilepicture}
            />
            <View style={styles.notificationTextContainer}>
              <Text style={styles.notificationText}>
                Waiting for the next chapter{' '}
              </Text>
              <Text style={styles.notificationWriter}>James Smith </Text>
              <Text style={styles.notificationTimeStamp}>
                31 Oct 2024 09.30 pm{' '}
              </Text>
            </View>
          </View>

          <View style={styles.notification}>
            <Image
              source={require('../assets/profile-common.png')}
              style={styles.profilepicture}
            />
            <View style={styles.notificationTextContainer}>
              <Text style={styles.notificationText}>Amazing </Text>
              <Text style={styles.notificationWriter}>James Smith </Text>
              <Text style={styles.notificationTimeStamp}>
                31 Oct 2024 09.30 pm{' '}
              </Text>
            </View>
          </View>

          <View style={styles.notification}>
            <Image
              source={require('../assets/profile-common.png')}
              style={styles.profilepicture}
            />
            <View style={styles.notificationTextContainer}>
              <Text style={styles.notificationText}>What a lovely story </Text>
              <Text style={styles.notificationWriter}>James Smith </Text>
              <Text style={styles.notificationTimeStamp}>
                31 Oct 2024 09.30 pm{' '}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
    marginVertical: 50,
    textAlign: 'center',
  },
  notificationsContainer: {
    marginHorizontal: 30,
    gap: 30,
  },
  profilepicture: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  notificationTextContainer: {
    flexDirection: 'column',
    width: 210,
  },
  notification: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  notificationText: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 13,
    marginBottom: 12,
  },
  notificationTimeStamp: {
    color: colors.secondary,
    fontSize: 11,
    marginVertical: 3,
  },
  notificationWriter: {
    color: colors.white,
    fontSize: 11,
  },
  bookcover: {
    height: 70,
    width: 60,
  },
  commentBar: {
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderRadius: 10,
    padding: 10,
    width: 250,
  },
  textInput: {
    color: colors.primary,
    fontSize: 13,
  },
});
