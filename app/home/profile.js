import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Octicons } from '@expo/vector-icons';
const Profile = () => {
  const { top } = useSafeAreaInsets();


  return (
    <ScrollView style={{ paddingTop: top, paddingHorizontal: 16, backgroundColor: '#fff' }}>
    <View style={styles.container}>
      <Text style={styles.title}>About ImageNet</Text>
      <Image source={require('../../assets/images/icon.png')} style={styles.image} />

      <Text style={styles.sectionTitle}>Welcome</Text>
      <Text style={styles.text}>
        Welcome to ImageNet, the ultimate solution for seamless image search and downloads on your Android device.
        Developed by Rahul Dev at HYTEK organization, ImageNet is designed to provide a user-friendly experience
        with powerful features to meet all your image management needs.
      </Text>

      <Text style={styles.sectionTitle}>Key Features</Text>
      <Text style={styles.text}>
        - <Text style={styles.boldText}>User-Friendly Interface:</Text> Navigate effortlessly with our intuitive design.
      </Text>
      <Text style={styles.text}>
        - <Text style={styles.boldText}>Advanced Filtering Options:</Text> Find exactly what you need with precise filters.
      </Text>
      <Text style={styles.text}>
        - <Text style={styles.boldText}>Fast Image Downloads:</Text> Enjoy quick and efficient image downloads to save time.
      </Text>
      <Text style={styles.text}>
        - <Text style={styles.boldText}>Built with React Native and Expo:</Text> Ensuring a smooth and reliable performance.
      </Text>

      <Text style={styles.sectionTitle}>Perfect for Professionals</Text>
      <Text style={styles.text}>
        ImageNet is perfect for photographers, designers, and anyone who needs efficient image management on the go.
        Download now and experience the convenience of ImageNet!
      </Text>

      <Text style={styles.sectionTitle}>What's New</Text>
      <Text style={styles.text}>
        - Initial release with advanced image search capabilities.
      </Text>
      <Text style={styles.text}>
        - Improved download speed for faster access to images.
      </Text>
      <Text style={styles.text}>
        - Optimized for all Android devices for a seamless user experience.
      </Text>

      <Text style={styles.sectionTitle}>The Story Behind ImageNet</Text>
      <Text style={styles.text}>
        ImageNet was born out of a need for a more efficient and user-friendly way to manage images on mobile devices.
        Rahul Dev, a developer at HYTEK organization, envisioned a tool that could provide powerful features without
        compromising on usability. Through countless hours of development and user testing, ImageNet was created to
        serve photographers, designers, and creative professionals worldwide. We hope you enjoy using ImageNet as much
        as we enjoyed building it.
      </Text>

      {/* Share and Rate Section */}
      <View className="border mb-10 " style={styles.shareContainer}>
        <Text style={styles.sectionTitle}>Enjoying ImageNet?</Text>
        <Text style={styles.text}>
          If you love using ImageNet, please take a moment to rate us on the Play Store or share our app with your friends and colleagues.
        </Text>
        <View style={styles.buttonContainer}>
          <Link href={'https://play.google.com/store/apps/details?id=com.hytek.imagenet'}  style={styles.button}>
            <Text style={styles.buttonText} className="flex flex-row space-x-2 justify-between"><Octicons name='star'  size={20}/> Rate Us</Text>
          </Link>
          <Link href={'https://play.google.com/store/apps/details?id=com.hytek.imagenet'} style={styles.button}>
            <Text style={styles.buttonText} className="flex flex-row space-x-2 justify-between"><Octicons name='share-android'  size={20}/> Share App</Text>
          </Link>
        </View>
      </View>
    </View>
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  shareContainer: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;

