import { View, Text, StyleSheet, Pressable, } from 'react-native'
import React, { useMemo } from 'react'
import { BlurView } from 'expo-blur';
import { BottomSheetModal, BottomSheetView   } from '@gorhom/bottom-sheet';
import { Extrapolation, FadeInDown, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { capitalize, hp } from '../helpers/comman';
import { theme } from '../constants/theme';
import { data } from '../constants/data';
import { ColorFilter, CommanFilterRow, SectionView } from './filterViews';

const Filtermodal = ({
  modalRef,
  onClose,
  onApply,
  onReset,
  filters,
  setFilters
}) => {

  const snapPoints = useMemo(() => ['70%'], []);
  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={CustomBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.filterText}>Filters</Text>
          {
            Object.keys(sections).map((sectionName, index) => {
              let sectionView = sections[sectionName];
              let title = capitalize(sectionName);
              let sectionData = data.Filters[sectionName];
              return (

                < Animated.View entering={FadeInDown.delay((index*100)+100).springify().damping(10)}
                 key={sectionName}>
                  <SectionView
                    title={title}
                    content={sectionView({
                      data: sectionData,
                      filters,
                      setFilters,
                      filterName: sectionName


                    })}
                  />
                </Animated.View >
              )
            })
          }
          < Animated.View entering={FadeInDown.delay(500).springify().damping(10)}
          style={styles.buttons}>
            <Pressable style={styles.resetButton} onPress={onReset}>
              <Text style={[styles.buttonText, { color: theme.colors.neutral(0.7) }]}>Reset</Text>

            </Pressable>
            <Pressable style={styles.applyButton} onPress={onApply}>
              <Text style={[styles.buttonText, { color: theme.colors.white }]}>Apply</Text>

            </Pressable>
          </Animated.View >

        </View>
      </BottomSheetView>
    </BottomSheetModal>
  )
}
const sections = {
  "order": (props) => <CommanFilterRow {...props} />,
  "orientation": (props) => <CommanFilterRow {...props} />,
  "type": (props) => <CommanFilterRow {...props} />,
  "color": (props) => <ColorFilter {...props} />
}


const CustomBackdrop = ({ animatedIndex, style }) => {

  const containerAnimatedStyle = useAnimatedStyle(() => {
    let opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    )
    return {
      opacity
    }
  })

  const containerStyle = [
    StyleSheet.absoluteFill,
    style,
    style.overlay,
    containerAnimatedStyle,
  ]
  return (
    <Animated.View style={containerStyle}>
      <BlurView style={StyleSheet.absoluteFill}
        tint='dark'
        intensity={30} />

    </Animated.View >
  )
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   padding: 24,
  //   justifyContent: 'center',
  //   backgroundColor: 'grey',
  // },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  content: {
    flex:1,
    // width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  filterText: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.8),
    marginBottom: 6
  },
  buttons: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  applyButton:{
    flex:1,
    backgroundColor:theme.colors.neutral(0.8),
    padding:12,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:theme.radius.md,
    borderCurve:'continuous',
  },
resetButton:{
  flex:1,
  backgroundColor:theme.colors.neutral(0.08),
  padding:12,
  alignItems:'center',
  justifyContent:'center',
  borderRadius:theme.radius.md,
  borderCurve:'continuous',
  borderWidth:2,
  borderColor:theme.colors.grayBG,
 },
 buttonText:{
  fontSize:hp(2.2),
 }
});


export default Filtermodal