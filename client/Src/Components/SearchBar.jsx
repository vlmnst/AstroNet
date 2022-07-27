import { View, TextInput, StyleSheet, Image, TouchableOpacity } from "react-native";
import { getProductsByName, setPageScrollinf, setpaginateProducts } from '../../Redux/Slice';
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import Icon from 'react-native-vector-icons/Ionicons';
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

  return (
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
    </View>
  );
};

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
  textInput: {
    height: 30,
    width: 230,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#A09E9E",
    backgroundColor: "white",
  },
  Container_: {
    flexDirection: "row",
    justifyContent:"center",
    alignItems:"center",
    height:75,
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
    marginRight: 12,
  }
});

export default SearchBar;