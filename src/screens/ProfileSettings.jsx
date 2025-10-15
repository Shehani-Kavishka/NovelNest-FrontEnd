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
import React, { useEffect, useState } from 'react';
import { colors } from '../utils/colors';
import { Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { launchImageLibrary } from 'react-native-image-picker';

import { getAuth,updateProfile, deleteUser } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

const UserProfileData = {
  displayName: 'Shehani Kavishka',
  username: 'Shehani Kavishka',
  email: 'shehanikavishkarg@gmail.com',
  followerCount: 1,
  followingCount: 1,
};

const ProfileSettings = () => {
const navigation = useNavigation();

const [displayName, setDisplayName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [newImageUri, setNewImageUri] = useState(null);

   const [isLoading, setIsLoading] = useState(true); 
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
      const fetchUserData = async () => {
        const user = getAuth().currentUser;
        if (user) {
          setDisplayName(user.displayName || '');
          setProfileImage(user.photoURL || null);
        }
        setIsLoading(false);
      };
      fetchUserData();
    }, []);


    const handleChoosePhoto = async () => {
      await launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
if(response.assets && response.assets.length > 0) {
  const selectedUri = response.assets[0].uri;
  setProfileImage(selectedUri);
  setNewImageUri(selectedUri); 
}
      });
    };

    const handleSaveChanges = async () => {
      if (isSaving) return;
      setIsSaving(true);

      const user = getAuth().currentUser;
      if (!user) {
        Alert.alert('Error', 'No user is logged in.');
        setIsSaving(false);
        return;
      } 

      try {
        let photoURL = user.photoURL;
        if (newImageUri) {
          const strorage = getStorage();
          const imageRef = ref(strorage, `profile-pictures/${user.uid}`);
          const response = await fetch(newImageUri);
          const blob = await response.blob();
          await uploadBytes(imageRef, blob);
          photoURL = await getDownloadURL(imageRef);
        }

        await updateProfile(user, {
          displayName: displayName,
          photoURL: photoURL,
        });
        const db = getFirestore();
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, {
          username: displayName,
          profilePicUrl: photoURL,
        });

        Alert.alert('Success', 'Profile updated successfully.');
        navigation.goBack();
      }catch(error){
        console.error('Failed to update profile:', error);
        Alert.alert('Error', 'Could not update profile. Please try again.');
      }
      finally{
        setIsSaving(false);
      }
    };
  
  const gotoForgotPassword = () => {
    navigation.navigate('forgot-password');
  };

  const gotoChangePassword = () => {
    navigation.navigate('change-password');
  };

  const handleDeleteAccount = async () => {
    
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
              
              const functions = getFunctions();
             
              const deleteUserData = httpsCallable(
                functions,
                'user-deleteAccount',
              );
              await deleteUserData();

             
              await deleteUser(user);

            
              Alert.alert(
                'Account Deleted',
                'Your account has been successfully deleted.',
              );
            
            } catch (error) {
              console.error('Failed to delete account:', error);
       
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

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

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
            value={displayName}
            style={styles.textInput}
            placeholder="Enter user name"
            placeholderTextColor={colors.primary}
            onChangeText={setDisplayName}
          />
        </View>
        <Text style={styles.fieldText}>Email</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholderTextColor={colors.primary}
            keyboardType="email-address"
            value={getAuth().currentUser?.email}
            editable={false}
            placeholder="Enter email address"
          />
        </View>
      </View>

<TouchableOpacity style={styles.fieldText} onPress={handleSaveChanges} disabled={isSaving}>
        {isSaving ? (
          <ActivityIndicator color={colors.primary} />
        ) : (
          <Text style={styles.saveButtonText}>Save Changes</Text>
        )}
      </TouchableOpacity>

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
