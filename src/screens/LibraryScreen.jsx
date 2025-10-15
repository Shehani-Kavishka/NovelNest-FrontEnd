import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-native-paper';
import { colors } from '../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomNavBar from '../components/BottomNavBar';
import { useNavigation , useIsFocused} from '@react-navigation/native';

import { auth, db } from '../firebaseConfig';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const LibraryScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  
  const CATEGORIES = ['All', 'Readings', 'Completed'];

  const [libraryItems, setLibraryItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) {
            setLoading(false);
            return;
        }

        const libraryRef = collection(db, 'users', user.uid, 'library');
        const q = query(libraryRef, orderBy('addedAt', 'desc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const items = querySnapshot.docs.map(doc => ({
                storyId: doc.id,
                ...doc.data()
            }));
            setLibraryItems(items);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching library:", error);
            Alert.alert("Error", "Could not load your library.");
            setLoading(false);
        });

        return () => unsubscribe();
    }, [isFocused]);

     useEffect(() => {
        if (activeCategory === 'All') {
            setFilteredItems(libraryItems);
        } else {
            const filtered = libraryItems.filter(item => item.readingStatus === activeCategory);
            setFilteredItems(filtered);
        }
    }, [activeCategory, libraryItems]);

     const handleRemoveFromLibrary = (storyId, storyTitle) => {
        Alert.alert(
            "Remove Story",
            `Are you sure you want to remove "${storyTitle}" from your library?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Remove",
                    style: "destructive",
                    onPress: async () => {
                        const user = auth.currentUser;
                        if (user) {
                            await deleteDoc(doc(db, 'users', user.uid, 'library', storyId));
                        }
                    }
                }
            ]
        );
    };


const renderCategory = ({ item }) => (
        <TouchableOpacity onPress={() => setActiveCategory(item)}>
            <Text style={[styles.tagItem, activeCategory === item && styles.activeTag]}>{item}</Text>
        </TouchableOpacity>
    );

if (loading) {
        return <View style={styles.container}><ActivityIndicator size="large" color={colors.white} /></View>
    }
    
  const clickMore = () => {
    return(
      <View style={styles.moreContainer}>
        <TouchableOpacity onPress={gotoStoryDetails}>
          <Text style={styles.subText}>Story Info</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.subText}>Remove from Library</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Library</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <FlatList
            data={CATEGORIES}
            renderItem={renderCategory}
            keyExtractor={item => item}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContentContainer}
          />
        </View>

        <View style={styles.countContainer}>
                <Text style={styles.fieldText}>{activeCategory} Stories</Text>
                <Text style={styles.fieldText}>{filteredItems.length} Stories</Text>
            </View>

     <FlatList
                data={filteredItems}
                keyExtractor={(item) => item.storyId}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <TouchableOpacity onPress={() => navigation.navigate('story-details', { storyId: item.storyId })}>
                            <Image source={{ uri: item.storyCoverImageUrl }} style={styles.bookCover} />
                        </TouchableOpacity>
                        <View style={styles.bookDetails}>
                            <Text style={styles.subText}>{item.storyTitle}</Text>
                            <Text style={styles.authorText}>{item.author}</Text>
                            {/* Note: Progress calculation is complex and would require more data */}
                        </View>
                        <TouchableOpacity onPress={() => handleRemoveFromLibrary(item.storyId, item.storyTitle)}>
                            <Icon name="trash" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>No stories in this category.</Text>}
            />

      </ScrollView>

      <BottomNavBar />
    </View>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: 20,
    marginVertical: 40,
  },

 
  list: {
    flexDirection: 'column',
    marginTop:30,
    marginBottom:100
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical:20
  },
  bookCover: {
    width: 70,
    height: 100,
  },
  tagItem: {
    color: colors.white,
    fontSize: 13,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 15,
    textAlign: 'center',
    verticalAlign: 'middle',
    marginHorizontal: 20,
  },
  
  fieldText: {
    fontSize: 15,
    color: colors.white,
    fontWeight: 'bold',
    marginInlineEnd: 110,
  },
  countContainer: {
    flexDirection: 'row',
    marginTop: 30,
    gap: 50,
    marginLeft: 20,
  },
  bookDetails: {
    flexDirection: 'column',
    gap:12,
    marginLeft:30,
    width:250
  },
   subText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.white,
  },
  authorText:{
    color:colors.white
  },
  progress: {
    backgroundColor: colors.white,
    width: 70,
    borderRadius: 10,
    height: 6,
  },
  partsText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.white,
  },
  moreButton:{
    marginTop:-75,
  },
  moreContainer:{
    width:200,
    borderWidth:1,
    borderColor:colors.secondary
  }
});
