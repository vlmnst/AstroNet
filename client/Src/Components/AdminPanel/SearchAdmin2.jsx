import { View, TextInput, StyleSheet } from "react-native";
import { searchOrder } from '../../../Redux/Slice/userSlice';
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/Ionicons';

const SearchAdmin2 = ({ navigation, route }) => {

    const dispatch = useDispatch();
    const [order, setOrder] = useState('');

    function filterSearchBar(e) {
        setOrder(e)
    };

    function search(e) {
        
            order === ''? alert('Enter a order')
            :
            dispatch(searchOrder(order))
        
    };

    return (
        <View style={styles.Container_}>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => filterSearchBar(text)}
                value={order}
                onSubmitEditing={e => (search(e.nativeEvent.text))}
            />
            <Icon style={styles.iconSearch} onPress={() => search()} name="search-outline" size={30} color="grey" />
        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        height: '100%',
        width: '70%',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#A09E9E",
        backgroundColor: "white"
    },
    Container_: {
        width: '60%',
        flexDirection: "row",
        boderWidth: 1,
        borderColor: "#A09E9E",
        justifyContent:"center",
        // backgroundColor: "white"
    },
    iconSearch: {
        position:"absolute",
        right: '0%'
    }
});

export default SearchAdmin2;