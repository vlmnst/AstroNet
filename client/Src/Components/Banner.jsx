
import React from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {
  View,
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';


const {width: screenWidth} = Dimensions.get('window');
let img1 = require('../../assets/img/1.png')
let img2 = require('../../assets/img/2.png')
let img3 = require('../../assets/img/3.png')
let img4 = require('../../assets/img/4.png')
let img5 = require('../../assets/img/5.png')
let img6 = require('../../assets/img/6.png')

const Banner = () => {

    let data = [
        img1, img2, img3, img4, img5, img6
    ]


  const renderItem = ({item}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={ item }
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
      </View>
    );
  };
  
  return (
    <View>
      <Carousel
        sliderWidth={screenWidth-40}
        sliderHeight={screenWidth- 60}
        itemWidth={screenWidth - 60}
        data={data}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  item: {
    width: 390,
    height: 89,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), 
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  image: {
    resizeMode : 'contain'
  },
});