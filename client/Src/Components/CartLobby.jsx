import { Text, View, TextInput, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Linking } from 'react-native';
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from 'react-redux';
import Icon from "react-native-vector-icons/Ionicons";
import { getCredentials } from '../utils/handleCredentials';
import Cart from '../Components/Cart';
import axios from 'axios';
//import { ROUTE } from "@env";
const ROUTE = "http://localhost:3001";

var { width } = Dimensions.get("window")

const CartLobby = () => {

  
  const infoCart = useSelector((state)=>state.ALL_PRODUCTS.cart)
  //console.log(infoCart, '<-------CartLobby');
  const [userID, setUserID] = useState();
  

  useEffect(() => {
    const checkCreds = async () => {
        const credentials = await getCredentials();
        if (credentials) {
          setUserID(credentials.id);
        };
    };
    checkCreds()
  }, []);

 const payload = {
    id : userID,
    cart : infoCart
  }

  const [dataCart, setDataCart]= useState(infoCart)

  
  const cartCheckout = async () => {

    try{
      let {data} = await axios.post(ROUTE + "/products/checkout", payload);
      
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(data.init_point);
  
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(data.init_point);
      } else {
        Alert.alert(`Don't know how to open this URL: ${data.init_point}`);
      };
    }catch(error){
      console.log(error);
    };
  };

  //let [cant, setCant] = useState(1)
 

  // const onChangeQuat = (i, type) =>{
    
  //   if(type){
      
  //     //info[index].quantity = cant
  //     let dato = dataCart.map((e, index) => { index === i ?
  //                                             {...e, quantity : cant} : e
  //                                           })
  //     setDataCart(dato)
  //                console.log(dataCart, '<------datacart')
  //     setCant(cant + 1)
  //   }
  //   else {
  //     alert(negativo)
  //   }
    
  // }

  return (
    <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>

      <View style={{height:20}}/>

        <Text style={{fontSize:28, color:'gray', fontWeight:'bold'}}>Cart</Text>

      <View style={{height:10}}/>

      {/*<Text>{JSON.stringify(dataCart)}</Text>*/}

      <View style={{backgroundColor:'transparent', flex:1}}>
      <ScrollView>
        {
          infoCart.map((item, index)=>{
            return(
              <View key={index} style={{width:width-20, margin:10, backgroundColor:'transparent', flexDirection:'row', borderWidthBottom:2, borderColor:'#cccccc', paddingBottom:10}} >
                  
          <Image style={{width:width/3, height:width/3}} source={{uri : item.image}}/>

          <View style={{backgroundColor:'transparent', flex:1, justifyContent:'space-between'}}>
            
            <View>
              <Text style={{fontSize:20, fontWeight:'bold'}}>
                {item.article}
              </Text>
              <Text>
                {`${item.detail.slice(0,40)}...`}
              </Text>
            </View>           

              <View style={{backgroundColor:'transparent', flexDirection:'row', justifyContent:'space-between'}}>
                  {/* <Text style={{fontWeight:'bold', color:'#33c37d', fontSize:20}}>
                    {`$${item.price}`}
                  </Text> */}
                      {item.offer > 0 ? (
                      <Text style={styles.pricethrough}>$ {item.price}</Text>)
                      : <Text style={styles.price}>$ {item.price}</Text>}
                      {item.offer > 0 ? (
                        <Text style={styles.offer}>{item.offer}% off!</Text>
                      ) : null}
                       {item.offer > 0 ? (
                        <Text style={styles.pricenew}>$ {item.price - (item.price * (item.offer/100))}</Text>
                      ) : null}
                {/* <View style={{flexDirection:'row', alignItems:'center'}}>
                  <TouchableOpacity onPress={()=>onChangeQuat(index, false)}>
                    <Icon name='ios-remove-circle' size={30} color={'#33c37d'}/>
                  </TouchableOpacity>
                  <Text style={{fontWeight:'bold', paddingHorizontal:8}}>
                    {item.quantity}
                  </Text>
                  <TouchableOpacity onPress={()=>onChangeQuat(index, true)}>
                    <Icon name='ios-add-circle' size={30} color={'#33c37d'}/>
                  </TouchableOpacity>
                </View> */}
              </View>

          </View>
        </View>
            )
          })
        }
      </ScrollView>
        
        <View style={{height:20}}/>
        <TouchableOpacity 
          onPress={() => cartCheckout()}
          style={{
            backgroundColor:'#33c37d',
            width:width-40,
            alignItems:'center',
            padding:10,
            borderRadius:5
          }}
        >
          <Text style={{fontSize:24, fontWeight:'bold', color:'white'}}>
            CHECKOUT
          </Text>
        </TouchableOpacity>
        <View style={{height:10}}/>
      </View>
    </View>
  )


};

const nameFont = 15;
const priceOfferFont = 15;
const fontDescription = 12;
const styles = StyleSheet.create({
  
  container: { flex: 1, justifyContent: 'center', marginHorizontal: 16, backgroundColor: '#5E5E5E' },
  input: { backgroundColor: '#FFFFFF', marginTop: 0, marginHorizontal: 10, padding: 5, width: '100%' },
  inputmul: { backgroundColor: '#FFFFFF', marginTop: 10, marginHorizontal: 10, padding: 5, height: 100, width: '100%' },
  title: { fontSize: 20, padding: 5, marginLeft: 10 },
  separator: { marginVertical: 8, borderBottomColor: '#737373', borderBottomWidth: StyleSheet.hairlineWidth },
  button: { height: 40, margin: 12, borderWidth: 1, padding: 10 },
  priceOffer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 5,
      fontSize: priceOfferFont,
      marginTop: 10
  },
  image: {
      marginBottom: 2,
      marginTop: 5,
      height: 200,
      width: 250,
      borderRadius: 10,
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
  descriptionCont: { display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  description: { fontSize: fontDescription, padding: 5, backgroundColor: "white", borderRadius: 5, borderColor: "#EAEAEA", marginHorizontal: 5, marginVertical: 5 },
  textInput: { height: 40, width: "90%", borderWidth: 1, borderRadius: 8, borderColor: "#A09E9E", backgroundColor: "#D0D0D0", marginBottom: 2 },
  Container_: {  marginBottom: 1, boderWidth: 1, borderColor: "#A09E9E", marginHorizontal: 15 },
  pricethrough: {
      fontSize: nameFont,
      textDecorationLine:'line-through'
    },
    pricenew: {
      color: "green",
      fontSize: nameFont,
    },
});

export default CartLobby;