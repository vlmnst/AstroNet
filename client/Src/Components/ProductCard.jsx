import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Cart from "./Cart";
import WishListButton from "../Components/WishListButton";

const ProductCard = (props) => {
  const { navigation, item, route } = props;

  return (
   <View>
    <TouchableOpacity
      style={ item.stock === 0 ? styles.noStock : styles.container }
      onPress={() => navigation.navigate("Details", props)}
    >
      <WishListButton navigation={navigation} item={item} />
      <Image source={{ uri: item.img[0] }} style={styles.image} />
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
      <View style={styles.addcartbtn}>
            { (item.stock === 0) 
              ? ( <Text style={styles.addcarttxt}>Without stock</Text>)
              : ( <Cart navigation={route} item={item} /> )
            }
      </View>
    </TouchableOpacity>
          
   </View> 
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
    height: 280,
    borderColor: "#EAEAEA",
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
  },
  noStock: {
    alignItems: "center",
    margin: 5,
    padding: 0,
    borderWidth: 2,
    width: "93%",
    height: 280,
    borderColor: "#EAEAEA",
    backgroundColor: 'rgba(255, 0, 0, 0.5)', 
    borderRadius: 10,
  },
  addcartbtn: {
    height: 70,
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