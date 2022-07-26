
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
  Linking
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCredentials } from "../utils/handleCredentials";
import CartLobbyCounter from "./CartLobbyCounter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initialCartUpdate, deleteCart } from "../../Redux/Slice";
import FeatherIcon from 'react-native-vector-icons/Feather';
import axios from 'axios';
// import { ROUTE } from "@env";
import DeleteCart from "./DeleteCart";
import config from './config'
// const ROUTE = "http://localhost:3001";
const ROUTE = "http://192.168.253.163:3001";

var { width } = Dimensions.get("window");

const CartLobby = ({ navigation }) => {
  const infoCart = useSelector((state) => state.ALL_PRODUCTS.cart);
  const dispatch = useDispatch();
  const [userID, setUserID] = useState();

  useEffect(() => {
    const checkCreds = async () => {
      const credentials = await getCredentials();
      if (credentials) {
        setUserID(credentials.id)
      }
    };
    checkCreds();
  }, []);

// updatea por primera vez el reducer, con lo que exista en asyncStorage
  useEffect(() => {
    const getStorageCart = async () => {
      const jsonStorageCart = await AsyncStorage.getItem("storageCart");
      let storageCart = JSON.parse(jsonStorageCart);
      if (storageCart) {
        dispatch(initialCartUpdate(storageCart));
      }
    };
    try {
      getStorageCart();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const payload = {
    // id : userID,
    cart: infoCart
  }

  // const cartCheckout = async () => {

  //   try {
  //     let { data } = await axios.post(ROUTE + "/products/checkout", payload);

  //     // Checking if the link is supported for links with custom URL scheme
  //     const supported = await Linking.canOpenURL(data.init_point);

  //     if (supported) {
  //       // Opening the link with some app,
  //       const res = await Linking.openURL(data.init_point);
  //     } else {
  //       Alert.alert(`Don't know how to open this URL: ${data.init_point}`);
  //     };
  //   } catch (error) {
  //     console.log(error);
  //   };
  // };


  return (
    <View style={{ flex: 1, width: width, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.SBcontainer}>
        <View style={styles.SB}>
          <FeatherIcon style={styles.iconMenu} name="skip-back" size={36} onPress={() => navigation.goBack()} />
          <Text style={{ fontSize: 28, color: 'white', fontWeight: 'bold' }}>Cart</Text>
        </View>
      </View>

      <View style={{ backgroundColor: 'transparent', flex: 1 }}>
        <ScrollView style={styles.scrollView}>
          {
            infoCart?.map((item, index) => {    // ojo con el "?"
              return (
                <View key={index} style={styles.viewMap} >
                  <Image style={{ width: width / 3, height: width / 3 }} source={{ uri: item.img[0] }} />
                  <View style={{ backgroundColor: 'transparent', flex: 1, justifyContent: 'space-around' }}>
                    <View>
                      <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                        {item.article}
                      </Text>
                      <Text>
                        {`${item.detail.slice(0, 40)}...`}
                      </Text>
                    </View>
                    <View style={{ backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-between' }}>
                      {item.offer > 0 ? (
                        <Text style={styles.pricethrough}>$ {item.price}</Text>)
                        : <Text style={styles.price}>$ {item.price}</Text>}
                      {item.offer > 0 ? (
                        <Text style={styles.offer}>{item.offer}% off!</Text>
                      ) : null}
                      {item.offer > 0 ? (
                        <Text style={styles.pricenew}>$ {item.price - (item.price * (item.offer / 100))}</Text>
                      ) : null}
                    </View>
                  </View>
                  <View>
                  <DeleteCart item={item}/>
                    <CartLobbyCounter item={item} />
                  </View>
                </View>
              );
            })
          }
        </ScrollView>
        <View style={{ height: 20 }} />
        <TouchableOpacity
          onPress={() => navigation.navigate('Checkout', payload)}
          style={styles.cartBtn}
        >
          <Text style={styles.cartText}>
            CHECKOUT
          </Text>
        </TouchableOpacity>
        <View style={{ height: '1%' }} />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({


  SBcontainer: {
    height: '10%',
    backgroundColor: '#4A347F',
    width: '100%'
  },
  SB: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: '82%',
    backgroundColor: '#4A347F',
    width: '100%',
    marginTop: '4%'
  },
  iconMenu: {
    color: 'white',
    position: 'absolute',
    left: '5%'
  },
  scrollView: {

  },
  buybtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    // marginHorizontal:
  },
  viewMap: {
    width: width - 20,
    margin: 10,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    borderWidthBottom: 2,
    borderColor: '#cccccc',
    paddingBottom: 10
  },
  cartBtn: {
    backgroundColor: '#4A347F',
    width: width - 130,
    alignItems: 'center',
    justifyContent: 'center',
    // padding:10,
    height: '10%',
    borderRadius: 20,
  },
  cartText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center'
  },
  emptyCart: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white"
  }
});

export default CartLobby;
