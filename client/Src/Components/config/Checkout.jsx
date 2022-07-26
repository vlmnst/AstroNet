import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import config from './index.json'
import { WebView } from 'react-native-webview';

const Checkout = (props) => {
  let { cart } = props.route.params;

  const [url, setUrl] = useState(null)
  let newCart = [];
  cart.map((p) => {
    let item = { title: p.name, unit_price: p.price, quantity: 1 };
    newCart.push(item);
  });

  useEffect(() => {
    async function sendServer() {
      console.log("poraqui");
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
      console.log(json)
    }
    sendServer()
  }, []);

  return (
    <View style={styles.container}>
        { url && 
            <WebView
                style={styles.container}
                originWhitelist={['*']}
                // source={{ html: '<h1><center>Hello world</center></h1>' }}
                source={{ uri: url }}
            />
        }
       {/* <Text>Hola</Text> */}
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


