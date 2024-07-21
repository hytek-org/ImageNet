import { View, Text, Pressable, StyleSheet, Modal, Alert, ActivityIndicator, Platform } from 'react-native';
import React, { useState } from 'react';
import { Image } from 'expo-image';
import { getImageSize, wp, hp } from '../helpers/comman';
import { theme } from '../constants/theme';
import { Entypo, Octicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import Toast from 'react-native-toast-message';
import { BlurView } from 'expo-blur'

const ImageCard = ({ item, index, columns }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [status, setStatus] = useState('loading');

    const isLastRow = () => (index + 1) % columns === 0;

    const getImageHeight = () => {
        let { imageHeight: height, imageWidth: width } = item;
        return { height: getImageSize(height, width) };
    };

    const handlePress = () => {
        setModalVisible(true);
    };

    const getSize = () => {
        const aspectRatio = item?.imageWidth / item?.imageHeight;
        const maxWidth = Platform.OS == 'web' ? wp(50) : wp(92);
        let calculatedHeight = maxWidth / aspectRatio;
        let calculatedWidth = maxWidth;
        if (aspectRatio < 1) { // portrait image
            calculatedWidth = calculatedHeight * aspectRatio;
        }
        return {
            width: calculatedWidth,
            height: calculatedHeight,
        };
    };

    const onLoad = () => {
        setStatus('');
    };

    // Downloading action
    const handleDownloadImage = async () => {
        const fileName = item?.previewURL?.split('/').pop();
        const imageUrl = item.webformatURL;
        const filePath = `${FileSystem.documentDirectory}${fileName}`;

        if (Platform.OS === 'web') {
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

    // Share image action
    const handleShareImage = async () => {
        const fileName = item?.previewURL?.split('/').pop();
        const imageUrl = item.webformatURL;
        const filePath = `${FileSystem.documentDirectory}${fileName}`;

        if (Platform.OS === 'web') {
            showToast('Link copied');
        } else {
            setStatus('sharing');
            let uri = await downloadFile();
            if (uri) {
                await Sharing.shareAsync(uri);
            }
        }
    };

    const downloadFile = async () => {
        const fileName = item?.previewURL?.split('/').pop();
        const imageUrl = item.webformatURL;
        const filePath = `${FileSystem.documentDirectory}${fileName}`;

        try {
            const { uri } = await FileSystem.downloadAsync(imageUrl, filePath);
            setStatus('');
            console.log('Downloaded at:', uri);
            return uri;
        } catch (err) {
            console.log('Got error:', err.message);
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
        });
    };

    const toastConfig = {
        success: ({ text1, props, ...rest }) => {
            return (
                <View style={styles.toast}>
                    <Text style={styles.toastText}>{text1}</Text>
                </View>
            );
        }
    };

    return (
        <>
            <Pressable onPress={handlePress} style={[styles.imageWrapper, !isLastRow() && styles.spacing]}>
                <Image style={[styles.image, getImageHeight()]} source={{ uri: item?.webformatURL }} transition={1000} />
            </Pressable>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <BlurView style={styles.modalContainer} tint='dark' intensity={80}>
                    <View style={getSize()}>
                        <View style={styles.loading}>
                            {status == "loading" && <ActivityIndicator size="large" color="white" />}
                        </View>
                        <Image
                            transition={100}
                            style={[styles.imageModal, getSize()]}
                            source={{ uri: item.webformatURL }}
                            onLoad={onLoad}
                        />
                    </View>
                    {/* action buttons */}
                    <View style={styles.buttons}>
                        <Pressable style={styles.button} onPress={() => setModalVisible(!modalVisible)}>
                            <Octicons name='x' size={24} color='white' />
                        </Pressable>
                        {/* downloading button */}
                        <Pressable style={styles.button} onPress={handleDownloadImage}>
                            {status === "downloading" ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                <Octicons name='download' size={24} color='white' />
                            )}
                        </Pressable>
                        {/* sharing button */}
                        <Pressable style={styles.button} onPress={handleShareImage}>
                            {status === "sharing" ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                <Entypo name='share' size={22} color='white' />
                            )}
                        </Pressable>
                    </View>
                    <Toast config={toastConfig} visibilityTime={2500} />
                </BlurView>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    imageWrapper: {
        backgroundColor: theme.colors.grayBG,
        borderRadius: theme.radius.xl,
        borderCurve: 'continuous',
        overflow: 'hidden',
        marginBottom: wp(2),
    },
    spacing: {
        marginRight: wp(2),
    },
    imageModal: {
        width: '100%',
        height: 300,
        borderRadius:10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp(4),
        backgroundColor: 'rgba(0,0,0,0.5)',
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
    },
});

export default ImageCard;
