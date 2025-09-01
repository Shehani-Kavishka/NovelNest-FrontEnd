import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { colors } from '../utils/colors';
import BookEditBar from '../components/BookEditBar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebaseConfig';
import {
  RichEditor,
  RichToolbar,
  actions,
} from 'react-native-pell-rich-editor';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddChapterScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { novelId } = route.params;

  const richText = useRef();

  const [title, setTitle] = useState('');
  const [contentHTML, setContentHTML] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);

  const handleSave = async status => {
    if (!title || !contentHTML) {
      Alert.alert(
        'Missing Content',
        'Please provide a title and content for your chapter.',
      );
      return;
    }

    setLoading(true);
    setMenuVisible(false);
    try {
      const addChapterFunc = httpsCallable(functions, 'story-addChapter');
      const result = await addChapterFunc({
        novelId: novelId,
        title: title,
        content: contentHTML,
        status: status,
      });

      Alert.alert('Success', result.data.message);
      // After saving, you might want to navigate back to the story details or a chapter list
      navigation.goBack();
    } catch (error) {
      console.error('Failed to save chapter:', error);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteChapter = () => {
    // Logic for deleting a chapter would go here.
    // This would involve another Cloud Function.
    Alert.alert('Delete', 'Delete functionality to be implemented.');
    setMenuVisible(false);
  };

  const handlePreviewChapter = () => {
    // Logic for previewing would go here.
    // This might navigate to a new screen passing the title and contentHTML.
    Alert.alert('Preview', 'Preview functionality to be implemented.');
    setMenuVisible(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.headingContainer}>
        <Text style={styles.titleText}>New Chapter</Text>
        {loading ? (
          <ActivityIndicator color={colors.white} style={{ marginRight: 20 }} />
        ) : (
          <TouchableOpacity
            style={styles.publishButton}
            onPress={() => handleSave('published')}
          >
            <Text style={styles.titleText}>Publish</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInputTitle}
            placeholder="Title your Story Chapter"
            placeholderTextColor={colors.white}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* <View style={styles.inputContainer}>
          <TextInput
            style={[styles.textInput, { height: 550 }]}
            placeholder="Start Writing ..."
            placeholderTextColor={colors.white}
            multiline={true}
            value={content}
            onChangeText={setContent}
          />
        </View> */}

        <RichEditor
          ref={richText}
          style={styles.richEditor}
          placeholder={'Start writing...'}
          onChange={descriptionText => {
            setContentHTML(descriptionText); // The editor outputs HTML
          }}
          editorStyle={{
            backgroundColor: colors.primary,
            color: 'white',
            placeholderColor: colors.white,
          }}
        />
      </ScrollView>

      <View style={styles.bottomBar}>

      <RichToolbar
        editor={richText} // Connect the toolbar to the editor
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.alignLeft,
          actions.alignCenter,
          actions.alignRight,
        ]}
        iconMap={{
          // Optional: Use FontAwesome icons
          [actions.setBold]: ({ tintColor }) => (
            <View style={styles.toolbarButton}>
            <Icon name="bold" size={25} color={colors.white} marginHorizontal={25} width={25}  />
            </View>
          ),
          [actions.setItalic]: ({ tintColor }) => (
             <View style={styles.toolbarButton}>
            <Icon name="italic" size={25} color={colors.white} marginHorizontal={50} width={25} />
            </View>
          ),
          [actions.setUnderline]: ({ tintColor }) => (
            <View style={styles.toolbarButton}>
            <Icon name="underline" size={25} color={colors.white} marginHorizontal={70} width={25} />
            </View>
          ),
          [actions.alignLeft]: ({ tintColor }) => (
            <View style={styles.toolbarButton}>
            <Icon name="align-left" size={25} color={colors.white} marginHorizontal={90} width={25} />
            </View>
          ),
          [actions.alignCenter]: ({ tintColor }) => (
            <View style={styles.toolbarButton}>
            <Icon name="align-center" size={25} color={colors.white}  marginHorizontal={110} width={25}/>
            </View>
          ),
          [actions.alignRight]: ({ tintColor }) => (
            <View style={styles.toolbarButton}>
            <Icon name="align-right" size={25} color={colors.white}  marginHorizontal={135} width={25} />
            </View>
          ),
          // Add other icons as needed
        }}
        style={styles.richToolbar}
         selectedIconTint={colors.primary}
        iconTint={colors.white}
      />
      <TouchableOpacity style={styles.moreButton} onPress={() => setMenuVisible(true)}>
        <Icon name="ellipsis-v" size={25} color="white" />
      </TouchableOpacity>
</View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={() => {
          setMenuVisible(false); // Allows closing with the Android back button
        }}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={() => setMenuVisible(false)}>
            <View style={styles.modalContent}>
                <TouchableOpacity style={styles.modalButton} onPress={() => handleSave('draft')}>
                    <Text style={styles.modalButtonText}>Save Chapter in Drafts</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={handlePreviewChapter}>
                    <Text style={styles.modalButtonText}>Preview Chapter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={handleDeleteChapter}>
                    <Text style={[styles.modalButtonText, styles.deleteText]}>Delete Chapter</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
      </Modal>
      
    </KeyboardAvoidingView>
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
    marginRight: -60,
  },
  headingContainer: {
    flexDirection: 'row',
    gap: 150,
    marginBottom: 50,
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
    fontWeight: 'bold',
    textAlignVertical: 'top',
  },
  textInputTitle: {
    color: colors.white,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
richEditor: {
    flex: 1,
    marginHorizontal: 10
  },
  richToolbar: {
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    // justifyContent:'center',
    // alignItems:'center',
    height: 50,
    width:375,
    alignSelf:'flex-start'
  },
  toolbarButton:{
    width:30,
  },
  moreButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: colors.secondary,
    borderRadius: 15,
    padding: 20,
    width: '80%',
    elevation: 5,
  },
  modalButton: {
    paddingVertical: 15,
  },
  modalButtonText: {
    color: colors.white,
    fontSize: 18,
    textAlign: 'center',
    fontWeight:'bold'
  },
  deleteText: {
    color: colors.red, // A reddish color for delete
    fontWeight: 'bold',
  },
  bottomBar:{
    backgroundColor:colors.secondary
  }

});
