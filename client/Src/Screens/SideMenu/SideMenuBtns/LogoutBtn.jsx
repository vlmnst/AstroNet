import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { setLogOut } from "../../../../Redux/Slice/userSlice";
import { logOut } from '../../../utils/handleCredentials';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

const LogoutBtn = ({navigation, text, onPress }) => {

    const dispatch = useDispatch()

    const handleLogOut = () => {
        logOut()
        dispatch(setLogOut())
        navigation.navigate("Home")
    }

    return(
        <TouchableOpacity
            style={ styles.container }
            onPress={() => handleLogOut()}
        >
            <IconAntDesign style={ styles.icon } name="login" size={20} color="black"/>
            <Text style={ styles.text }>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4A347F',
        marginTop: 40,
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
        marginLeft:6,
        color:'white'
    },
    text: {
        fontWeight:"bold",
        fontSize:15,
        color:'white'
    }
})

export default LogoutBtn;