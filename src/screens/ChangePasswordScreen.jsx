import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../utils/colors'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Checkbox } from 'react-native-paper';

import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

const ChangePasswordScreen = () => {

    const navigation = useNavigation();

    const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    // 1. Basic Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match.');
      return;
    }

    setLoading(true);
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      // Create a credential with the user's email and the current password
      const credential = EmailAuthProvider.credential(user.email, currentPassword);

      try {
        // 2. Re-authenticate the user to confirm their identity
        await reauthenticateWithCredential(user, credential);

        // 3. If re-authentication is successful, update the password
        await updatePassword(user, newPassword);

        Alert.alert(
          'Success',
          'Your password has been changed successfully.',
        );
        navigation.goBack(); // Navigate back to the previous screen
      } catch (error) {
        // 4. Handle Errors
        console.error(error);
        if (error.code === 'auth/wrong-password') {
          Alert.alert('Error', 'The current password you entered is incorrect.');
        } else if (error.code === 'auth/weak-password') {
          Alert.alert('Error', 'The new password is too weak. Please choose a stronger one.');
        } else {
          Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    } else {
      // This should not happen if the screen is protected, but it's good practice
      Alert.alert('Error', 'No user is currently logged in.');
      setLoading(false);
    }
  };
    
    const gotoConfirmation = () => {
        navigation.navigate("reset-confirm")
    }


  return (
    <View style={styles.container}>
        <Text style={styles.titleText}>Change Password</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.textInput}
                placeholder='Current Password'
                placeholderTextColor={colors.primary}
                secureTextEntry={true}
                 value={currentPassword}
            onChangeText={setCurrentPassword}
            />
        </View>
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.textInput}
                placeholder='New Password'
                placeholderTextColor={colors.primary}
                secureTextEntry={true}
                 value={newPassword}
            onChangeText={setNewPassword}
            />
        </View>
        <View style={styles.passwordTextContainer}>
            <View style={styles.bulletRow}>
                <Icon name="circle" size={6} color="white" style={styles.bulletIcon} />
                <Text style={styles.passwordText}>
                    Must contain both uppercase and lowercase letters, a number, and a special character
                </Text>
            </View>
            <View style={styles.bulletRow}>
                <Icon name="circle" size={6} color="white" style={styles.bulletIcon} />
                <Text style={styles.passwordText}>
                    Must be at least 10 characters in length
                </Text>
            </View>
        </View>
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.textInput}
                placeholder='Re-enter password'
                placeholderTextColor={colors.primary}
                secureTextEntry={true}
                value={confirmPassword}
            onChangeText={setConfirmPassword}
            />
        </View>
        <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleChangePassword}
            disabled={loading}
        >
            {loading ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            <Text style={styles.loginText}>Change</Text>
          )}
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default ChangePasswordScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.primary,
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    titleText:{
        color:colors.white,
        fontSize:30,
        fontWeight:"bold"
    },
    formContainer:{
        marginVertical:50,
        alignItems:"center"
    },
    inputContainer:{
        borderRadius:10,
        backgroundColor:colors.white,
        paddingHorizontal:15,
        width:280,
        height:50,
        marginVertical:30

    },
    textInput:{
        color:colors.primary,
        fontSize:18,
    },
    passwordTextContainer:{
        marginTop:10,
        marginBottom:20
    },
    bulletRow:{
        flexDirection:"row",
        alignItems:"center",
        marginBottom:15
    },
    bulletIcon:{
        marginRight:8
    },
    passwordText:{
        color:colors.white,
        fontSize:12,
        fontWeight:"bold",
        width:280,
    },
    loginButton:{
        backgroundColor:colors.secondary,
        width:150,
        height:50,
        borderRadius:10,
        justifyContent:"center",
        marginTop:50
    },
    loginText:{
        color:colors.white,
        fontWeight:"bold",
        fontSize:18,
        textAlign:"center",
    },
    forgetText:{
        color:colors.white,
        fontWeight:"bold",
        fontSize:14,
        textAlign:"center",
        marginTop:30
    },
    signUpContainer:{
        alignItems:"center",
        marginTop:50
    },
    signUpText:{
        color:colors.white,
        fontWeight:"bold",
        fontSize:14,
        textAlign:"center",
    },
    checkRow:{
        flexDirection:"row",
        alignItems:"center",
        padding:10,
        height:100
    },
    checkText:{
        marginLeft:8,
        color:colors.white,
        fontSize:14,
        fontWeight:"bold",
        width:280,
    },
})