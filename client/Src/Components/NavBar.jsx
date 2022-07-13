import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import SearchBar from './SearchBar';

import { getCredentials, logOut } from '../utils/handleCredentials';

const NavBar = ({ navigation, route }) => {
    const [userName, setUserName] = useState(null);

    useEffect(async() => {
        let credentials = await getCredentials();
        if (credentials) {
            setUserName(credentials.username)
        };
      }, []);

    const handleLogOut = () => {
        logOut();
        setUserName(null);
    };

    return (
        <View style={styles.container}>

            {/* USERNAME / GUEST */}
            { userName ? (
                <View>
                    <Text>Hi, {userName}</Text>
                    <Button title='LogOut' onPress={() => handleLogOut()}></Button>
                </View>
            ):(
                <Text>Guest</Text>
            )}
            
            {/* SEARCHBAR */}
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