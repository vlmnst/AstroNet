import React from "react";
import { Text, View, Image, StyleSheet, Animated } from 'react-native';
// import Loading from '../../assets/Loader/Loader.gif'
import Loading from '../../assets/logo/logoAstronet.png'
const Loader = () => {
    return(
        <View style={styles.backg}>
            <Text>Soy el loader</Text>
            <Animated.Image style={styles.img} source={require('../../assets/Loader/Loader.gif')}/>
        </View>
    )
};

const styles = StyleSheet.create({
    backg: {
        backgroundColor: '#23001E'
    },
    img: {
        width: '100%',
        height: '100%',
        position: 'relative',
        resizeMode:"contain",
        
    }
})


export default Loader