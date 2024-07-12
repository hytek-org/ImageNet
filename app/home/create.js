import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const Create = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-white p-4" style={{ paddingTop: top }}>
      <View className="items-center mb-6">
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
      </View>
    </View>
  )
}

export default Create

