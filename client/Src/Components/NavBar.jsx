import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchBar from './SearchBar';

const NavBar = ({ navigation, route }) => {

    return (
        <View style={styles.container}>
            {/* <Icon name="menu-outline" size={40} color="grey" style={styles.icon} /> */}
            <Button style={styles.btn} title='Create Product' onPress={() => navigation.navigate("ProductCreate")} />
            <SearchBar navigation={navigation} route={route} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#3E3E3E',
        // backgroundColor: 'black',
        justifyContent: 'space-between',
        width: '100%',
        height: 60,
        alignItems: 'center'
    },
    btn : {
        backgroundColor: 'black',
    }
    // icon: {
    //     flexDirection: 'row',
    //     flex: 1,
    //     // width: '27%',
    //     marginLeft: 20,
        
    //     // color: '#3E3E3E'
    // },
});

export default NavBar;