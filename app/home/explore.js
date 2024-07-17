import React, { useEffect, useState, useRef } from 'react';
import {StatusBar, View, Text, Image, FlatList, Dimensions, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { apiCall } from '../../api'; // Adjust the path as necessary
import { useSavedImages } from '../../context/SavedImagesContext';



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

  useEffect(() => {
    fetchImages({ page });
  }, [page]);

  const fetchImages = async (params) => {
    setLoading(true);
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
    setLoading(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSaveImage = (image) => {
    saveImage(image);
    Alert.alert('Success', 'Image saved successfully!');
  };

  const renderItem = ({ item }) => (
    <View className="h-screen justify-center items-center">
      <View className="h-full w-full py-2 bg-white opacity-90">
        <Image source={{ uri: item.largeImageURL }} className="w-full h-full rounded" resizeMode="cover" />
      </View>
      <View style={{ position: 'absolute', bottom: 200, left: 20 }}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>{item.tags}</Text>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, marginRight: 10 }}>
            <Text style={{ color: 'white', fontSize: 16 }}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: 'green', padding: 10, borderRadius: 5, marginRight: 10 }}>
            <Text style={{ color: 'white', fontSize: 16 }}>Download</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSaveImage(item)} style={{ backgroundColor: 'orange', padding: 10, borderRadius: 5 }}>
            <Text style={{ color: 'white', fontSize: 16 }}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
   <View>
     <StatusBar style='light' />
    <FlatList
      data={images}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading && <ActivityIndicator size="large" color="#101010" />}
    />
    </View>
  );
};

export default Explore;
