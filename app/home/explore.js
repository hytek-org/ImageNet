import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, FlatList, Dimensions, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { apiCall } from '../../api'; // Adjust the path as necessary
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get('window');

const Explore = () => {
  const { top } = useSafeAreaInsets();
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
      setImages((prevImages) => [...prevImages, ...res.data.hits]);
    }
    setLoading(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const saveImage = async (image) => {
    try {
      const savedImages = JSON.parse(await AsyncStorage.getItem('savedImages')) || [];
      const updatedImages = [...savedImages, image];
      await AsyncStorage.setItem('savedImages', JSON.stringify(updatedImages));
      Alert.alert('Success', 'Image saved successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save the image.');
      console.error('Failed to save the image:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ height: height, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
      <Image source={{ uri: item.largeImageURL }} style={{ width: '100%', height: '80%', borderRadius: 15 }} resizeMode="cover" />
      <View style={{ position: 'absolute', bottom: 50, left: 20 }}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>{item.tags}</Text>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, marginRight: 10 }}>
            <Text style={{ color: 'white', fontSize: 16 }}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: 'green', padding: 10, borderRadius: 5, marginRight: 10 }}>
            <Text style={{ color: 'white', fontSize: 16 }}>Download</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => saveImage(item)} style={{ backgroundColor: 'orange', padding: 10, borderRadius: 5 }}>
            <Text style={{ color: 'white', fontSize: 16 }}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={images}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      style={{ paddingTop: top }}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading && <ActivityIndicator size="large" color="#0000ff" />}
    />
  );
};

export default Explore;
