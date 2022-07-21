import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Button,
} from "react-native";

const OrderDetail = (props) => {
  const { navigation, route } = props;
  let { detail } = route.params;


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Purchase Order Details</Text>

      <FlatList
        // columnWrapperStyle={{ justifyContent: "space-evenly" }}
        numColumns={1}
        data={detail}
        renderItem={({ item }) => (
          <View style={styles.PODetail}>
            {console.log(item)}
            {/* <Text>{item.id}</Text> */}
            <Image source={{ uri: item.img }} style={styles.image} />
            <Text>{item.name}</Text>
            <Text>{`Offer: ${item.offer}%`}</Text>
            <Text>{`price: $${item.price}`}</Text>
            <Text>{`Quantity: $${item.quantity}`}</Text>
            <Text>{`review: ${item.review}`}</Text>
            {/* <View>
              <TouchableOpacity
                style={styles.Bottunn_}
                onPress={() => navigation.navigate("Detail", item)}
              >
                <Text>Product Details</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.Bottunn_}
                onPress={() => navigation.navigate()}
              >
                <Text>Review</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        )}
      />
      <Text style={styles.total}>{`Total: $${route.params.total}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // AndroidSafeArea: {
  //   // paddingTop: StatusBar.currentHeight + 10,
  // },
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  image: {
    margin: 10,
    height: 110,
    width: "100%",
    borderRadius: 10,
    resizeMode: "contain",
  },
  PODetail: {
    flex: 1,
    alignItems: "center",
    margin: 15,
    padding: 20,
    borderWidth: 2,
    width: "90%",
    height: 250,
    borderColor: "#EAEAEA",
    backgroundColor: "white",
    borderRadius: 10,
  },
  total: {
    flex: 1,
    alignItems: "center",
    margin: 15,
    padding: 20,
    borderWidth: 2,
    width: "90%",
    height: 250,
    borderColor: "#EAEAEA",
    backgroundColor: "white",
    borderRadius: 10,
  },
  boton: {
    backgroundColor: "#ccc",
    padding: 5,
    borderRadius: 12,
    width: 100,
    height: 30,
  },

  // selectsContainer: {
  //   flexDirection: "row",
  //   justifyContent: "space-around",
  // },
  // selects: {
  //   flexDirection: "column",
  //   margin: 10,
  //   width: "40%",
  // },
  // flatList: {
  //   marginTop: 0,
  //   padding: 0,
  //   width: "100%",
  // },
  title: {
    fontSize: 20,
    padding: 5,
    textAlign: "center",
  },
  Bottunn_: { backgroundColor: "#ccc", padding: 5, borderRadius: 12 },
});

export default OrderDetail;
