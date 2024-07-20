import { StatusBar, StyleSheet, Text, View, Pressable, BackHandler } from 'react-native'
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { hp, wp } from '../helpers/comman'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { theme } from '../constants/theme'
import { useRouter } from 'expo-router'
import { Image } from 'expo-image'
const Index = () => {
  const router = useRouter();

  useEffect(() => {
    const checkIfFirstTime = async () => {
      try {
        const hasSeenGetStarted = await AsyncStorage.getItem('hasSeenGetStarted');
        if (hasSeenGetStarted === 'true') {
          router.replace('home'); // Use replace to ensure the user cannot go back
        }
      } catch (error) {
        console.error('Failed to check AsyncStorage', error);
      }
    };

    checkIfFirstTime();

    // Handle back button press
    const backAction = () => {
      // Prevent going back to this screen
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', backAction);

    // Cleanup back button listener on unmount
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, [router]);

  const handleGetStarted = async () => {
    try {
      await AsyncStorage.setItem('hasSeenGetStarted', 'true');
      router.replace('home'); // Use replace to ensure the user cannot go back
    } catch (error) {
      console.error('Failed to set AsyncStorage', error);
    }
  };


  return (

    <View style={styles.container}>
      <StatusBar style='light' />

      {/* Background Image */}
      <Animated.View style={styles.imageDiv} entering={FadeInDown}>
        <Image
          source={require('../assets/images/getstart.jpg')}
          style={styles.bgImage}
          contentFit='cover'
        />
      </Animated.View>

      {/* Brand Name */}
      <Text style={styles.brandName}>ImageNet</Text>

      {/* Content */}
      <Animated.View className=" h-full flex flex-col justify-end text-left " entering={FadeInDown.duration(600)}>
        <Text style={styles.heading} >
          Welcome to ImageNet
        </Text>
        <Text style={styles.subheading} >
          Get Ready To Explore The Images
        </Text>
        <Pressable onPress={handleGetStarted} className="my-16 w-52 mx-auto py-4 px-2 rounded-full bg-transparent border-2 border-white ">
          <Text className="text-white text-center text-lg" >Get Started</Text>
        </Pressable>
      </Animated.View>

    </View>
  )
}

export default Index;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  imageDiv: {
    ...StyleSheet.absoluteFillObject,

  },
  bgImage: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  brandName: {
    position: 'absolute',
    top: 40,
    left: 20,
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },

  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
    textAlign:'center',
  },


});
