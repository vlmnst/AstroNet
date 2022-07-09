import { View, TextInput, Image, StyleSheet } from "react-native";
import { getProductsByName } from '../../Redux/Slice';
import { useDispatch } from "react-redux";
import React, { useState } from "react";
const SearchBar = () => {

    const dispatch = useDispatch();
    const [nombre, setNombre] = useState('');
    function filterSearchBar(e){
        setNombre(e)
        dispatch(getProductsByName(nombre))        
    };
  
  return (
    <View style={styles.Container_}>
        <TextInput
        style={styles.textInput}
        onChangeText={(text)=>filterSearchBar(text)}
        value={nombre}/>
        <Image source={{ uri: "https://i.ibb.co/8XT7d9J/image.png" }}style={styles.image}/>
    </View>
  );
};

const styles = StyleSheet.create({
    textInput:{height:30, width:100, boderWidth: 1,borderRadius: 8, borderColor:"#A09E9E",backgroundColor:"#D0D0D0", marginBottom: 2},
    image: { marginBottom: 2, height: 30,  width:30, borderRadius: 8, backgroundColor:"#48A346",borderColor:"#A09E9E" },
    Container_:{flexDirection: "row", marginBottom: 1,boderWidth: 1, borderColor:"#A09E9E"}
})

export default SearchBar;