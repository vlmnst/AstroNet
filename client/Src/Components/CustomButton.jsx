import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const CustomButton = ({ onPress, text, type='PRIMARY', bgColor, fgColor }) => {
    return(
        <Pressable 
        onPress={onPress} 
        style={[
            styles.conteiner, 
            styles[`conteiner_${type}`],
            bgColor ?  {backgroundColor: bgColor} : {}
            ]}>
            <Text 
            style={[
                styles.text, 
                styles[`text_${type}`],
                fgColor ? {color: fgColor} : {}
                ]}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
  conteiner: {
   width: '100%',
   padding: 15,
   marginVertical: 10,
   marginHorizontal: 10, 
   alignItems: 'center',
   borderRadius: 5,
  },
  conteiner_PRIMARY:{
    width: '80%',
    backgroundColor: '#ECF0F1',
  },
  conteiner_TERTIARY:{},
  text: {
    fontWeight: 'bold',
    color: 'white'
  },
  text_TERTIARY: {
    color: 'grey'
  }
})

export default CustomButton