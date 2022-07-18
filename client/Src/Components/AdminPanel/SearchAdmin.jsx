import { View, TextInput, StyleSheet } from "react-native";
import { getProductsByName, getAdminByName,searchUser } from '../../../Redux/Slice/index';
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/Ionicons';

const SearchAdmin = ({ navigation, route }) => {

    const dispatch = useDispatch();
    const [nombre, setNombre] = useState('');

    function filterSearchBar(e) {
        setNombre(e)
    };

    function search(e) {
        // console.log(route.name)
        route.name === 'AllUsers' ?(
            nombre === ''? alert('Enter a name')
            :
            dispatch(searchUser(nombre))
        )
        :(
            nombre === ''? alert('Enter a name')
            :
                dispatch(getAdminByName(nombre))
        )
        
    };

    return (
        <View style={styles.Container_}>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => filterSearchBar(text)}
                value={nombre}
                onSubmitEditing={e => (search(e.nativeEvent.text))}
            />
            <Icon style={styles.iconSearch} onPress={() => search()} name="search-outline" size={30} color="grey" />
        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        height: '100%',
        width: '65%',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#A09E9E",
        backgroundColor: "#D0D0D0"
    },
    Container_: {
        width: '100%',
        flexDirection: "row",
        boderWidth: 1,
        borderColor: "#A09E9E",
        justifyContent:"center"
    },
    iconSearch: {
        position:"absolute",
        right: '3%'
    }
});

export default SearchAdmin;