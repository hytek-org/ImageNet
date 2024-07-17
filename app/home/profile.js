import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const Profile = () => {
  const { top } = useSafeAreaInsets();
  return (
    <ScrollView style={{ paddingTop: top, paddingHorizontal: 16, backgroundColor: '#fff' }}>
    <View style={styles.container}>
      <Text style={styles.title}>About ImageNet</Text>
      <Image source={require('../../assets/images/icon.png')} className="w-52 h-52 mx-auto" />

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
    </View>
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  boldText: {
    fontWeight: 'bold',
  },

});

export default Profile;

