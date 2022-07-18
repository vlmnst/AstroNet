import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Cart from "./Cart";

const ProductCard = (props) => {
  const { navigation, item } = props;

  // const goToDetails = () => {
  //   console.log(navigation);
  // };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Details", item)}
    >
      <Image source={{ uri: item.img }} style={styles.image} />
      <View style={styles.contInt}>
        <View style={styles.priceOffer}>
            {item.offer > 0 ? (
              <Text style={styles.pricethrough}>$ {item.price}</Text>)
              : <Text style={styles.price}>$ {item.price}</Text>}
              {item.offer > 0 ? (
                <Text style={styles.offer}>{item.offer}% off!</Text>
              ) : null}
               {item.offer > 0 ? (
                <Text style={styles.pricenew}>$ {item.price - (item.price * (item.offer/100))}</Text>
              ) : null}
        </View>
        <Text style={styles.name}>{item.name.slice(0,65)}... </Text>
      </View>
      {/* <Cart navigation={navigation} item={item}/> */}
    </TouchableOpacity>
  );
};

const font = 10;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    margin: 5,
    padding: 0,
    borderWidth: 2,
    width: "93%",
    height: 250,
    borderColor: "#EAEAEA",
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
  },
  priceOffer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  image: {
    margin: 10,
    height: 110,
    width: "100%",
    borderRadius: 10,
    resizeMode : 'contain',
  },
  contInt: {
    margin: 20,
    width: 130,
    altextAlign: "center",
  },
  price: {
    fontSize: font,
  },
  name: {
    margin: 5,
    fontSize: font,
  },
  offer: {
    color: "red",
    fontSize: font,
  },
  // description: {
  //   fontSize: fontDescription,
  //   padding:0,
  //   width:10,
  // },
  pricethrough: {
    fontSize: font,
    textDecorationLine:'line-through'
  },
  pricenew: {
    color: "green",
    fontSize: font,
  },
});

export default ProductCard;