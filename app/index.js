import { StatusBar, StyleSheet, Text, View, Image, Pressable, } from 'react-native'
import React from 'react'
import { hp, wp } from '../helpers/comman'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { theme } from '../constants/theme'
import { useRouter } from 'expo-router'
const index = () => {
  const router = useRouter();
  return (
    <View style={styles.container} >
      <StatusBar style='light' />
      <Animated.View style={styles.imageDiv} entering={FadeInDown}>
        <Image source={require('../assets/images/wellogo.png')}
          style={styles.bgImage}
          resizeMode='cover' />
      </Animated.View>

      {/*linear gradient  */}
      <Animated.View entering={FadeInDown.duration(600)}>
        {/* content */}
        <View style={styles.contentContainer}>
          {/* <Animated.Text style={styles.title}
            entering={FadeInDown.delay(400).springify()}
          >

          </Animated.Text> */}
          <Animated.Text style={styles.punchline } 
            entering={FadeInDown.delay(500).springify()}>
            Get Ready To Explore The Things
          </Animated.Text>
        </View>
        <Animated.View
          entering={FadeInDown.delay(600).springify()}>
          <Pressable onPress={() => router.push('home')} style={styles.startButton}>
            <Text style={styles.startText}>Explore Now</Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
     // Assuming you have a background color in your theme
  },
  imageDiv: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
    width: wp(100),
    height: hp(60),
    position: "absolute",
  },
  contentContainer: {
    
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.neutral(0.9), // Assuming you have a primary color in your theme
    marginBottom: 20,
  },
  punchline: {
   marginBottom:10,
    fontSize: hp(1.5),
    letterSpacing: 1,
   
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.text, // Assuming you have a text color in your theme
    textAlign: 'center',
  
  },
  startButton: {
    width:wp(70),
    marginBottom: 50,
    backgroundColor: theme.colors.neutral(0.9), // Assuming you have a primary color in your theme
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: theme.radius.xl,
    marginHorizontal:'auto'
  },
  startText: {
    textAlign: 'center',
    color: theme.colors.white,
    fontWeight: theme.fontWeights.medium,
    fontSize: hp(2.5),
    letterSpacing: 1,
  }

})