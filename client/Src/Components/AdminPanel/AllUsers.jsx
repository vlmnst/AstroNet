import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {View,Text,FlatList,StyleSheet,StatusBar,TouchableOpacity } from "react-native";
import {getAllUsers,} from "../../../Redux/Slice/index";
import UserCard from './UserCard';
import SearchAdmin from './SearchAdmin';
import IconIonicons from 'react-native-vector-icons/Ionicons';

const AllUsers = ({ route, navigation }) => {
    // ---------- dispatch ----------
    const dispatch = useDispatch();
    // ---------- global states ----------
    let users = useSelector((state) => state.ALL_PRODUCTS.AllUsersFiltered);
    // mount
    useEffect(() => {dispatch(getAllUsers())}, [dispatch]);
    // ---------- handlers ----------
    function handleReset(e) {
        dispatch(getAllUsers());
    }
    return (
            <View style={styles.selectsContainer}>
                <View style={styles.SBcontainer}>
                    <View style={styles.SB}>
                        <IconIonicons style={styles.iconMenu} name="chevron-back" size={36} onPress={() => navigation.goBack()}/>
                        <SearchAdmin navigation={navigation} route={route} />
                        <TouchableOpacity
                            onPress={() => handleReset()}
                            style={styles.TouchableOpacity}
                        >
                            <View style={styles.button}>
                                <Text style={styles.text}>Reset</Text>
                            </View>
                        </TouchableOpacity>
                        {/* <Text style={{fontSize:24, color:'white', fontWeight:'bold'}}>Create a new product</Text> */}
                    </View>
                </View>
                {/* <View style={styles.nav}>
                <TouchableOpacity
                onPress={() => handleReset()}>
                    <View style={styles.button}>
                        <Text style={styles.text}>All User</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.SearchAdmin}>
                    <SearchAdmin navigation={navigation} route={route} />
                </View>
                </View> */}
                {/* <TouchableOpacity
                    onPress={() => handleReset()}
                    style={styles.TouchableOpacity}
                >
                    <View style={styles.button}>
                        <Text style={styles.text}>All Users</Text>
                    </View>
                </TouchableOpacity> */}
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
    SBcontainer: {
        height:'12%',
        backgroundColor:'#4A347F',
        width:'100%',
        // marginBottom:'5%'
    },
    SB: {
        flexDirection: "row",
        justifyContent:"center",
        alignItems:"center",
        height:'65%',
        backgroundColor: '#4A347F',
        // backgroundColor:'white',
        width: '100%',
        marginTop:'9%'
    },
    iconMenu: {
        color:'white',
        position:'absolute',
        left:'5%'
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
        height: '88%'
    },
    nav: {
        flexDirection: 'row',
        // backgroundColor: '#3E3E3E',
        justifyContent: 'center',
        width: '100%',
        height: 60,
        alignItems: 'center',
        marginVertical:20
    },
    SearchAdmin: {
        width:'65%'
    },
    TouchableOpacity: {
        alignItems:"center",
        justifyContent:"center",
        height:'60%',
        width:'12%',
        marginLeft:'3%',
        // backgroundColor:'black'
    },
    button: {
        // height: '100%',
        // backgroundColor: '#4A347F',
        width: '100%',
        justifyContent:"center",
        alignItems:"center",
        borderRadius: 15,
    },
    text: {
        color:'white',
        fontSize:15,
    }
});

export default AllUsers;

