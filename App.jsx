import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import { colors } from './src/utils/colors';

import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import SignupScreen1 from './src/screens/SignupScreen1';
import SignupScreen2 from './src/screens/SignupScreen2';
import SignupScreen3 from './src/screens/SignupScreen3';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import SignupScreen4 from './src/screens/SignupScreen4';
import ResetVerificationScreen from './src/screens/ResetVerificationScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import ResetConfirmation from './src/screens/ResetConfirmation';
import NotificationsScreen from './src/screens/NotificationsScreen';
import AuthorScreen from './src/screens/AuthorScreen';
import LibraryScreen from './src/screens/LibraryScreen';
import SearchScreen from './src/screens/SearchScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';
import StoryDetailsScreen from './src/screens/StoryDetailsScreen';
import AboutScreen from './src/screens/AboutScreen';
import ReadingPreferences from './src/screens/ReadingPreferences';
import ProfileSettings from './src/screens/ProfileSettings';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';
import ReadScreen from './src/screens/ReadScreen';
import ViewChaptersScreen from './src/screens/ViewChaptersScreen'
import CommentsScreen from './src/screens/CommentsScreen';
import SearchResultsProfilesScreen from './src/screens/SearchResultsProfilesScreen';
import SearchResultsStoriesScreen from './src/screens/SearchResultsStoriesScreen';
import SearchResultsTagsScreen from './src/screens/SearchResultsTagsScreen';
import AllMyStoriesScreen from './src/screens/AllMyStoriesScreen';
import EditMyStoriesScreen from './src/screens/EditMyStoriesScreen';
import CreateStoryScreen from './src/screens/CreateStoryScreen';
import AddChapterScreen from './src/screens/AddChapterScreen';
import EditStoryDraftsScreen from './src/screens/EditStoryDraftsScreen';
import EditStoryPublishedScreen from './src/screens/EditStoryPublishedScreen';
import OverallAnalyticsScreen from './src/screens/OverallAnalyticsScreen';
import StoryAnalyticsScreen from './src/screens/StoryAnalyticsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={
        {
          statusBarHidden:true,
          headerStyle:{
            backgroundColor:colors.primary
          },
          headerTintColor:colors.white,
          headerShadowVisible:false,
          headerTitleStyle:{
            color:colors.primary
          }
        }
        }
      >
        <Stack.Screen 
          name={"splash"} 
          component={SplashScreen} 
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name={"login"} 
          component={LoginScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name={"home"} 
          component={HomeScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name={"signup1"} 
          component={SignupScreen1}
        />
        <Stack.Screen 
          name={"signup2"} 
          component={SignupScreen2}
        />
        <Stack.Screen 
          name={"signup3"} 
          component={SignupScreen3}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name={"signup4"} 
          component={SignupScreen4}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name={"forgot-password"} 
          component={ForgotPasswordScreen}
        />
        <Stack.Screen 
          name={"reset-verification"} 
          component={ResetVerificationScreen}
        />
        <Stack.Screen 
          name={"reset-password"} 
          component={ResetPasswordScreen}
        />
        <Stack.Screen 
          name={"reset-confirm"} 
          component={ResetConfirmation}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name={"search"} 
          component={SearchScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name={"library"} 
          component={LibraryScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name={"author"} 
          component={AuthorScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name={"notifications"} 
          component={NotificationsScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name={"user-profile"} 
          component={UserProfileScreen}
        />
        <Stack.Screen 
          name={"story-details"} 
          component={StoryDetailsScreen}
        />
        <Stack.Screen 
          name={"read"} 
          component={ReadScreen}
        />
        <Stack.Screen 
          name={"profile-settings"} 
          component={ProfileSettings}
        />
        <Stack.Screen 
          name={"reading-preferences"} 
          component={ReadingPreferences}
        />
        <Stack.Screen 
          name={"about"} 
          component={AboutScreen}
        />
        <Stack.Screen 
          name={"change-password"} 
          component={ChangePasswordScreen}
        />
        <Stack.Screen 
          name={"view-chapters"} 
          component={ViewChaptersScreen}
        />
        <Stack.Screen 
          name={"chapter-comments"} 
          component={CommentsScreen}
        />
        <Stack.Screen 
          name={"search-stories"} 
          component={SearchResultsStoriesScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name={"search-profiles"} 
          component={SearchResultsProfilesScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name={"search-tags"} 
          component={SearchResultsTagsScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name={"all-stories"} 
          component={AllMyStoriesScreen}
        />
        <Stack.Screen 
          name={"edit-stories"} 
          component={EditMyStoriesScreen}
        />
        <Stack.Screen 
          name={"create-stories"} 
          component={CreateStoryScreen}
        />
        <Stack.Screen 
          name={"add-chapter"} 
          component={AddChapterScreen}
        />
        <Stack.Screen 
          name={"edit-story-drafts"} 
          component={EditStoryDraftsScreen}
        />
        <Stack.Screen 
          name={"edit-story-published"} 
          component={EditStoryPublishedScreen}
        />
        <Stack.Screen 
          name={"overall-analytics"} 
          component={OverallAnalyticsScreen}
        />
        <Stack.Screen 
          name={"story-analytics"} 
          component={StoryAnalyticsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})