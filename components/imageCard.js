import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { getImageSize, wp } from '../helpers/comman'
import {theme} from '../constants/theme'

const ImageCard = ({ item, index,columns, router }) => {
  const islastRow= ()=>{
    return( index+1) % columns ===0;
  }
  const getImageHeight =()=>{
    let {imageHeight: height, imageWidth: width} =item;
    return {height : getImageSize(height,width)};
  }
  return (
    <Pressable onPress={() => router.push({pathname: 'home/image', params : {...item}})} style={[styles.imaegWrapper, !islastRow() && styles.spaciing]}>
      <Image style={[styles.image,getImageHeight()]}
        source={item?.webformatURL}

        transition={1000}
      />
    </Pressable>
  )
}
const styles = StyleSheet.create({
  imaegWrapper:{
    backgroundColor:theme.colors.grayBG,
    borderRadius:theme.radius.xl,
    borderCurve:'continuous',
    overflow:'hidden',
    marginBottom:wp(2),
  },
  spaciing:{
    marginRight:wp(2)
  },
  image:{
    height:300,
    width:`100`,
    
  }
})
export default ImageCard