import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { getProductsByName, setPageScrollinf, setpaginateProducts } from '../../Redux/Slice';
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import img from '../../assets/logo/logoAstronet.png'

const SearchBar = (props ) => {

  const  { navigation, route } = props
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState('');

  function filterSearchBar(e) {
    setNombre(e)
  };

  function search(e) {
    if (nombre === '') alert('Enter a name')
    else {
      route.name === 'Home' ?
      navigation.navigate('Allproducts', nombre) : dispatch(setPageScrollinf(1)), dispatch(setpaginateProducts([])), dispatch(getProductsByName(nombre) );
    };
    setNombre("")
  }; 

  return width_>410?(
    <View style={styles.Container_}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image style={styles.img} source={ img } />
      </TouchableOpacity>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => filterSearchBar(text)}
        value={nombre}
        onSubmitEditing={e => (search(e.nativeEvent.text))}
      />
      <Icon style={styles.iconSearch} onPress={() => search()} name="search-outline" size={30} />
      <Icon style={styles.iconCart} name="cart-outline" size={30}  onPress={() => navigation.navigate("Cart")}/>
      <Icon  style={styles.iconCart} name="heart-outline" size={30}  onPress={() => navigation.navigate("WishListLobby")}/>
    </View>
  ):(
    <View style={styles.Container_}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image style={styles.img2} source={ img } />
      </TouchableOpacity>
      <TextInput
        style={styles.textInput2}
        onChangeText={(text) => filterSearchBar(text)}
        value={nombre}
        onSubmitEditing={e => (search(e.nativeEvent.text))}
      />
      <Icon style={styles.iconSearch2} onPress={() => search()} name="search-outline" size={30} />
      <Icon style={styles.iconCart2} name="cart-outline" size={30}  onPress={() => navigation.navigate("Cart")}/>
      <Icon style={styles.iconCart2} name="heart-outline" size={30}  onPress={() => navigation.navigate("WishListLobby")}/>
    </View>
  )
};

const height_ = Dimensions.get("window").height;
const width_ = Dimensions.get("window").width;
const styles = StyleSheet.create({
  img: {
    height: 46,
    width: 46,
    alignSelf:"center",
    resizeMode:"contain",
    borderWidth:1,
    borderColor:'white',
    borderRadius: 17,
    marginRight:15
  },
  img2: {
    height: 28,
    width: 28,
    alignSelf:"center",
    resizeMode:"contain",
    borderWidth:1,
    borderColor:'white',
    borderRadius: 17,
    marginRight:10
  },
  textInput: {
    height: 30,
    width: 230,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#A09E9E",
    backgroundColor: "white",
  },
  textInput2: {
    height: 30,
    width: 115,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#A09E9E",
    backgroundColor: "white",
  },
  Container_: {
    flexDirection: "row",
    justifyContent:"center",
    alignItems:"center",
    height: `75%`,
    backgroundColor: '#4A347F',
    width: '100%',
    marginTop:25
  },
  iconSearch: {
    marginHorizontal: 10,
    color:'white'
  },
  iconCart: {
    marginLeft:5,
    color:'white'
  },
  iconMenu: {
    marginLeft:5,
    marginRight: 12,
    color:'white',
  },
  iconSearch2: {
    marginHorizontal: 10,
    color:'white'
  },
  iconCart2: {
    marginLeft:5,
    marginRight: 12,
    color:'white'
  },
});

export default SearchBar;