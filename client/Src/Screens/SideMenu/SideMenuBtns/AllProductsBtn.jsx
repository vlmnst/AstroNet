import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import IconIonicons from 'react-native-vector-icons/Ionicons';

const AllProductsBtn = ({ text, onPress }) => {

    return(
        <TouchableOpacity
            style={ styles.container }
            onPress={onPress}
        >
            <IconIonicons style={ styles.icon } name="list" size={25} color="black"/>
            <Text style={ styles.text }>Products</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4A347F',
        // backgroundColor: 'white',
        marginTop: 10,
        padding:15,
        borderRadius: 10,
        alignItems:"center",
        width:'85%',
        height: 65,
        flexDirection:"row"
    },
    icon: {
        marginRight:16,
        marginLeft:6,
        color:'white'
    },
    text: {
        fontWeight:"bold",
        fontSize:20,
        color:'white'
    }
})

export default AllProductsBtn;