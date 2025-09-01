import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { colors } from '../utils/colors';
import { Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { launchImageLibrary } from 'react-native-image-picker';

import { getAuth, deleteUser } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';

const UserProfileData = {
  displayName: 'Shehani Kavishka',
  username: 'Shehani Kavishka',
  email: 'shehanikavishkarg@gmail.com',
  followerCount: 1,
  followingCount: 1,
};

const ProfileSettings = () => {
  const [userData, setUserData] = useState(UserProfileData);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const gotoForgotPassword = () => {
    navigation.navigate('forgot-password');
  };

  const gotoChangePassword = () => {
    navigation.navigate('change-password');
  };

  const handleChoosePhoto = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    await launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Error', 'Could not select image. Please try again.');
      } else if (response.assets && response.assets.length > 0) {
        // We have a URI!
        const selectedUri = response.assets[0].uri;
        setProfileImage(selectedUri);
      }
    });
  };

  const handleDeleteAccount = async () => {
    // STEP 3: Show a confirmation alert first
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action is permanent and cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          // This function will run if the user presses "Delete"
          onPress: async () => {
            setLoading(true);
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
              Alert.alert('Error', 'No user is logged in.');
              setLoading(false);
              return;
            }

            try {
              // STEP 4: Call the Cloud Function to move Firestore data
              const functions = getFunctions();
              // The name 'user-deleteAccount' comes from your index.js export
              const deleteUserData = httpsCallable(
                functions,
                'user-deleteAccount',
              );
              await deleteUserData();

              // STEP 5: If the function succeeds, delete the user from Firebase Auth
              await deleteUser(user);

              // STEP 6: Show success message. The app will auto-navigate.
              Alert.alert(
                'Account Deleted',
                'Your account has been successfully deleted.',
              );
              // NOTE: You don't need to navigate manually. The `onAuthStateChanged`
              // listener in your App.jsx will detect the user is null and automatically
              // switch to the AuthStack, effectively taking you to the splash/login screen.
            } catch (error) {
              console.error('Failed to delete account:', error);
              // This is a common security error. The user must have logged in recently.
              if (error.code === 'auth/requires-recent-login') {
                Alert.alert(
                  'Action Required',
                  'This is a sensitive action. Please log out and log back in before deleting your account.',
                );
              } else {
                Alert.alert(
                  'Error',
                  'Failed to delete your account. Please try again.',
                );
              }
            } finally {
              setLoading(false);
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile Settings</Text>
      <View style={styles.profilePicContainer}>
        <TouchableOpacity onPress={handleChoosePhoto}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require('../assets/profile-common.png')
            }
            style={styles.profilePic}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.fieldText}>Profile Picture</Text>
          <Text style={styles.subText}>Tap to change</Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.fieldText}>Username</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={userData.displayName || userData.username || ''}
            style={styles.textInput}
            placeholder="Enter user name"
            placeholderTextColor={colors.primary}
            onChangeText={newUsername =>
              setUserData({ ...userData, displayName: newUsername })
            }
          />
        </View>
        <Text style={styles.fieldText}>Email</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholderTextColor={colors.primary}
            keyboardType="email-address"
            value={userData.email}
            editable={false}
            onChangeText={newEmail =>
              setUserData({ ...userData, email: newEmail })
            }
            placeholder="Enter email address"
          />
        </View>
      </View>
      <View style={styles.optionslist}>
        <TouchableOpacity onPress={gotoChangePassword}>
          <Text style={[styles.fieldText, { marginBottom: 50 }]}>
            Change Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={gotoForgotPassword}>
          <Text style={[styles.fieldText, { marginBottom: 50 }]}>
            Forgot Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeleteAccount} disabled={loading}>
          {loading ? (
             <ActivityIndicator size="small" color={colors.red} />
          ) : (
            <Text style={[styles.fieldText, { color: colors.red }]}>
              Delete Account
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: 50,
  },
  profilePicContainer: {
    flexDirection: 'row',
    width: 150,
    marginLeft: 50,
    marginVertical: 50,
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: 20,
    gap: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  formContainer: {
    marginLeft: 50,
  },
  fieldText: {
    fontSize: 15,
    color: colors.white,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 12,
    color: colors.white,
  },
  inputContainer: {
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    width: 280,
    height: 40,
    marginVertical: 20,
    justifyContent: 'center',
  },
  textInput: {
    color: colors.primary,
    fontSize: 12,
  },
  optionslist: {
    marginLeft: 50,
    marginVertical: 50,
  },
});
