import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

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
          <Text style={styles.price}>$ {item.price}</Text>
          {item.offer > 0 ? (
            <Text style={styles.offer}>{item.offer}% off!</Text>
          ) : null}
        </View>
        <Text style={styles.name}>{item.name} </Text>
      </View>
    </TouchableOpacity>
  );
};

const font = 10;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    margin: 5,
    padding: 0,
    borderWidth: 2,
    width: "100%",
    height: 250,
    borderColor: "#EAEAEA",
    backgroundColor: "white",
    borderRadius: 10,
  },
  priceOffer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  image: {
    margin: 15,
    height: 100,
    width: "100%",
    borderRadius: 10,
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
  // }
});

export default ProductCard;