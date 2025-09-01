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
import { useNavigation } from '@react-navigation/native';

import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Login Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (error) {
      let errorMessage = 'An unknown error occurred.';
      if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/invalid-credential'
      ) {
        errorMessage = 'Invalid email or password. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      }
      console.error('Login failed:', error);
      Alert.alert('Login Failed', errorMessage);
    }
    finally{
        setLoading(false)
    }
  };

  const handleSigup = () => {
    navigation.navigate('signup1');
  };

  const handleForgotPassword = () => {
    navigation.navigate('forgot-password');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} />

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor={colors.primary}
            keyboardType='email-address'
            autoCapitalize='none'
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor={colors.primary}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
            {loading? <ActivityIndicator color={colors.white}/> : 
          <Text style={styles.loginText}>Log in</Text>}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgetText}>Forgot password?</Text>
        </TouchableOpacity>
        <View style={styles.signUpContainer}>
          <TouchableOpacity onPress={handleSigup}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <Text style={styles.signUpText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    marginVertical: 75,
    alignItems: 'center',
  },
  inputContainer: {
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    width: 280,
    height: 50,
    marginVertical: 20,
  },
  textInput: {
    color: colors.primary,
    fontSize: 18,
  },
  loginButton: {
    backgroundColor: colors.secondary,
    width: 150,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 50,
  },
  loginText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  forgetText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 30,
  },
  signUpContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  signUpText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
});
