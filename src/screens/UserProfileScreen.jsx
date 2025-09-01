import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import userProfile from '../assets/profile-common.png';

import { auth, db } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

//actrobat

import { useIsFocused } from '@react-navigation/native';

const UserProfileData = {
  displayName: 'Shehani Kavishka',
  username: 'Shehani Kavishka',
  followerCount: 1,
  followingCount: 1,
  profilePicUrl: userProfile,
};

const UserProfileScreen = () => {
  const navigation = useNavigation();

  const isFocused = useIsFocused();

  const [userData, setUserData] = useState(UserProfileData);
  const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     let isMounted = true;

  //     const fetchUserData = async () => {
  //       setLoading(true);
  //       const user = auth.currentUser;
  //       if (user) {
  //         try {
  //           // Fetch the user's document from Firestore
  //           const userDocRef = doc(db, 'users', user.uid);
  //           const userDoc = await getDoc(userDocRef);

  //           if (isMounted) {
  //             if (userDoc.exists()) {
  //               // Combine Auth data and Firestore data
  //               setUserData({
  //                 uid: user.uid,
  //                 displayName: user.displayName, // From Auth
  //                 ...userDoc.data(), // From Firestore (includes username, email, etc.)
  //               });
  //             } else {
  //               Alert.alert('Error', 'User data not found in the database.');
  //               // Handle case where user exists in Auth but not Firestore
  //             }
  //           }
  //         } catch (error) {
  //           console.error('Failed to fetch user doc:', error);
  //           Alert.alert('Error', 'Could not connect to the database.');
  //         } finally {
  //           if (isMounted) {
  //             setLoading(false);
  //           }
  //         }
  //       } else {
  //         if (isMounted) {
  //           navigation.navigate('login');
  //           setLoading(false);
  //         }
  //       }
  //     };

  //     if (isFocused) {
  //       fetchUserData();
  //     }

  //     return () => {
  //       isMounted = false;
  //     };
  //   }, [isFocused]);

  const goToSettings = () => {
    navigation.navigate('profile-settings');
  };
  const goToAbout = () => {
    navigation.navigate('about');
  };
  const goToReadingPreferences = () => {
    navigation.navigate('reading-preferences');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // After successful logout, navigate to the login screen or a startup screen
      navigation.navigate('login');
    } catch (error) {
      console.error('Error signing out: ', error);
      Alert.alert('Logout Failed', error.message);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.userName}>Could not load user profile.</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.optionText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={userData.profilePicUrl} style={styles.profilePic} />
      <Text style={styles.userName}>
        {userData.displayName || userData.username || 'N/A'}
      </Text>
      <View style={styles.followBaseContainer}>
        <Text style={styles.followText}>
          {userData.followerCount || 0} Followers
        </Text>
        <Text style={styles.followText}>
          {userData.followingCount || 0} Following
        </Text>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={goToSettings}>
          <Text style={styles.optionText}>Profile Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToReadingPreferences}>
          <Text style={styles.optionText}>Reading Preferences</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToAbout}>
          <Text style={styles.optionText}>About NovelNest</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.optionText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  loadingContainer: {
    justifyContent: 'center',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginTop: 50,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
    marginVertical: 30,
  },
  followBaseContainer: {
    flexDirection: 'row',
    gap: 30,
  },
  followText: {
    width: 80,
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 13,
    textAlign: 'center',
    height: 50,
  },
  optionsContainer: {
    width: 270,
  },
  optionText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 50,
  },
  toggleButton: {
    marginTop: 50,
  },
});
