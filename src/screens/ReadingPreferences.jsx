import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect, use } from 'react';
import { colors } from '../utils/colors';
import Slider from '@react-native-community/slider';

import { auth } from '../firebaseConfig';
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const ReadingPreferences = () => {
  const [pageColor, setPageColor] = useState('default');
  const [fontSize, setFontSize] = useState(0.5);
  const [fontType, setFontType] = useState('serif');

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchPreferences = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        try {
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData['reading-preferences']) {
              const prefs = userData['reading-preferences'];
              setPageColor(prefs['page-color'] || 'default');
              setFontSize(prefs['font-size'] || 0.5);
              setFontType(prefs['font-type'] || 'serif');
            }
          }
        } catch (error) {
          Alert.alert('Error', 'Failed to load your reading preferences.');
        }
      }
      setLoading(false);
    };
    fetchPreferences();
  }, []);

  const handleSaveChanges = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'You must be logged in to save preferences.');
      return;
    }
    setIsSaving(true);
    const userDocRef = doc(db, 'users', user.uid);
    const newPreferences = {
      'reading-preferences': {
        pageColor: pageColor,
        fontSize: fontSize,
        fontType: fontType,
      },
    };

    try {
      await updateDoc(userDocRef, newPreferences);
      Alert.alert('Success', 'Your reading preferences have been saved.');
    } catch (error) {
      Alert.alert('Error', 'Failed to save your reading preferences.');
    } finally {
      setIsSaving(false);
    }
  };

  const getPreviewFontSize = () => {
    return 12 + fontSize * 12;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={colors.white} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reading Preferences</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.fieldText}>Page Color</Text>
      <View style={styles.colorContainer}>
        <View style={styles.colorRow}>
          <TouchableOpacity
            onPress={() => setPageColor('default')}
           
          >
            <Text
              style={[
                styles.colorBox,
                { color: colors.white },
                { backgroundColor: colors.primary },
                { borderColor: colors.white },
              ]}
            >
              Default
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPageColor('black')}
          >
            <Text
              style={[
                styles.colorBox,
                { color: colors.white },
                { backgroundColor: colors.black },
                { borderColor: colors.black },
              ]}
            >
              Black
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.colorRow}>
          <TouchableOpacity
            onPress={() => setPageColor('white')}
          >
            <Text
              style={[
                styles.colorBox,
                { color: colors.black },
                { backgroundColor: colors.white },
                { borderColor: colors.white },
              ]}
            >
              White
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPageColor('yellow')}
           
          >
            <Text
              style={[
                styles.colorBox,
                { color: colors.black },
                { backgroundColor: colors.yellow },
                { borderColor: colors.yellow },
              ]}
            >
              Yellow
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.fieldText}>Font Size</Text>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          step={0.25}
          value={fontSize}
          onValueChange={value => setFontSize(value)}
          minimumTrackTintColor={colors.white}
          maximumTrackTintColor={colors.white}
          thumbTintColor={colors.secondary}
        />
      </View>
      <Text style={styles.fieldText}>Font Type</Text>
      <View style={styles.fontTypesContainer}>
        <TouchableOpacity
          onPress={() => setFontType('serif')}
          style={[
            styles.fontTypeButton,
            fontType === 'serif' && styles.selectedItem,
          ]}
        >
          <Text style={[{ fontFamily: 'serif' }, styles.fieldText]}>Serif</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFontType('sans-serif')}
          style={[
            styles.fontTypeButton,
            fontType === 'sans-serif' && styles.selectedItem,
          ]}
        >
          <Text style={[{ fontFamily: 'sans-serif' }, styles.fieldText]}>
            Sans-Serif
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFontType('monospace')}
          style={[
            styles.fontTypeButton,
            fontType === 'monospace' && styles.selectedItem,
          ]}
        >
          <Text style={[{ fontFamily: 'monospace' }, styles.fieldText]}>
            Mono-Space
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFontType('cursive')}
          style={[
            styles.fontTypeButton,
            fontType === 'cursive' && styles.selectedItem,
          ]}
        >
          <Text style={[{ fontFamily: 'cursive' }, styles.fieldText]}>
            Cursive
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.previewContainer,
          {
            backgroundColor:
              pageColor === 'default'
                ? colors.primary
                : pageColor === 'yellow'
                ? colors.yellow
                : pageColor,
          },
        ]}
      >
        <Text
          style={[
            styles.previewText,
            {
              fontSize: getPreviewFontSize(),
              fontFamily: fontType,
              color:
                pageColor === 'white' || pageColor === 'yellow'
                  ? colors.black
                  : colors.white,
            },
          ]}
        >
          The quick brown fox jumps over the lazy dog.
        </Text>
      </View>
          <View style={{alignItems:'center'}}>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges} disabled={isSaving}>
                {isSaving ? <ActivityIndicator color={colors.white} /> : <Text style={styles.saveButtonText}>Save</Text>}
            </TouchableOpacity>
</View>
            </ScrollView>
    </View>
  );
};

export default ReadingPreferences;

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
    marginBottom: 40,
  },
  fieldText: {
    fontSize: 15,
    color: colors.white,
    fontWeight: 'bold',
    marginLeft: 50,
  },
  colorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  colorRow: {
    flexDirection: 'column',
  },
  colorBox: {
    width: 140,
    height: 70,
    borderWidth: 2,
    textAlign: 'center',
    paddingVertical: 20,
    marginHorizontal: 30,
    marginVertical: 20,
    fontSize: 15,
    fontWeight: 'bold',
  },
  sliderContainer: {
    marginVertical: 20,
    marginHorizontal: 30,
  },
  slider: {
    width: 350,
    height: 40,
  },
  previewContainer: {
    borderWidth: 2,
    borderColor: colors.white,
    marginHorizontal: 30,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginVertical: 20,
  },
  fontTypesContainer: {
    marginVertical: 20,
    gap: 10,
  },
  saveButton: {
        backgroundColor: colors.secondary,
        marginHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 50,
        width:150
    },
    saveButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
