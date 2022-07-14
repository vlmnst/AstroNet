import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {View,Text,FlatList,StyleSheet,StatusBar,TouchableOpacity } from "react-native";
import {getAllUsers,} from "../../../Redux/Slice/index";
import UserCard from './UserCard';
import SearchAdmin from './SearchAdmin';

const AllUsers = ({ route, navigation }) => {
    // ---------- dispatch ----------
    const dispatch = useDispatch();
    // ---------- global states ----------
    let users = useSelector((state) => state.ALL_PRODUCTS.AllUsers);
    // mount
    useEffect(() => {dispatch(getAllUsers())}, [dispatch]);
    // ---------- handlers ----------
    function handleReset(e) {
        dispatch(getAllUsers());
    }
    return (
            <View style={styles.selectsContainer}>
                <View style={styles.nav}>
                <TouchableOpacity
                onPress={() => handleReset()}>
                    <View style={styles.button}>
                        <Text style={styles.text}>All User</Text>
                    </View>
                </TouchableOpacity>
                <SearchAdmin navigation={navigation} route={route} />
                </View>
                {/* ------------ PRODUCTS CARDS ------------ */}
                <FlatList
                    style={styles.flatList}
                    numColumns={1}
                    data={users}
                    renderItem={({ item }) => (
                        <View style={styles.container}>
                            <UserCard style={styles.selectsContainer} navigation={navigation} item={item} />
                        </View>
                    )}
                />
            </View>

    );
};

const styles = StyleSheet.create({
    AndroidSafeArea: {
        paddingTop: StatusBar.currentHeight + 10,
    },
    container: {
        borderRadius:10,
        borderColor:"grey",
        borderWidth:2,
        margin: 10,
    },
    selectsContainer: {
        justifyContent: "space-around",
    },
    selects: {
        flexDirection: "column",
        margin: 10,
        width: "40%",
    },
    flatList: {
        marginTop: 0,
        padding: 0,
        width: "100%",
    },
    nav: {
        flexDirection: 'row',
        backgroundColor: '#3E3E3E',
        justifyContent: 'center',
        width: '100%',
        height: 60,
        alignItems: 'center',
    },
    button: {
        height: 40,
        backgroundColor: 'grey',
        width: 100,
        justifyContent:"center",
        alignItems:"center",
        borderRadius: 15
    },
    text: {
        color:'white',
        fontSize:15
    }
});

export default AllUsers;

