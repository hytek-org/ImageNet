import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const images = [
  {
    id: 1,
    uri: 'https://via.placeholder.com/150',
    title: 'Sample Image 1',
  },
  {
    id: 2,
    uri: 'https://via.placeholder.com/150',
    title: 'Sample Image 2',
  },
  // Add more sample images here
];
const Save = () => {
  const { top } = useSafeAreaInsets();
  return (
    <ScrollView className="flex-1 bg-white p-4" style={{ paddingTop: top }}>
      <View className="items-center mb-6">
        <Text className="text-3xl font-bold">Saved Images</Text>
      </View>

      <View className="space-y-4">
        {images.map((image) => (
          <View key={image.id} className="p-4 bg-gray-100 rounded-lg shadow">
            <View className="flex-row items-center mb-4">
              <Image
                source={{ uri: image.uri }}
                className="w-20 h-20 rounded-lg"
              />
              <View className="ml-4 flex-1">
                <Text className="text-lg font-semibold">{image.title}</Text>
              </View>
            </View>
            <View className="flex-row justify-between">
              <TouchableOpacity className="bg-blue-500 p-2 rounded-lg">
                <Text className="text-white text-base">View</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-green-500 p-2 rounded-lg">
                <Text className="text-white text-base">Share</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-red-500 p-2 rounded-lg">
                <Text className="text-white text-base">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default Save

