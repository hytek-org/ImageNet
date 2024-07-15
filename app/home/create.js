import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { hp, wp } from '../../helpers/comman';
import { theme } from '../../constants/theme';
import { Image } from 'expo-image';
import Animated, { FadeInDown } from 'react-native-reanimated';
const Create = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      {/* <View className="items-center mb-6">
        <Text className="text-3xl font-bold">Create New Image</Text>
      </View>

      <View className="space-y-4">
        <View className="mb-4">
          <Text className="text-lg font-semibold mb-2">Image Title</Text>
          <TextInput 
            placeholder="Enter image title"
            className="border border-gray-300 p-2 rounded-lg"
          />
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold mb-2">Image URL</Text>
          <TextInput 
            placeholder="Enter image URL"
            className="border border-gray-300 p-2 rounded-lg"
          />
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold mb-2">Description</Text>
          <TextInput 
            placeholder="Enter image description"
            className="border border-gray-300 p-2 rounded-lg"
            multiline={true}
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity className="mt-6 bg-blue-500 p-4 rounded-lg items-center">
          <Text className="text-white text-lg font-semibold">Submit</Text>
        </TouchableOpacity>
      </View> */}
      <Animated.View entering={FadeInDown.springify().delay(300).damping()}>
      <Text style={styles.title}>The New Features Are </Text>
      <Image source={require('../../assets/images/coming.jpg')} style={styles.bgImage}/>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  
title:{
  paddingTop:'50%',
  paddingBottom:12,
  textAlign:'center',
  fontSize:hp(3),
  fontWeight: theme.fontWeights.semibold,
  
},
bgImage:{
  height:'60%',
  width:'100%',
}
})

export default Create

