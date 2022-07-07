import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, FlatList, StyleSheet, useWindowDimensions } from "react-native";
import { getAllProducts, getByPrice,getProductsByCategory } from '../../Redux/Slice';
import ProductCard from './ProductCard.jsx';


const Allproducts = () => {
    //----------dispatch-------------
    const dispatch = useDispatch();
    useEffect(() => { dispatch(getAllProducts()); }, [dispatch]);
    let Products = useSelector((state) => state.ALL_PRODUCTS.allProductsFiltered);
    let categories = useSelector((state) => state.ALL_PRODUCTS.categories);
    let Title = "AllProducts"

    //----------actions-------------
    function handleCategory(e) {
        e.preventDefault(e);
        Title = e.target.value;
        dispatch(getProductsByCategory(e.target.value));
    };
    function handlePrice(e) {
        e.preventDefault(e);
        dispatch(getByPrice(e.target.value));
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{Title}</Text>
            <View style={styles.selects}>
                <View style={styles.selects}>
                    {/* ------------Select category------------- */}
                    <Text >Filter by:  </Text>
                    <select
                        defaultValue={null}
                        name="Category"
                        id="Category"
                        onChange={(e) => handleCategory(e)}>
                            <option defaultValue={null} ></option>
                        {categories.length ? (
                            categories.map((c, index) => (
                                <option value={c} key={index}>
                                    {c}
                                </option>
                            )
                            )
                        ) : (null)}
                    </select>
                </View>
                <View style={styles.selects}>
                    {/* ------------order By Price------------- */}
                    <Text >Order by:  </Text>
                    <select
                        defaultValue={null}
                        name="Category"
                        id="Category"
                        onChange={(e) => handlePrice(e)}>
                        <option defaultValue={null} ></option>
                        <option value="higher">
                            higher price
                        </option>
                        <option value="lower">
                            lower price
                        </option>
                    </select>
                    {/* ------------Products List------------- */}
                </View>
            </View>
            <FlatList
                columnWrapperStyle={{ justifyContent: 'space-evenly' }}
                style={styles.flatList}
                numColumns={2}
                data={Products}
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
    container:{flex:1},
    selects: { flexDirection: "row", padding: 5, justifyContent: "space-evenly" },
    flatList: { marginTop: 10, padding: 5, width: useWindowDimensions, },
    title: { fontSize: 20, padding: 5, marginLeft: 10 ,}
})

export default Allproducts;