import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import IconAntDesign from 'react-native-vector-icons/AntDesign';

const HomeBtn = ({ text, onPress }) => {

    return(
        <TouchableOpacity
            style={ styles.container }
            onPress={onPress}
        >
            <IconAntDesign style={ styles.icon } name="home" size={20} color="black"/>
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
        justifyContent:"flex-start",
        width:'85%',
        height: 55,
        flexDirection:"row"
    },
    icon: {
        marginRight:16,
        marginLeft:6
    },
    text: {
        fontWeight:"bold",
        fontSize:15
    }
})

export default HomeBtn;