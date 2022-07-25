import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { cartUpdate } from "../../Redux/Slice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DeleteCart = (props) => {
  const dispatch = useDispatch();
  const { item } = props;

  var reducerCart = useSelector((state) => state.ALL_PRODUCTS.cart)
  let finalCart = [];

  const deleteItem = async () => {
    try {
        reducerCart.map(p => p.id !== item.id ? finalCart.push(p) : null);

        dispatch(cartUpdate(finalCart))
        const jsonValue = JSON.stringify(finalCart);
        await AsyncStorage.setItem("storageCart", jsonValue);
      } catch (error) {
      console.log(error);
    };
  };

  return (
    <TouchableOpacity
      onPress={() => deleteItem()}
      style={styles.addCart}
    >
      <Text style={styles.addCartText}>Delete</Text>
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

export default DeleteCart;