import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text, FlatList, Pressable, ActivityIndicator, Alert, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { apiCall } from '../../api'; // Adjust the path as necessary
import { useSavedImages } from '../../context/SavedImagesContext';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import Toast from 'react-native-toast-message';
import { AntDesign, Entypo, MaterialIcons, Octicons } from '@expo/vector-icons';
import { Image } from 'expo-image';

// Function to shuffle an array
const shuffleArray = (array) => {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};



const Explore = () => {
  const { top } = useSafeAreaInsets();
  const { saveImage } = useSavedImages();
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingshare, setLoadingShare] = useState(false);
  const [loadingdownload, setLoadingDownload] = useState(false);
  const [loadingsave, setLoadingSave] = useState(false);

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

  useEffect(() => {
    fetchImages({ page });
  }, [page]);

  // Function to fetch images
  const fetchImages = async (params) => {
    setLoading(true);
    try {
      const res = await apiCall(params);
      if (res.success && res.data.hits) {
        const shuffledImages = shuffleArray(res.data.hits);
        setImages((prevImages) => {
          // Filter out duplicates
          const uniqueNewImages = shuffledImages.filter(
            (newImage) => !prevImages.some((existingImage) => existingImage.id === newImage.id)
          );
          return [...prevImages, ...uniqueNewImages];
        });
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle load more images
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Function to handle saving image to context
  const handleSaveImage = (image) => {
    saveImage(image);
    Alert.alert('Success', 'Image saved successfully!');
  };

  // Function to render each image item
  const renderItem = ({ item }) => (
    <View className="h-screen justify-between items-center ">
      <View className="h-full w-full py-2 bg-white opacity-90">
        <Image source={{ uri: item.largeImageURL }} className="w-full h-full rounded " resizeMode="cover" />
        <View className="flex flex-row space-x-4 items-center justify-between">
          <Text className="text-sm font-normal">Image by <Text className="underline italic">{item.user}</Text>
          </Text>
          <Image
            source={{ uri: item.userImageURL }}
            className="w-10 h-10 rounded-lg"
          />
        </View>
      </View>
      <View className="absolute h-full bottom-8 flex flex-row justify-between w-full bg-black/20   pl-4 pr-4 ">
        
        <View className=" flex flex-col justify-end">
          <Text className="w-64 z-50"  style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>{item.tags}</Text>
          <View className="flex flex-row space-x-4 items-center justify-between">
            <Text className="text-sm font-normal text-white ">Image by <Text className="underline italic">{item.user}</Text></Text>
          </View>
        </View>
        <View  className="flex flex-col space-y-2 justify-end items-center">
          <Pressable onPress={() => handleShareImage(item.largeImageURL)} className="rounded-lg" style={styles.button}>
            {loadingshare ? <ActivityIndicator size="small" color="white" /> : <Entypo name='share' size={22} color='white' />}
          </Pressable>
          <Pressable className="rounded-lg px-3.5" onPress={() => handleDownloadImage(item.largeImageURL, item.id.toString())} style={styles.button}>
            {loadingdownload ? <ActivityIndicator size="small" color="white" /> : <Octicons name='download' size={24} color='white' />}
          </Pressable>
          <Pressable className="rounded-lg" onPress={() => handleSaveImage(item)} style={styles.button}>
            {loadingsave ? <ActivityIndicator size="small" color="white" /> : <MaterialIcons name='bookmark-outline' size={24} color='white' />}
          </Pressable>
          <Image
            source={{ uri: item.userImageURL }}
            className="w-10 h-10 rounded-full border border-white "
          />
        </View>
      </View>
    </View>
  );

  return (
    <View >
      <StatusBar style="light" />
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && <ActivityIndicator size="large" color="#101010" />}
      />
    </View>
  );
};

const styles = {
  buttonItems: {
    width: '100%',
    alignItems: 'flex-end'

  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default Explore;
