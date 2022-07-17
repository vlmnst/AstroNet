import { Text, View, TextInput, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from 'react-redux';
import Icon from "react-native-vector-icons/Ionicons";
import { getCredentials } from '../utils/handleCredentials';
import Cart from '../Components/Cart';

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
                  
          <Image style={{width:width/3, height:width/3}} source={item.image}/>

          <View style={{backgroundColor:'transparent', flex:1, justifyContent:'space-between'}}>
            
            <View>
              <Text style={{fontSize:20, fontWeight:'bold'}}>
                {item.article}
              </Text>
              <Text>
                {item.description}
              </Text>
            </View>           

              <View style={{backgroundColor:'transparent', flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={{fontWeight:'bold', color:'#33c37d', fontSize:20}}>
                    {item.price}
                  </Text>
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

export default CartLobby;