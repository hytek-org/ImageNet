import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Pressable, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { useSavedImages } from '../../context/SavedImagesContext';

const Save = () => {
  const { top } = useSafeAreaInsets();
  const { savedImages, deleteImage } = useSavedImages();

  const handleDeleteImage = (imageId) => {
    deleteImage(imageId);
    Alert.alert('Success', 'Image deleted successfully!');
  };





  return (
    <ScrollView className="flex-1 bg-white p-4" style={{ paddingTop: top }}>
      <View className="items-center mb-6">
        <Text className="text-3xl font-bold">Saved Images</Text>
      </View>

      <View className="space-y-4 mb-10">
      {savedImages.length === 0 ? (
       <View  className="p-4 bg-gray-100 rounded-lg shadow border border-black/10">
       <View className="flex-row items-center mb-4 ">
         <View className="border border-black/50 p-0.5 rounded-lg">
           <Image
            source={require('../../assets/images/icon.png')}
             className="w-20 h-32 rounded-lg"
           />
         </View>
         <View className="ml-4 flex-1">
        
           <Text className="text-lg font-semibold">No saved images available</Text>
          
         </View>
       </View>
     </View>
      ) : (
        savedImages.map((image) => (
          <View key={image.id} className="p-4 bg-gray-100 rounded-lg shadow border border-black/10">
            <View className="flex-row items-center mb-4 ">
              <View className="border border-black/50 p-0.5 rounded-lg">
                <Image
                  source={{ uri: image.largeImageURL }}
                  className="w-20 h-32 rounded-lg"
                />
              </View>
              <View className="ml-4 flex-1">
                <View className="flex-row justify-end space-x-4 mb-2">
                  <Pressable className="bg-white px-2 py-1.5 rounded-lg">
                    <MaterialIcons name='share' size={28} />
                  </Pressable>
                  <Pressable onPress={() => handleDeleteImage(image.id)} className="bg-white px-2 py-1.5 rounded-lg">
                    <MaterialIcons name='delete-outline' size={28} />
                  </Pressable>
                </View>
                <Text className="text-lg font-semibold">{image.tags}</Text>
                <View className="flex flex-row space-x-4 items-center justify-between">
                  <Text className="text-sm font-normal">Image by <Text className="underline italic">{image.user}</Text></Text>
                  <Image
                    source={{ uri: image.userImageURL }}
                    className="w-10 h-10 rounded-lg"
                  />
                </View>
              </View>
            </View>
          </View>
        ))
      )}
      </View>
    </ScrollView>
  );
};

export default Save;
