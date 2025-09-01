import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../utils/colors';
import { useNavigation, useRoute } from '@react-navigation/native';

import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebaseConfig';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignupScreen4 = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const { uid, email, password } = route.params;

   const [selectedGenres, setSelectedGenres] = useState([]);

    const handleGenreSelect = (genre) => {
    
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((item) => item !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleContinue = async () => {
    if (selectedGenres.length < 3) {
      Alert.alert(
        'Select Genres',
        'Please choose at least 3 genres to continue.',
      );
      return;
    }

    try {
      // --- API CALL TO YOUR CLOUD FUNCTION ---
      const saveGenres = httpsCallable(functions, 'user-saveGenres');
      await saveGenres({ uid: uid, genres: selectedGenres });

      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('home');
    } catch (error) {
      console.error("Final signup step failed:", error);
      Alert.alert("Error", "Could not complete signup. Please try logging in.");
      // If sign-in fails, navigate to login
      navigation.navigate("login");
    }
  };

  const isSelected = (genre) => selectedGenres.includes(genre);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        What are your 3 favorite genres to read?
      </Text>
      <View style={styles.formContainer}>
        <View style={styles.passwordTextContainer}>
          <View style={styles.bulletRow}>
            <Text style={styles.verifyText}>
              Choose 3 genres to get started with personalized recommendations
            </Text>
            </View>
    </View>

            <View style={styles.genreContainer}>
              <View style={styles.genreRow}>
                <TouchableOpacity style={[styles.genreButton, { width: 122 },isSelected('Romance') && styles.selectedGenreButton,]} onPress={() => handleGenreSelect('Romance')}>
                  <Text style={[styles.genreText, isSelected('Romance') && styles.selectedGenreText]}>Romance</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.genreButton, { width: 122 },isSelected('Fantasy') && styles.selectedGenreButton,]} onPress={() => handleGenreSelect('Fantasy')}>
                  <Text style={[styles.genreText, isSelected('Fantasy') && styles.selectedGenreText]}> Fantasy</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.genreRow}>
                <TouchableOpacity style={[styles.genreButton, { width: 265 },isSelected('Non Fiction') && styles.selectedGenreButton,]} onPress={() => handleGenreSelect('Non Fiction')}>
              <Text style={[styles.genreText, isSelected('Non Fiction') && styles.selectedGenreText]}>Non Fiction</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.genreRow}>
                <TouchableOpacity style={[styles.genreButton, { width: 80 },isSelected('Horror') && styles.selectedGenreButton,]} onPress={() => handleGenreSelect('Horror')}>
                  <Text style={[styles.genreText, isSelected('Horror') && styles.selectedGenreText]}>Horror</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.genreButton, { width: 80 },isSelected('Thriller') && styles.selectedGenreButton,]} onPress={() => handleGenreSelect('Thriller')}>
                  <Text style={[styles.genreText, isSelected('Thriller') && styles.selectedGenreText]}>Thriller</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.genreButton, { width: 80 },isSelected('Mystery') && styles.selectedGenreButton,]} onPress={() => handleGenreSelect('Mystery')}>
                  <Text style={[styles.genreText, isSelected('Mystery') && styles.selectedGenreText]}>Mystery</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.genreRow}>
                <TouchableOpacity style={[styles.genreButton, { width: 122 },isSelected('Fanfiction') && styles.selectedGenreButton,]} onPress={() => handleGenreSelect('Fanfiction')}>
                  <Text style={[styles.genreText, isSelected('Fanfiction') && styles.selectedGenreText]}>Fanfiction</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.genreButton, { width: 122 },isSelected('Werewolf') && styles.selectedGenreButton,]} onPress={() => handleGenreSelect('Werewolf')}>
                  <Text style={[styles.genreText, isSelected('Werewolf') && styles.selectedGenreText]}>Werewolf</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.genreRow}>
                <TouchableOpacity style={[styles.genreButton, { width: 80 },isSelected('Humor') && styles.selectedGenreButton,]} onPress={() => handleGenreSelect('Humor')}>
                  <Text style={[styles.genreText, isSelected('Humor') && styles.selectedGenreText]}>Humor</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.genreButton, { width: 175 },isSelected('Science Fiction') && styles.selectedGenreButton,]} onPress={() => handleGenreSelect('Science Fiction')}>
                  <Text style={[styles.genreText, isSelected('Science Fiction') && styles.selectedGenreText]}>Science Fiction</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.genreRow}>
                <TouchableOpacity style={[styles.genreButton, { width: 140 },isSelected('Short story') && styles.selectedGenreButton,]} onPress={() => handleGenreSelect('Short story')}>
                  <Text style={[styles.genreText, isSelected('Short story') && styles.selectedGenreText]}>Short story</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.genreButton, { width: 110 },isSelected('Poetry') && styles.selectedGenreButton,]} onPress={() => handleGenreSelect('Poetry')}>
                  <Text style={[styles.genreText, isSelected('Poetry') && styles.selectedGenreText]}>Poetry</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleContinue}
            >
              <Text style={styles.loginText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      
  );
};

export default SignupScreen4;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: colors.white,
    fontSize: 30,
    fontWeight: 'bold',
    width: 265,
  },
  formContainer: {
    marginVertical: 30,
    alignItems: 'center',
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom:15
  },
  verifyText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    width: 265,
    // height:100
  },
  genreContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  genreRow: {
    flexDirection: 'row',
    marginVertical: 8,
    gap: 10,
  },
  genreButton: {
    height: 45,
    backgroundColor: colors.white,
    borderRadius: 25,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedGenreButton: {
    backgroundColor: colors.secondary,
  },
  genreText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  selectedGenreText: {
    color: colors.white,
  },
  loginButton: {
    backgroundColor: colors.secondary,
    width: 150,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
  },
  loginText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});
