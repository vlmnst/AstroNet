import { View, TextInput, StyleSheet } from "react-native";
import { getProductsByName } from '../../Redux/Slice';
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState('');

  function filterSearchBar(e) {
    setNombre(e)
  };

  function search(e) {
    if (nombre === '') alert('Enter a name')
    else {
      route.name === 'Home' ?
      navigation.navigate('Allproducts', nombre) : dispatch(getProductsByName(nombre));
    };
    setNombre("")
  };

  return (
    <View style={styles.Container_}>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => filterSearchBar(text)}
        value={nombre}
        onSubmitEditing={e => (search(e.nativeEvent.text))}
      />

      <Icon style={styles.iconSearch} onPress={() => search()} name="search-outline" size={30} color="grey" />
      <Icon style={styles.iconCart} name="cart-outline" size={30} color="grey" onPress={() => navigation.navigate("Cart")}/>
      
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: 250,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#A09E9E",
    backgroundColor: "#D0D0D0",
    marginBottom: 2
  },
  Container_: {
    flexDirection: "row",
    justifyContent:"center",
    alignItems:"center"
  },
  iconSearch: {
    marginHorizontal: 10
  },
  iconCart: {
    marginLeft:5
  }
});

export default SearchBar;