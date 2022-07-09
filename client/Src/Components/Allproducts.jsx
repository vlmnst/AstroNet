import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getByPrice, getProductsByCategory, clearCache } from '../../Redux/Slice';
import ProductCard from './ProductCard.jsx';
import DropDownPicker from 'react-native-dropdown-picker';

import Paginate from "./Paginate";


const Allproducts = ({ route }) => {

    // ---------- dispatch ----------
    let category = route.params;
    const dispatch = useDispatch();

    // ---------- global states ----------
    let products = useSelector((state) => state.ALL_PRODUCTS.allProductsFiltered);
    let [categories, /*setCategories*/] = useState(useSelector((state) => state.ALL_PRODUCTS.categories));

    // ---------- pickerUtils ----------
    const [openitems, setOpenitems] = useState(false);
    const [valueitems, setValueitems] = useState(category);

    const [openprice, setOpenprice] = useState(false);
    const [valueprice, setValueprice] = useState(null);
    
    let pickerSort= [{label: "higher", value: "higher"},{label: "lower", value:"lower"}]
    let pickerItems = [];
    categories.length ? (
        categories.map((c, index) => (
            pickerItems.push({ label: c, value: c })
        ))) : null

    // mount
    useEffect(() => { 
        dispatch(getProductsByCategory(category));
        setPage(1);
    }, [dispatch]);

    // unmount
    useEffect(() => { 
        return () => dispatch(clearCache());
    }, [dispatch]);


    // ---------- paginate ----------
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;

    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    
    let paginateProducts;
    if (products.length > 0) {
        paginateProducts = products.slice(indexOfFirst, indexOfLast);
    };

    // ---------- handlers ----------
    function setPage(number) {
        setCurrentPage(number);
    };

    function handleCategory(e) {
        dispatch(getProductsByCategory(e.value));
    };

    function handlePrice(e) {
        dispatch(getByPrice(e.value));
    };


    return (
        <View style={styles.container}>

            {/* ------------ TITLE ------------ */}
            <Text style={styles.title}>{valueitems}</Text>

            {/* ------------ FILTERS ------------ */}
            <View style={styles.selectsContainer}>

                {/* ------------Select category------------- */}
                <View style={styles.selects}>
                    <View><Text >Filter by:  </Text></View>
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
                    <View><Text >Order by:  </Text></View>
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

            {/* ------------ PAGINATE ------------ */}
            <Paginate
                    products={products.length}
                    currentPage={currentPage}
                    setPage={setPage}
                    productsPerPage={productsPerPage}
            />

            {/* ------------ PRODUCTS CARDS ------------ */}
            <FlatList
                columnWrapperStyle={{ justifyContent: 'space-evenly' }}
                style={styles.flatList}
                numColumns={2}
                data={paginateProducts}
                renderItem={({ item }) => (
                    <View>
                        <ProductCard  {...item} />
                    </View>
                )}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%',
        alignItems:'center'
    },
    selectsContainer:{
        flexDirection: 'row',
        justifyContent: "space-around",
    },
    selects: {
        flexDirection: "column",
        margin:10,
        width: '40%'
    },
    flatList: { 
        marginTop: 0,
        padding: 0,
        width: '100%'
    },
    title: {
        fontSize: 20,
        padding: 5,
        textAlign: 'center'
    }
})

export default Allproducts;