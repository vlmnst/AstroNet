import {
  Text,
  View,
  TextInput,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TurboModuleRegistry,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCredentials } from "../utils/handleCredentials";
import CartLobbyCounter from "./CartLobbyCounter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initialCartUpdate, deleteCart } from "../../Redux/Slice";

var { width } = Dimensions.get("window");

const CartLobby = () => {
  const infoCart = useSelector((state) => state.ALL_PRODUCTS.cart);
  console.log(infoCart);
  const dispatch = useDispatch();
  //console.log(infoCart, '<-------CartLobby');
  const [userID, setUserID] = useState();
  const [cartLocalState, setCartLocalState] = useState([]);

  useEffect(() => {
    const checkCreds = async () => {
      const credentials = await getCredentials();
      if (credentials) {
        setUserID(credentials.id);
      }
    };
    checkCreds();
  }, []);

  useEffect(() => {
    const getStorageCart = async () => {
      const jsonStorageCart = await AsyncStorage.getItem("storageCart");
      let storageCart = JSON.parse(jsonStorageCart);
      if (storageCart) {
        console.log(storageCart);
        dispatch(initialCartUpdate(storageCart));
      }
    };
    try {
      getStorageCart();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const emptyCart = async () => {
    try {
      await AsyncStorage.removeItem("storageCart");
      dispatch(deleteCart());
      return true;
    } catch (error) {
      return false;
    }
  };

  const [dataCart, setDataCart] = useState(infoCart);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ height: 20 }} />
      <Text style={{ fontSize: 28, color: "gray", fontWeight: "bold" }}>
        Cart
      </Text>
      <View style={{ height: 10 }} />
      <View style={{ backgroundColor: "transparent", flex: 1 }}>
        <ScrollView>
          {infoCart.map((item, index) => {
            return (
              <View key={index} style={styles.container}>
                <Image style={styles.image} source={{ uri: item.img[0] }} />
                <View style={styles.item}>
                  <View>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      {item.article}
                    </Text>
                    <Text>{`${item.detail.slice(0, 40)}...`}</Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "transparent",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    {item.offer > 0 ? (
                      <Text style={styles.pricethrough}>$ {item.price}</Text>
                    ) : (
                      <Text style={styles.price}>$ {item.price}</Text>
                    )}
                    {item.offer > 0 ? (
                      <Text style={styles.offer}>{item.offer}% off!</Text>
                    ) : null}
                    {item.offer > 0 ? (
                      <Text style={styles.pricenew}>
                        $ {item.price - item.price * (item.offer / 100)}
                      </Text>
                    ) : null}
                  </View>
                </View>
                <View>
                  <Text>Hola Hola</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View style={{ height: 20 }} />
        <TouchableOpacity
          style={{
            backgroundColor: "#33c37d",
            width: width - 40,
            alignItems: "center",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
            CHECKOUT
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={emptyCart}
          style={{
            backgroundColor: "#aaaaaa",
            width: width - 40,
            alignItems: "center",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
            EMPTY CART
          </Text>
        </TouchableOpacity>

        <View style={{ height: 10 }} />
      </View>
    </View>
  );
};

const nameFont = 15;
const priceOfferFont = 15;
const fontDescription = 12;
const styles = StyleSheet.create({
  container: {
    width: width - 20,
    margin: 10,
    backgroundColor: "transparent",
    flexDirection: "row",
    borderWidthBottom: 2,
    borderColor: "#cccccc",
    paddingBottom: 10,
  },
  image: {
    width: width / 3,
    height: width / 3,
  },
  item: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#FFFFFF",
    marginTop: 0,
    marginHorizontal: 10,
    padding: 5,
    width: "100%",
  },
  inputmul: {
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    marginHorizontal: 10,
    padding: 5,
    height: 100,
    width: "100%",
  },
  title: { fontSize: 20, padding: 5, marginLeft: 10 },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  button: { height: 40, margin: 12, borderWidth: 1, padding: 10 },
  priceOffer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 5,
    fontSize: priceOfferFont,
    marginTop: 10,
  },
  contDetails: {
    display: "flex",
    alignItems: "center",
    padding: 10,
    width: "100%",
    borderColor: "#EAEAEA",
    backgroundColor: "white",
  },
  contInt: { marginTop: 5, width: "98%", backgroundColor: "#EAEAEA" },
  price: { fontSize: priceOfferFont },
  name: { fontSize: nameFont, marginHorizontal: 10, marginVertical: 10 },
  offer: { color: "red", fontSize: priceOfferFont },
  descriptionCont: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  description: {
    fontSize: fontDescription,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "#EAEAEA",
    marginHorizontal: 5,
    marginVertical: 5,
  },
  textInput: {
    height: 40,
    width: "90%",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#A09E9E",
    backgroundColor: "#D0D0D0",
    marginBottom: 2,
  },
  pricethrough: {
    fontSize: nameFont,
    textDecorationLine: "line-through",
  },
  pricenew: {
    color: "green",
    fontSize: nameFont,
  },
});

export default CartLobby;
