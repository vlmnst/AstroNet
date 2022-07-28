import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import config from './index.json'
import { WebView } from 'react-native-webview';
import axios from 'axios';

import { deleteCart } from "../../../Redux/Slice/index";
import { useDispatch } from "react-redux";

// import { ROUTE } from "@env";
const ROUTE = 'https://proyectofinal-api-777.herokuapp.com'
// const ROUTE = "http://192.168.0.16:3001";

const Checkout = (props) => {
  const dispatch = useDispatch();
  let { cart, email, direction } = props.route.params;

  const [url, setUrl] = useState(null)
  const [flag, setFlag] = useState(null)

  let newCart = [];
  
  cart.map((p) => {
    let item = { title: p.article, unit_price: p.price - (p.price * (p.offer / 100)), quantity: p.quantity, description: p.id };
    newCart.push(item);
  });

  useEffect(() => {
    async function sendServer() {
      let response = await fetch(config.urlRoot + "/products/checkout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newCart,
        }),
      });
      let json = await response.json();
      setUrl(json)
      setFlag(false);
    }
    sendServer()
  }, []);

    async function stateChange(state){
      if (flag !== true) {
        let url = state.url
        console.log(url);
        if(state.canGoBack == true && !url.includes('mercadopago')){
            if(url.includes("approved")){
              setFlag(true);
                const payload = {
                  direction,
                  email,
                  cart: newCart,
                };
                await axios.post(ROUTE+"/products/buy", payload);
                dispatch(deleteCart());
                alert('purchase successfully, check your email')
                props.navigation.navigate('Home');
            }else{
                alert('error with the payment')
                props.navigation.navigate('Home')
            }
        }
      }
    }
  

  return (
    <View style={styles.container}>
        { url && 
            <WebView
                style={styles.container}
                originWhitelist={['*']}
                startInLoadingState={true}
                source={{ uri: url }}
                onNavigationStateChange={(state)=>stateChange(state)}
            />
        }
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        width: '100%',
        height: '100%'
    }
})
export default Checkout;


