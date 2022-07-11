import React from 'react';
import { View, StyleSheet, Button, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchBar from './SearchBar';

const NavBar = ({ navigation, route }) => {

    return (
        <View style={styles.container}>
            {/* <Icon name="menu-outline" size={40} color="grey" style={styles.icon} /> */}
            <TouchableOpacity 
             style={styles.button}
            onPress={() => navigation.navigate("ProductCreate")} >
             <Text style={styles.text}>Create Product</Text>
            </TouchableOpacity>
            <SearchBar navigation={navigation} route={route} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#3E3E3E',
        justifyContent: 'space-between',
        width: '100%',
        height: 60,
        alignItems: 'center',
    },
    button: {
    alignItems: "center",
    backgroundColor: '#686868',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 15
    },
    text: {
        color: 'white'
    }
});

export default NavBar;