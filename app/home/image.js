import { View, Text, StyleSheet, Button, Platform, ActivityIndicator, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from 'expo-blur'
import { hp, wp } from '../../helpers/comman'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Image } from 'expo-image'
import { theme } from "../../constants/theme"
import { Entypo, Octicons } from '@expo/vector-icons'
import Animated, { FadeInDown } from 'react-native-reanimated'
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import Toast from 'react-native-toast-message';

const ImageScreen = () => {
    const router = useRouter();
    const item = useLocalSearchParams();
    const [status, setStatus] = useState('loading')
    let uri = item?.webformatURL;
    console.log('image:', item)

    // action for downloading
    const fileName = item?.previewURL?.split('/').pop();
    const imageUrl = uri;
    const filePath = `${FileSystem.documentDirectory}${fileName}`

    const getSize = () => {
        const aspectRatio = item?.imageWidth / item?.imageHeight;

        const maxWidth = Platform.OS == 'web' ? wp(50) : wp(92);
        let calculatedHeight = maxWidth / aspectRatio;
        let calculatedWidth = maxWidth;
        if (aspectRatio < 1) { //potrait imahge
            calculatedWidth = calculatedHeight * aspectRatio

        }
        return {
            width: calculatedWidth,
            height: calculatedHeight,
        }
    }

    const onLoad = () => {
        setStatus('');
    }
    // downloading action
    const handleDownloadImage = async () => {
        if (Platform.OS == 'web') {
            const anchor = document.createElement('a');
            anchor.href = imageUrl;
            anchor.target = "_blank";
            anchor.download = fileName || "download";
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
        } else {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission denied', 'You need to allow permission to save the image');
                return;
            }
            setStatus('downloading');
            let uri = await downloadFile();
            if (uri) {
                const asset = await MediaLibrary.createAssetAsync(uri);
                await MediaLibrary.createAlbumAsync('Download', asset, false);
                showToast('Image Downloaded');
            }
        }
    };
    // share image action
    const handleShareImage = async () => {
        if (Platform.OS == 'web') {
            showToast('link copied')
        } else {
            setStatus('sharing');
            let uri = await downloadFile();
            if (uri) {
                // sharing image
                await Sharing.shareAsync(uri);
            }
        }


    };

    const downloadFile = async () => {
        try {
            const { uri } = await FileSystem.downloadAsync(imageUrl, filePath);
            setStatus('');
            console.log('downloaded at:', uri);
            return uri;
        } catch (err) {
            console.log('got error:', err.message);
            setStatus('');
            Alert.alert('Image:', err.message);
            return null;
        }

    };
    const showToast = (message) => {
        Toast.show({
            type: 'success',
            text1: message,
            position: 'bottom'
        })
    };
    const toastConfig = {
        success: ({ text1, props, ...rest }) => {
            return (
                <View style={styles.toast}>
                    <Text style={styles.toastText}>{text1}</Text>
                </View>
            )
        }
    }
    return (
        <BlurView
            style={styles.container}
            tint='dark'
            intensity={80}
        >

            <View style={getSize()}>
                <View style={styles.loading}>
                    {
                        status == "loading" && <ActivityIndicator size="large" color="white"></ActivityIndicator>
                    }
                </View>
                <Image
                    transition={100}
                    style={[styles.image, getSize()]}
                    source={uri}
                    onLoad={onLoad} />

            </View>
            {/* action buttons */}
            <View style={styles.buttons}>
                <Animated.View entering={FadeInDown.springify()} >
                    <Pressable style={styles.button} onPress={() => router.back()}>
                        <Octicons name='x' size={24} color='white' />
                    </Pressable>
                </Animated.View>
                {/* downloading button */}
                <Animated.View entering={FadeInDown.springify().delay(100)}>
                    {
                        status == "downloading" ? (
                            <View style={styles.button}>
                                <ActivityIndicator size="small" color="white"></ActivityIndicator>
                            </View>

                        ) : (
                            <Pressable style={styles.button} onPress={handleDownloadImage}>
                                <Octicons name='download' size={24} color='white' />
                            </Pressable>
                        )
                    }

                </Animated.View>
                {/* sharing button */}
                <Animated.View entering={FadeInDown.springify().delay(200)}>
                    {
                        status == "sharing" ? (
                            <View style={styles.button}>
                                <ActivityIndicator size="small" color="white"></ActivityIndicator>
                            </View>

                        ) : (
                            <Pressable style={styles.button} onPress={handleShareImage}>
                                <Entypo name='share' size={22} color='white' />
                            </Pressable>
                        )
                    }


                </Animated.View>

            </View>


            {/* <Button title='Back' onPress={() => router.back()} /> */}
            <Toast config={toastConfig} visibilityTime={2500} />
        </BlurView >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp(4),
        backgroundColor: 'rgba(0,0,0,0.5'
    },
    image: {
        borderRadius: theme.radius.lg,
        borderWidth: 2,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderColor: 'rgba(255,255,255,0.1)',
    },
    loading: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',

    },
    buttons: {
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 50,


    },
    button: {
        height: hp(6),
        width: wp(12),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: theme.radius.md,
        borderCurve: 'continuous',

    },
    toast: {
        padding: 15,
        paddingHorizontal: 30,
        borderRadius: theme.radius.xl,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    toastText: {
        fontSize: hp(2),
        fontWeight: theme.fontWeights.semibold,
        color: theme.colors.white,
    }

})
export default ImageScreen