import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchBar from './SearchBar';

const NavBar = ({ navigation, route }) => {
    return (
        <View style={styles.container}>
            <Icon name="menu-outline" size={40} color="grey" style={styles.icon} />
            <SearchBar navigation={navigation} route={route} />

            {/* <Icon name="heart-outline" size={25} color="grey" style={styles.icon} />
            <Icon name="cart-outline" size={25} color="grey"  style={styles.icon} /> 
             */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#3E3E3E',
        width: '100%',
        height: 60,
        alignItems: 'center'
    },
    icon: {
        flexDirection: 'row',
        flex: 1,
        marginLeft: 20,
    },
    iconsearch: {
        alignItems: 'flex-end',
        marginRight: 25
    },
})
export default NavBar