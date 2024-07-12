import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const Profile = () => {
  const { top } = useSafeAreaInsets();
  return (
    <ScrollView className="flex-1 bg-white p-4" style={{ paddingTop: top }}>
    <View className="items-center mb-6">
      <Image 
        source={{ uri: 'https://via.placeholder.com/150' }}
        className="w-32 h-32 rounded-full"
      />
      <Text className="text-4xl font-bold mt-4">John Doe</Text>
      <Text className="text-lg text-gray-600 mt-2">Software Engineer</Text>
    </View>

    <View className="space-y-4">
      <View className="p-4 bg-gray-100 rounded-lg">
        <Text className="text-lg font-semibold mb-2">About Me</Text>
        <Text className="text-base text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
        </Text>
      </View>

      <View className="p-4 bg-gray-100 rounded-lg">
        <Text className="text-lg font-semibold mb-2">Contact Information</Text>
        <Text className="text-base text-gray-700">Email: john.doe@example.com</Text>
        <Text className="text-base text-gray-700">Phone: (123) 456-7890</Text>
      </View>

      <View className="p-4 bg-gray-100 rounded-lg">
        <Text className="text-lg font-semibold mb-2">Skills</Text>
        <Text className="text-base text-gray-700">- React Native</Text>
        <Text className="text-base text-gray-700">- JavaScript</Text>
        <Text className="text-base text-gray-700">- Tailwind CSS</Text>
      </View>
    </View>

    <TouchableOpacity className="mt-6 bg-blue-500 p-4 rounded-lg items-center">
      <Text className="text-white text-lg font-semibold">Edit Profile</Text>
    </TouchableOpacity>
  </ScrollView>
  )
}

export default Profile;

