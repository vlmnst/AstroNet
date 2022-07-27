import {
  Text,
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCredentials } from "../utils/handleCredentials";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initialCartUpdate, deleteCart, cartUpdate } from "../../Redux/Slice";



const CartLobbyCounter = (Props) => {
  const dispatch = useDispatch();
  var reducerCart = useSelector((state) => state.ALL_PRODUCTS.cart)
  var newArray = [...reducerCart]

  let { item } = Props;
  let { stock } = item;
  let [counter, setCounter] = useState(item.quantity);
  
  const upCount = async () => {
    try {
      if (stock > counter) {
        var finalCart = []; 
        setCounter(++counter);

        newArray.map((p) => {
          if (p.id === item.id) {
            let newProd = { 
              article:p.article,
              quantity: counter,
              price:p.price,
              offer:p.offer,
              detail:p.detail, 
              id:p.id,
              img:p.img,
              stock:p.stock
            }
            finalCart.push(newProd);
          } else {
            finalCart.push(p);
          };
        });

        dispatch(cartUpdate(finalCart))
        const jsonValue = JSON.stringify(finalCart);
        await AsyncStorage.setItem("storageCart", jsonValue);
      }
    } catch (error) {
      console.log(error);
    };

  };

  const downCount = async () => {
    // si solo qued un producto, se llama a borra todo. 

    try {
      if (counter > 0) {
        var finalCart = []; 
        setCounter(--counter);

        newArray.map((p) => {
          if (p.id === item.id) {
            let newProd = { 
              article:p.article,
              quantity: counter,
              price:p.price,
              offer:p.offer,
              detail:p.detail, 
              id:p.id,
              img:p.img,
              stock:p.stock
            }
            finalCart.push(newProd);
          } else {
            finalCart.push(p);
          };
        });

        dispatch(cartUpdate(finalCart))
        const jsonValue = JSON.stringify(finalCart);
        await AsyncStorage.setItem("storageCart", jsonValue);
      }
    } catch (error) {
      console.log(error);
    };
    // if (count === 1) {
    //   alert("la cantidad mínima es 1. Dale a 'Delete Item' si ya no desea el producto")
    // } else if (count < 1) {
    //   alert("no hay stock")
    // } else {
    //   setCounter(--counter)
    // }

  }

  return (

    <View style={styles.container}>
      <TouchableOpacity style={styles.interior} onPress={() =>upCount()}>
        <Text>+</Text>
      </TouchableOpacity>
      <Text style={styles.counter}>{item.quantity}</Text>
      <TouchableOpacity style={styles.interior} onPress={() => downCount()}>
        <Text>-</Text>
      </TouchableOpacity>
      <Text style={{width:'100%'}}>Stock: {stock}</Text>
    </View>
  )
};

const styles = StyleSheet.create({


  container: {
    height: '70%',
    width: '100%',
    // borderWidth: 2,
    // borderColor: "#111111",
    // display: "flex",
    justifyContent: "center",
    alignSelf:"center",
    marginTop:'25%'
  },
  interior: {
    height: '30%',
    width: '70%',
    borderWidth: 1,
    borderColor: "#111111",
    borderRadius:10,
    alignItems: "center",
    justifyContent:"center",
    alignSelf:"center"
  },
  counter: {
    height: '20%',
    width: '100%',
    // borderWidth: 2,
    // borderColor: "#111111",
    textAlign: "center"
  }
});

export default CartLobbyCounter;
