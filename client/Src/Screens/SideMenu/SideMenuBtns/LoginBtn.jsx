import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import IconAntDesign from 'react-native-vector-icons/AntDesign';

const LoginBtn = ({ text, onPress }) => {

    return(
        <TouchableOpacity
            style={ styles.container }
            onPress={onPress}
        >
            <IconAntDesign style={ styles.icon } name="login" size={20} color="black"/>
            <Text style={ styles.text }>{text}</Text>
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

export default LoginBtn;