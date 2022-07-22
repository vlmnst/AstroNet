
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
// import CartLobbyCounter from "./CartLobbyCounter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initialCartUpdate, deleteCart } from "../../Redux/Slice";
import Icon from "react-native-vector-icons/Ionicons";
import Cart from '../Components/Cart';
import FeatherIcon from 'react-native-vector-icons/Feather';
import axios from 'axios';
//import { ROUTE } from "@env";
const ROUTE = "http://localhost:3001";


var { width } = Dimensions.get("window");

const CartLobby = ({navigation}) => {
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

 const payload = {
    id : userID,
    cart : infoCart
  }

  const [dataCart, setDataCart]= useState(infoCart)

  
  const cartCheckout = async () => {

    try{
      let {data} = await axios.post(ROUTE + "/products/checkout", payload);
      
      // Checking if the link is supported for links with custom URL scheme
      const supported = await Linking.canOpenURL(data.init_point);
  
      if (supported) {
        // Opening the link with some app,
        const res = await Linking.openURL(data.init_point);
        console.log(res);
      } else {
        Alert.alert(`Don't know how to open this URL: ${data.init_point}`);
      };
    }catch(error){
      console.log(error);
    };
  };


  const emptyCart = async () => {
    try {
      await AsyncStorage.removeItem("storageCart");
      dispatch(deleteCart());
      return true;
    } catch (error) {
      return false;
    }
  };

  // const [dataCart, setDataCart] = useState(infoCart);

  return (

    <View style={{flex:1, width: width, alignItems: 'center', justifyContent: 'center'}}>
      <View style={styles.SBcontainer}>
        <View style={styles.SB}>
          <FeatherIcon style={styles.iconMenu} name="skip-back" size={36} onPress={() => navigation.goBack()}/>
          <Text style={{fontSize:28, color:'white', fontWeight:'bold'}}>Cart</Text>
          {/* <Icon style={styles.iconCart} name="cart-outline" size={30}  onPress={() => navigation.navigate("Cart")}/> */}
        </View>
      </View>
      {/* <View style={{height:20}}/>
        <Text style={{fontSize:28, color:'gray', fontWeight:'bold'}}>Cart</Text>
      <View style={{height:10}}/> */}

      {/*<Text>{JSON.stringify(dataCart)}</Text>*/}

      <View style={{backgroundColor:'transparent', flex:1}}>
      <ScrollView style={styles.scrollView}>
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
            );
          {/* })} */}
        {/* </ScrollView> */}


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

            backgroundColor:'#4A347F',
            width:width-130,
            alignItems:'center',
            justifyContent:'center',
            // padding:10,
            height:'10%',
            borderRadius:20,
          }}
        >
          <Text style={{fontSize:24, fontWeight:'bold', color:'white', textAlign:'center',justifyContent:'center'}}>
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
        <View style={{height:'1%'}}/>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({

  
  SBcontainer: {
    height:'10%',
    backgroundColor:'#4A347F',
    width:'100%'
  },
  SB: {
    flexDirection: "row",
    justifyContent:"center",
    alignItems:"center",
    height:'82%',
    backgroundColor: '#4A347F',
    width: '100%',
    marginTop:'4%'
  },
  iconMenu: {
    color:'white',
    position:'absolute',
    left:'5%'
  },
  scrollView:{

  },
  buybtn:{
    alignItems:'center',
    justifyContent:'center',
    marginTop: 5,
    // marginHorizontal:
  }
});

export default CartLobby;
