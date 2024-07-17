import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { apiCall } from '../../api'; // Adjust the path as necessary
import { useSavedImages } from '../../context/SavedImagesContext';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import Toast from 'react-native-toast-message';
import { Entypo, Octicons } from '@expo/vector-icons';

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
      <View className="h-screen justify-center items-center">
      <View className="h-full w-full py-2 bg-white opacity-90">
        <Image source={{ uri: item.largeImageURL }} className="w-full h-full rounded" resizeMode="cover" />
      </View>
      <View style={{ position: 'absolute', bottom: 200, left: 20 }}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>{item.tags}</Text>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <TouchableOpacity onPress={() => handleShareImage(item.largeImageURL)} style={styles.button}>
          {loadingshare ? <ActivityIndicator size="small" color="white" /> : <Entypo name='share' size={22} color='white' />}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDownloadImage(item.largeImageURL, item.id.toString())} style={styles.button}>
          {loadingdownload ? <ActivityIndicator size="small" color="white" /> : <Octicons name='download' size={24} color='white' />}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSaveImage(item)} style={styles.button}>
          <Text style={{ color: 'white', fontSize: 16 }}>Save</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
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
  button: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default Explore;
