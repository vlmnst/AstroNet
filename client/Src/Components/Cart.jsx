import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
//import { Icon } from "react-native-vector-icons/Icon";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { cartCreate } from "../../Redux/Slice";
import AsyncStorage from "@react-native-async-storage/async-storage";

let cartEnStorage = [];

const updateLocalCart = async (value) => {
  // primero ver si hay algo en el LocalStorage y guardarlo en formato array
  try {
    const jsonStorageCart = await AsyncStorage.getItem("storageCart");
    let storageCart = JSON.parse(jsonStorageCart)
    if (storageCart) {
      cartEnStorage = storageCart
    }
  } catch (error) {
    console.log("error");
  }
  // ahora updatear el localstorage carrito con el nuevo item.
  cartEnStorage.push(value)
  try {
    const jsonValue = JSON.stringify(cartEnStorage);
    await AsyncStorage.setItem("storageCart", jsonValue);
  } catch (error) {
    console.log(error);
  }
};


const Cart = (props) => {
  const dispatch = useDispatch();
  const { navigation, item } = props;
  const [cart, setCart] = useState([]);

  const infoCart = useSelector((state) => state.ALL_PRODUCTS.cart);

  const onClickAddCart = (data) => {
    //console.log(data);
    const itemCart = {
      article: data.name,
      detail: data.detail,
      id: data.id,
      quantity: 1,
      price: data.price,
      img: data.img,
      offer: data.offer,
    };
   
    updateLocalCart(data)
    //setCart((item)=>item.concat(itemCart));
    //infoCart.concat(itemCart);
    //var arr = [itemCart]
    dispatch(cartCreate(itemCart));

  };

  return (
    <TouchableOpacity
      onPress={() => onClickAddCart(item)}
      style={styles.addCart}
    >
      <Text style={styles.addCartText}>Add cart</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addCart: {
    alignItems: "center",
    backgroundColor: "#33c37d",
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
  },
  addCartText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
});

export default Cart;

