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

          <Text style={styles.name}>{item.name.toUpperCase().charAt(0).concat(item.name.slice(1,26))}...</Text>
          <Text style={styles.offer}>{item.offer}% Off!</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Carousel
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth}
        data={products}
        renderItem={renderItem}
        hasParallaxImages={true}
        loop={true}
        enableSnap={true}
      />
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: 200,
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
  offer: {
    position: 'absolute',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
    marginLeft: 5,
    backgroundColor: 'green',
    borderRadius: 10,
    color: 'white',
    fontSize: 25,
  },
  name: {
    color: 'white',
    marginLeft: 5,
    marginBottom: 10,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: 20,
    textAlignVertical: 'center'
  }
});