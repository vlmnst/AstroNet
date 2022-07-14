import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const HomeBtn = ({ text, onPress }) => {

    return(
        <TouchableOpacity
            style={ styles.container }
            onPress={onPress}
        >
            <Text style={ styles.text }>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#d9d9d9',
        marginTop: 20,
        marginHorizontal: 15,
        padding:15,
        borderRadius: 10,
        justifyContent:"center",
        width:'80%',
        height: 55,
    },
    text: {
        fontWeight:"bold",
        fontSize:15
    }
})

export default HomeBtn;