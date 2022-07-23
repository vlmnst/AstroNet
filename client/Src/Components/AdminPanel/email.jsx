import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {sendEmail,pushToken} from '../../../Redux/Slice/userSlice'// import action email
import CustomButton from '../CustomButton'

const Email = () => {

    // let payload ={ //<---------------------- debe contener userMail = 
    //     userMail: "cristianrubiles@gmail.com",// email de usuario
    //     message : "prueba astronet te saluda"// mensaje a enviar 
    // }

    const dispatch = useDispatch();
    // const handleEmail = () => {
    //     dispatch(sendEmail(payload))// despacha al reducer payload 
    // }

    let tokenBox ={
        body :"new Astronet notification from backend"
    }
    const handlePush = () => {
        dispatch(pushToken(tokenBox))// despacha al reducer payload 
    }

    return(
        <View>
        <CustomButton
                onPress={() => handleEmail()}
                text='Send Email'
                fgColor='#17202A'
            />
        <CustomButton
                onPress={() => handlePush()}
                text='Send Push'
                fgColor='#17202A'
            />
        </View>
    )
}

export default Email;