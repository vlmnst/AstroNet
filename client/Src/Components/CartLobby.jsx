import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartLobbyCounter from "./CartLobbyCounter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initialCartUpdate } from "../../Redux/Slice";
import IconIonicons from 'react-native-vector-icons/Ionicons';
import DeleteCart from "./DeleteCart";

var { width } = Dimensions.get("window");

const CartLobby = ({ navigation }) => {
  const infoCart = useSelector((state) => state.ALL_PRODUCTS.cart);
  const email = useSelector((state) => state.USER.email);

  const dispatch = useDispatch();

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
    email: email,
    cart: infoCart
  }

  return (
    <View style={{ height:'100%' }}>
      <View style={styles.SBcontainer}>
        <View style={styles.SB}>
          <IconIonicons style={styles.iconMenu} name="chevron-back" size={36} onPress={() => navigation.goBack()} />
          <Text style={{ fontSize: 28, color: 'white', fontWeight: 'bold' }}>Cart</Text>
        </View>
      </View>

      <View style={{ height:'88%', backgroundColor: 'transparent' }}>
        <ScrollView style={styles.scrollView}>
          {
            infoCart?.map((item, index) => {    // ojo con el "?"
              return (
                <View key={index} style={styles.viewMap} >
                  <Image style={{ width: width / 3, height: width / 3 }} source={{ uri: item.img[0] }} />
                  <View style={{ backgroundColor: 'transparent', flex: 1, justifyContent: 'space-around' }}>
                    <View>
                      <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                        {item.article.slice(0, 40)}...
                      </Text>
                      <Text>
                        {`${item.detail.slice(0, 40)}...`}
                      </Text>
                    </View>
                    <View style={{ backgroundColor: 'transparent', justifyContent: 'space-between', marginLeft:15 }}>
                      <View style={{flexDirection:'row'}}>
                        {item.offer > 0 ? (
                          <Text style={styles.pricethrough}>$ {item.price}</Text>)
                          : <Text style={styles.price}>$ {item.price}</Text>}
                        {item.offer > 0 ? (
                          <Text style={styles.offer}>{item.offer}% off!</Text>
                        ) : null}
                      </View>
                      {item.offer > 0 ? (
                        <Text style={styles.pricenew}>total: $ {item.price - (item.price * (item.offer / 100))}</Text>
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
    // height: '100%',
    width: '100%',
  },
  buybtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    // marginHorizontal:
  },
  viewMap: {
    width: width - 20,
    height: 150,
    marginVertical: 20,
    marginHorizontal:12,
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
    alignSelf:"center"
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
  },
  offer: {
    color:'#B50000',
    marginLeft: 10
  },
  pricethrough: {
    textDecorationLine:"line-through"
  }
});

export default CartLobby;
