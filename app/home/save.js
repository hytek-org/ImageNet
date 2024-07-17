import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Save = () => {
  const { top } = useSafeAreaInsets();
  const [savedImages, setSavedImages] = useState([]);

  useEffect(() => {
    fetchSavedImages();
  }, []);

  const fetchSavedImages = async () => {
    try {
      const savedImages = JSON.parse(await AsyncStorage.getItem('savedImages')) || [];
      setSavedImages(savedImages);
    } catch (error) {
      Alert.alert('Error', 'Failed to load saved images.');
      console.error('Failed to load saved images:', error);
    }
  };

  const deleteImage = async (image) => {
    try {
      const updatedImages = savedImages.filter((img) => img.id !== image.id);
      await AsyncStorage.setItem('savedImages', JSON.stringify(updatedImages));
      setSavedImages(updatedImages);
      Alert.alert('Success', 'Image deleted successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete the image.');
      console.error('Failed to delete the image:', error);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-4" style={{ paddingTop: top }}>
      <View className="items-center mb-6">
        <Text className="text-3xl font-bold">Saved Images</Text>
      </View>

      <View className="space-y-4">
        {savedImages.map((image) => (
          <View key={image.id} className="p-4 bg-gray-100 rounded-lg shadow">
            <View className="flex-row items-center mb-4">
              <Image
                source={{ uri: image.largeImageURL }}
                className="w-20 h-20 rounded-lg"
              />
              <View className="ml-4 flex-1">
                <Text className="text-lg font-semibold">{image.tags}</Text>
              </View>
            </View>
            <View className="flex-row justify-between">
              <TouchableOpacity className="bg-blue-500 p-2 rounded-lg">
                <Text className="text-white text-base">View</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-green-500 p-2 rounded-lg">
                <Text className="text-white text-base">Share</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteImage(image)} className="bg-red-500 p-2 rounded-lg">
                <Text className="text-white text-base">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Save;
