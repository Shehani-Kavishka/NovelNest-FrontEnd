import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { colors } from '../utils/colors';
import BookEditBar from '../components/BookEditBar';

const AddChapterScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.titleText}>Part 1</Text>
        <TouchableOpacity>
          <Text style={styles.titleText}>Publish</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInputTitle}
            placeholder="Title your Story Chapter"
            placeholderTextColor={colors.white}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.textInput, { height: 80 }]}
            placeholder="Start Writing ..."
            placeholderTextColor={colors.white}
          />
        </View>
      </ScrollView>

      <BookEditBar/>
    </View>
  );
};

export default AddChapterScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  titleText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 40,
  },
  headingContainer: {
    flexDirection: 'row',
    gap: 150,
    marginBottom:50
  },
  passwordText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
    width: 280,
    marginBottom: 15,
  },
  inputContainer: {
    borderRadius: 10,
    paddingHorizontal: 15,
    width: 'auto',
    height: 'auto',
    marginBottom: 30,
  },
  textInput: {
    color: colors.white,
    fontSize: 15,
    fontWeight:'bold',
  },
  textInputTitle: {
    color: colors.white,
    fontSize: 20,
    textAlign:'center',
    fontWeight:'bold',
  },
});
