import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getByPrice, getProductsByCategory, clearCache } from '../../Redux/Slice';
import ProductCard from './ProductCard.jsx';
import DropDownPicker from 'react-native-dropdown-picker';


const Allproducts = ({ route }) => {
    //----------dispatch-------------
    let item = route.params
    let Products = useSelector((state) => state.ALL_PRODUCTS.allProductsFiltered);
    let [categories, setCategories] = useState(useSelector((state) => state.ALL_PRODUCTS.categories));
    const dispatch = useDispatch();
    const [state, setState] = useState({
        title: "AllProducts",
    });
    useEffect(() => { dispatch(getProductsByCategory(item)); }, [dispatch]);
    useEffect(() => { return () => { dispatch(clearCache()) } }, [dispatch]);
    //----------prueba-------------
    const [openitems, setOpenitems] = useState(false);
    const [openprice, setOpenprice] = useState(false);
    const [valueitems, setValueitems] = useState(null);
    const [valueprice, setValueprice] = useState(null);
    let pickerSort= [{label: "higher", value: "higher"},{label: "lower", value:"lower"}]
    let pickerItems = [];
    categories.length ? (
        categories.map((c, index) => (
            pickerItems.push({ label: c, value: c })
        ))) : null
    //----------actions-------------
    function handleCategory(e) {
        setState({
            ...state,
            title: e.value
        })
        dispatch(getProductsByCategory(e.value));
    };
    function handlePrice(e) {
        dispatch(getByPrice(e.value));
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{state.title}</Text>
            <View style={styles.selects}>
                <View style={styles.selects}>
                    {/* ------------Select category------------- */}
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
                <View style={styles.selects}>
                    {/* ------------order By Price------------- */}
                    <View><Text >Order by:  </Text></View>
                    <DropDownPicker
                        open={openprice}
                        value={valueprice}
                        items={pickerSort}
                        setOpen={setOpenprice}
                        setValue={setValueprice}
                        onSelectItem={(value) => handlePrice(value)}
                    />
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
    container: { flex: 1 },
    selects: { flexDirection: "row", padding: 20, justifyContent: "space-evenly", },
    flatList: { marginTop: 10, padding: 5 },
    title: { fontSize: 20, padding: 5, marginLeft: 10, }
})

export default Allproducts;