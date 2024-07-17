import React, { useState, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, TextInput, } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import Animated, { FadeInDown, RotateInUpRight } from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';

const Create = () => {
  const { top } = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const buttonRef = useRef(null);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [subscribeMailList, setSubscribeMailList] = useState(false);
  const [developmentUpdates, setDevelopmentUpdates] = useState(false);
  const [productUpdates, setProductUpdates] = useState(false);


  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Animated.View style={styles.imageDiv} entering={FadeInDown}>
        <Image
          source={require('../../assets/images/coming.png')}
          style={styles.bgImage}
          resizeMode='cover'
        />
      </Animated.View>

      {/* Brand Name */}
      <Text style={styles.brandName}>ImageNet</Text>

      {/* Content */}
      <Animated.View className="mb-32" style={styles.content} entering={FadeInDown.springify().delay(300).damping()}>
      <Animated.Image entering={FadeInDown.springify().delay(300).damping()}
            source={require('../../assets/images/icon.png')}
             className="w-40 h-40 rounded-full bg-transparent opacity-90"
           />
        <Animated.Text ref={headingRef} style={styles.heading} entering={FadeInDown.springify().delay(300).damping()}>
          Coming Soon
        </Animated.Text>
        <Animated.Text ref={subheadingRef} style={styles.subheading} entering={FadeInDown.springify().delay(300).damping()}>
          New Feature in development!
        </Animated.Text>
        <Pressable ref={buttonRef} style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Get Notify</Text>
        </Pressable>
      </Animated.View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer} className="flex-1 justify-center items-center bg-transparent bg-opacity-50">
          <View className="bg-white  p-2 rounded-lg w-80 flex flex-col justify-between  bg-opacity-95 h-[500px]">
            <View className="flex flex-row justify-between  h-16">
              <Text style={styles.modalTitle}>Get Notified</Text>
              <Pressable className="mr-4" onPress={() => setModalVisible(false)} >
                <AntDesign size={28} name='closecircleo' />
              </Pressable>
            </View>
            <View className="flex flex-col  ">

              <View className="ml-4" style={styles.checkboxContainer}>
                <View className="flex flex-row space-x-2 mb-2">
                  <Checkbox className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" value={agreePrivacy} onValueChange={setAgreePrivacy} />
                  <Text className="text-sm text-gray-500 ms-3 dark:text-neutral-400">Agree to Privacy Policy</Text>
                </View>
                <View className="flex flex-row space-x-2 mb-2">
                  <Checkbox className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" value={agreeTerms} onValueChange={setAgreeTerms} />
                  <Text className="text-sm text-gray-500 ms-3 dark:text-neutral-400">Agree to Terms of Service</Text>
                </View>
                <View className="flex flex-row space-x-2 mb-2">
                  <Checkbox className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" value={subscribeMailList} onValueChange={setSubscribeMailList} />
                  <Text className="text-sm text-gray-500 ms-3 dark:text-neutral-400">Subscribe to Hytek Mail List</Text>
                </View>
                <View className="flex flex-row space-x-2 mb-2">

                  <Checkbox className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" value={developmentUpdates} onValueChange={setDevelopmentUpdates} />
                  <Text className="text-sm text-gray-500 ms-3 dark:text-neutral-400">Receive Development Updates</Text>
                </View>
                <View className="flex flex-row space-x-2 mb-2">
                  <Checkbox className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" value={productUpdates} onValueChange={setProductUpdates} />
                  <Text className="text-sm text-gray-500 ms-3 dark:text-neutral-400">Receive Product Updates</Text>
                </View>
              </View>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#999"
                  onChangeText={setEmail}
                  value={email}
                />
              </View>
            </View>
            <Pressable className=" w-52 mb-12 bg-transparent mx-auto py-4 px-2 rounded-full  border-2 border-black/40   " onPress={() => { setModalVisible(false); /* handle email submission */ }}>
              <Text className="text-black text-center text-lg">Submit</Text>
            </Pressable>
            {/* <Button title="Submit"  /> */}

          </View>
        </View>
      </Modal>
    </View>


  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  imageDiv: {
    ...StyleSheet.absoluteFillObject,
  },
  bgImage: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  brandName: {
    position: 'absolute',
    top: 40,
    left: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
  },
  button: {
    marginTop: 16,
    width: 200,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },

  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    margin: 'auto'
  },
  checkboxContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 20,
  },

});


export default Create

