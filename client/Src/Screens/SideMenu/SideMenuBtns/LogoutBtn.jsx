import React, {useState} from "react";
import { Text, TouchableOpacity, StyleSheet, Alert, View } from "react-native";
import { useDispatch } from "react-redux";
import { setLogOut } from "../../../../Redux/Slice/userSlice";
import { logOut } from '../../../utils/handleCredentials';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

const LogoutBtn = ({navigation, text, onPress }) => {

    const dispatch = useDispatch()
   

    const showConfirmDialog = () => {
        return Alert.alert(
          'Hi!',
          "Are your sure you want logout?",
          [
           
            {
              text: "Yes",
              onPress: () => {
                handleLogOut();
              },
            },
            {
                text: "Cancel",
                style: "cancel",
            },
          ]
        );
      };

    const handleLogOut = () => {
        logOut()
        dispatch(setLogOut())
        navigation.navigate("Home")
    }

    return(
        <TouchableOpacity
            style={ styles.container }
            onPress={() => showConfirmDialog()}
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
    },
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})

export default LogoutBtn;