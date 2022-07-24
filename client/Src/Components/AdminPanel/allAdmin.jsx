import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { resetAdminProducts, getByPrice, getProductsByCategory, getAllProducts } from "../../../Redux/Slice";
import ProductCardModify from "./ProductCardModify";
import DropDownPicker from "react-native-dropdown-picker";
import SearchAdmin from "./SearchAdmin";
import IconIonicons from 'react-native-vector-icons/Ionicons';

const AllAdmin = ({ route, navigation }) => {
    // ---------- dispatch ----------
    // si route.params existe en categories, busco por categoria
    const dispatch = useDispatch();
    // ---------- global states ----------
    let products = useSelector((state) => state.ALL_PRODUCTS.allProductsFiltered);
    console.log(products)
    let [categories /*setCategories*/] = useState(
        useSelector((state) => state.ALL_PRODUCTS.categories)
    );

    // ---------- pickerUtils ----------
    const [openitems, setOpenitems] = useState(false);
    const [valueitems, setValueitems] = useState(false);

    const [openprice, setOpenprice] = useState(false);
    const [valueprice, setValueprice] = useState(null);

    let pickerSort = [
        { label: "higher", value: "higher" },
        { label: "lower", value: "lower" },
    ];
    let pickerItems = [{label:"all Products", value:"all Products"}];
    categories.length
        ? categories.map((c, index) => pickerItems.push({ label: c, value: c }))
        : null;

    // ---------- handlers ----------

    function handleCategory(e) {
        e.value === "all Products"?
        dispatch(resetAdminProducts(e.value)):
        dispatch(getProductsByCategory(e.value));
    }

    function handlePrice(e) {
        dispatch(getByPrice(e.value));
    }

    return (

            <View style={styles.container}>
                {/* ------------ TITLE ------------ */}
                <View style={styles.SBcontainer}>
                    <View style={styles.SB}>
                        <IconIonicons style={styles.iconMenu} name="chevron-back" size={36} onPress={() => navigation.goBack()}/>
                        <SearchAdmin navigation={navigation} route={route} />
                        {/* <Text style={{fontSize:24, color:'white', fontWeight:'bold'}}>Create a new product</Text> */}
                    </View>
                </View>
                {/* <View style={styles.nav}>
                    <SearchAdmin navigation={navigation} route={route} />
                </View> */}
                {valueitems?
                    <Text style={styles.title}>{valueitems}</Text>
                :null}

                {/* ------------ FILTERS ------------ */}
                <View style={styles.selectsContainer}>
                    {/* ------------Select category------------- */}
                    <View style={styles.selects}>
                        <View>
                            <Text>Filter by: </Text>
                        </View>
                        <DropDownPicker
                            open={openitems}
                            value={valueitems}
                            items={pickerItems}
                            setOpen={setOpenitems}
                            setValue={setValueitems}
                            onSelectItem={(value) => handleCategory(value)}
                        />
                    </View>

                    {/* ------------order By Price------------- */}
                    <View style={styles.selects}>
                        <View>
                            <Text>Order by: </Text>
                        </View>
                        <DropDownPicker
                            open={openprice}
                            value={valueprice}
                            items={pickerSort}
                            setOpen={setOpenprice}
                            setValue={setValueprice}
                            onSelectItem={(value) => handlePrice(value)}
                        />
                    </View>
                </View>

                {/* ------------ PRODUCTS CARDS ------------ */}
                <FlatList
                    columnWrapperStyle={{ justifyContent: "space-evenly" }}
                    style={styles.flatList}
                    numColumns={2}
                    data={products}
                    renderItem={({ item }) => (
                        <View >
                            <ProductCardModify navigation={navigation} item={item} />
                        </View>
                    )}
                />
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    SBcontainer: {
        height:'12%',
        backgroundColor:'#4A347F',
        width:'100%',
        marginBottom:'5%'
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
        flexDirection: "row",
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
    title: {
        fontSize: 20,
        padding: 5,
        textAlign: "center",
    },
    nav: {
        flexDirection: 'row',
        // backgroundColor: '#3E3E3E',
        justifyContent: 'center',
        width: '75%',
        height: 20,
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20
    },
});

export default AllAdmin;
