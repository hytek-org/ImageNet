import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AntDesign, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { SavedImagesProvider } from '../context/SavedImagesContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import HomeScreen from './home/index';
import ImageScreen from './home/image';
import ExploreScreen from './home/explore';
import CreateScreen from './home/create';
import SaveScreen from './home/save';
import ProfileScreen from './home/profile';




const TabNavigator = () => (
  <Tab.Navigator  screenOptions={{
    tabBarActiveTintColor: '#101010',
    headerShown: false,
    
  }}>
    <Tab.Screen name="Home" component={HomeScreen} options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <AntDesign  size={28} name={focused ? 'home' : 'home'} color={color} />
          ),
          headerShown: false
        }} />
    <Tab.Screen name="Explore" component={ExploreScreen} options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5  size={28} name={focused ? 'wpexplorer' : 'wpexplorer'} color={color} />
          ),
          headerShown: false
        }}/>
    <Tab.Screen   name="Create" component={CreateScreen} options={{
          title: 'Create',
          tabBarIcon: ({ color, focused }) => (
            <AntDesign  size={28} name={focused ? 'pluscircle' : 'pluscircleo'} color={color} />
          ),
          headerShown: false
        }} />
    <Tab.Screen name="Saved" component={SaveScreen} options={{
          title: 'saved',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons  size={28} name={focused ? 'bookmark-outline' : 'bookmark-outline'} color={color} />
          ),
          headerShown: false
        }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{
          title: 'Share',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons  size={28} name={focused ? 'share' : 'share'} color={color} />
          ),
          headerShown: false
        }} />
  </Tab.Navigator>
);

const Layout = () => {
  return (
    <SavedImagesProvider>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" component={TabNavigator} />
          <Stack.Screen name="home/index" component={HomeScreen} />
          <Stack.Screen
            name="home/image"
            component={ImageScreen}
            options={{ 
              presentation: 'transparentModal',
              animationTypeForReplace: 'pop',
            }} 
          />
        </Stack.Navigator>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
    </SavedImagesProvider>
   
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
