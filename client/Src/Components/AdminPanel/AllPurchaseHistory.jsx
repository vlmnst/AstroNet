import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {View,Text,FlatList,StyleSheet,StatusBar,TouchableOpacity } from "react-native";
import {getPurchasedProductsAllUsers,FilterByStatus} from "../../../Redux/Slice/userSlice";
import AllPurchaseHistoryCard from './AllPurchaseHistoryCard';
import SearchAdmin2 from './SearchAdmin2';
import DropDownPicker from "react-native-dropdown-picker";
import IconIonicons from 'react-native-vector-icons/Ionicons';

const AllPurchaseHistory = ({ route, navigation }) => {
    // ---------- dispatch ----------
    const dispatch = useDispatch();
    // ---------- global states ----------
    let allpurchaseProducts_ = useSelector((state) => state.USER.allpurchaseProducts);
    // ---------- Local State -----------
    const [openitems, setOpenitems] = useState(false);
    const [valueitems, setValueitems] = useState("");
    let pickerItems = [{ label: "Processing", value: "Processing" },{ label: "Completed", value: "Completed" },{ label: "Delivered", value: "Delivered" }];
    // mount
    useEffect(() => {dispatch(getPurchasedProductsAllUsers())}, [dispatch]);
    // ---------- handlers ----------
    function handleReset(e) {
        dispatch(getPurchasedProductsAllUsers());
    }
    function handleOder(e) {
        dispatch(FilterByStatus(e.value));
    }
    
    return (
            <View style={styles.selectsContainer}>
                <View style={styles.SBcontainer}> 
                    <View style={styles.SB}>
                        <IconIonicons style={styles.iconMenu} name="chevron-back" size={36} onPress={() => navigation.goBack()}/>
                        <SearchAdmin2 navigation={navigation} route={route} />
                        <TouchableOpacity
                        style={styles.TouchableOpacity}
                        onPress={() => handleReset()}>
                            <View style={styles.button}>
                                <Text style={styles.text}>All Order</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
            </View>
                {/* ------------ PRODUCTS CARDS ------------ */}
                <Text>Filter by status: </Text>
                        <DropDownPicker
                          open={openitems}
                          value={valueitems}
                          items={pickerItems}
                          setOpen={setOpenitems}
                          setValue={setValueitems}
                          onSelectItem={(value) => handleOder(value)}
                        />
                <FlatList
                    numColumns={1}
                    data={allpurchaseProducts_}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                    <View style={styles.container}>
                            <AllPurchaseHistoryCard style={styles.selectsContainer} navigation={navigation} item={item} />
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

export default AllPurchaseHistory;

