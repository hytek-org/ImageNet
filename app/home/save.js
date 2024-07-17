import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Pressable, Alert,ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { useSavedImages } from '../../context/SavedImagesContext';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import Toast from 'react-native-toast-message';


const Save = () => {
  const { top } = useSafeAreaInsets();
  const { savedImages, deleteImage } = useSavedImages();
  const [loadingshare, setLoadingShare] = useState(false);
  const [loadingdownload, setLoadingDownload] = useState(false);

  // Function to handle image download
  const handleDownloadImage = async (imageUrl, fileName) => {
    try {
      setLoadingDownload(true);
      const fileExtension = imageUrl.split('.').pop(); // Extracting file extension from URL
      const fileUri = `${FileSystem.documentDirectory}${fileName}.${fileExtension}`;
      console.log(`Downloading image from ${imageUrl} to ${fileUri}`);

      const { uri } = await FileSystem.downloadAsync(imageUrl, fileUri);
      console.log('Image downloaded to:', uri);

      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Download', asset, false);
      showToast('Image Downloaded');
    } catch (error) {
      console.error('Error downloading image:', error);
      Alert.alert('Error', 'Failed to download image');
    } finally {
      setLoadingDownload(false);
    }
  };

  // Function to handle image share
  const handleShareImage = async (imageUrl) => {
    try {
      setLoadingShare(true);
      const fileUri = await FileSystem.downloadAsync(imageUrl, FileSystem.documentDirectory + 'share.jpg');
      if (fileUri) {
        await Sharing.shareAsync(fileUri.uri);
      }
    } catch (error) {
      console.error('Error sharing image:', error);
      Alert.alert('Error', 'Failed to share image');
    } finally {
      setLoadingShare(false);
    }
  };

  // Function to display toast messages
  const showToast = (message) => {
    Toast.show({
      type: 'success',
      text1: message,
      position: 'bottom'
    });
  };

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
          <View className="p-4 bg-gray-100 rounded-lg shadow border border-black/10">
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
                    <Pressable onPress={() => handleShareImage(image.largeImageURL)} className="bg-white px-2 py-1.5 rounded-lg" >
                      {loadingshare ? <ActivityIndicator size="small" color="black" /> : <MaterialIcons name='share' size={28}  />}
                    </Pressable>
                    <Pressable  onPress={() => handleDownloadImage(image.largeImageURL, image.id.toString())} className="bg-white px-2 py-1.5 rounded-lg">
                      {loadingdownload ? <ActivityIndicator size="small" color="black" /> : <MaterialIcons name='download' size={28}  />}
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
