import { View, TextInput, StyleSheet, Image, TouchableOpacity } from "react-native";
import { getProductsByName } from '../../Redux/Slice';
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import img from '../../assets/logo/logoAstronet.png'
//, { navigation, route, setPage, setpaginateProducts }
const SearchBar = (props ) => {
  console.log(props)
  const  { navigation, route, setPage } = props
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState('');

  function filterSearchBar(e) {
    setNombre(e)
  };

  function search(e) {
    if (nombre === '') alert('Enter a name')
    else {
      route.name === 'Home' ?
      navigation.navigate('Allproducts', nombre) : setPage(1), dispatch(getProductsByName(nombre) );
      // navigation.navigate('Allproducts', nombre) : dispatch(getProductsByName(nombre));
    };
    setNombre("")
  }; 

  return (
    <View style={styles.Container_}>
      {/* <FeatherIcon style={styles.iconMenu} name="menu" size={36} onPress={() => navigation.openDrawer()}/> */}
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
    height: '40%',
    width: 230,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#A09E9E",
    backgroundColor: "white",
    // marginBottom: 2
  },
  Container_: {
    flexDirection: "row",
    justifyContent:"center",
    alignItems:"center",
    height:'75%',
    backgroundColor: '#4A347F',
    width: '100%',
    marginTop:'7%'
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
    // marginBottom: 3
  }
});

export default SearchBar;