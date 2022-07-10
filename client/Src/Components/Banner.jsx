import React from 'react';
import { useSelector } from 'react-redux';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {
  View,
  Dimensions,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity
} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');


const Banner = ({navigation}) => {

  // traemos los productos con oferta
  let products = useSelector((state) => state.ALL_PRODUCTS.allProducts);

  products = products.filter(p => p.offer > 0).sort((a, b) => b.offer - a.offer);

  if (products.length > 5) { products = products.slice(0,5) }

  const renderItem = ({item}, parallaxProps) => {
    return (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Details", item)}>
          <ParallaxImage
            source={{uri: item.img }}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.4}
            {...parallaxProps}
          />

          <Text>{item.offer}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Carousel
        sliderWidth={screenWidth-40}
        sliderHeight={screenWidth- 60}
        itemWidth={screenWidth - 60}
        data={products}
        renderItem={renderItem}
        hasParallaxImages={true}
        // loop={true}
        // enableSnap={true}
      />
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: 89,
    backgroundColor: 'black',
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