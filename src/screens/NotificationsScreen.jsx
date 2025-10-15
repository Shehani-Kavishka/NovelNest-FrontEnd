import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../utils/colors'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomNavBar from '../components/BottomNavBar';

import { auth, db } from '../firebaseConfig';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';

const NotificationsScreen = () => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    const notificationsRef = collection(db, 'users', user.uid, 'notifications');
    const q = query(notificationsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, snapshot => {
      const notificationsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotifications(notificationsData);
      setLoading(false);
    }, error => {
      console.error('Error fetching notifications:', error);
      Alert.alert('Error', 'Failed to load notifications');
      setLoading(false);
    });
    return () => unsubscribe();
  }, [isFocused]);

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp.seconds * 1000).toLocaleString();
  }

  const handleNotificationPress = async (notification) => {
    const user = auth.currentUser;
    if (user && !notification.read) {
      const notiRef = doc(db, 'users', user.uid, 'notifications', notification.id);
      await updateDoc(notiRef, { isRead: true });
    }

    if (notification.link){
      if(notification.link.type === 'chapter'){
        navigation.navigate('read', { chapterId: notification.link.id });
    }
    else if(notification.link.type === 'profile'){
      navigation.navigate('profile', { userId: notification.link.id });
    }
  }

  }
  return (
  <View style={styles.container}>
    
    
    <Text style={styles.heading}>Notifications</Text>
     {loading ? (
        <ActivityIndicator size="large" color={colors.white} style={{ flex: 1 }} />
      ) : notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
            <Text style={styles.notificationText}>You have no new notifications.</Text>
        </View>
      ) : (
      <ScrollView>
        <View style={styles.notificationsContainer}>

        {notifications.map((notif) => (
          <TouchableOpacity key={notif.id} style={[styles.notification, !notif.isRead && styles.unread]} onPress={()=> handleNotificationPress(notif)}>
                      {notif.senderProfilePicURL ? 
            <Image source={{uri: notif.senderProfilePicURL}} style={styles.profilepicture}/>
            : <View style={styles.profilepicturePlaceholder}/>
        }
        <View style={styles.notificationTextContainer}>
          <Text style={styles.notificationText}>{notif.message}</Text>
          <Text style={styles.notificationTimeStamp}>{formatDate(notif.createdAt)}</Text>
        </View>

        {notif.type === 'chapter' && notif.storyCoverImageUrl && (
          <Image source={{uri: notif.storyCoverImageUrl}} style={styles.bookcover}/>

        )}
          </TouchableOpacity>
      ))}
    </View>
</ScrollView>
)}

<BottomNavBar/>
</View>
  )
  }

  export default NotificationsScreen;

const styles = StyleSheet.create({
  container:
  {
    flex:1,
    backgroundColor:colors.primary,
  },
  heading:{
    fontSize:22,
    fontWeight:"bold",
    color:colors.white,
    marginLeft:50,
    marginVertical:50
},
notificationsContainer:{
  marginHorizontal:30,
  gap:30
},
profilepicture:{
  width:50,
  height:50,
},
profilepicturePlaceholder: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: 'rgba(255,255,255,0.2)'
  },
notificationTextContainer:{
  flexDirection:'column',
  gap:15,
  width:210,
},
notification:{
  flexDirection:'row',
  gap:20,
  alignItems:'center'
},
unread: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)', // Highlight unread notifications
  },
notificationText:{
  fontWeight:'bold',
  color:colors.white,
  fontSize:12
},
notificationTimeStamp:{
  color:colors.secondary,
  fontSize:11
},
bookcover:{
  height:70,
  width:60,
},
bottomNavBar:{
  height:50,
  backgroundColor:colors.secondary,
  bottom:0,
  left:0,
  right:0,
  position:'absolute',
  flexDirection:'row',
  justifyContent:'space-around',
  paddingVertical:10,
  alignItems:'center',
},
})