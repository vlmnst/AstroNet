import React, { useState, useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, FlatList, StyleSheet, useWindowDimensions } from "react-native";
import { getByPrice, getProductsByCategory, clearCache } from '../../Redux/Slice';
import ProductCard from './ProductCard.jsx';
import { Picker } from '@react-native-picker/picker';

const Allproducts = ({ route }) => {
    //----------dispatch-------------
    let item = route.params
    let Products = useSelector((state) => state.ALL_PRODUCTS.allProductsFiltered);
    let [categories,setCategories] = useState(useSelector((state) => state.ALL_PRODUCTS.categories));
    const pickerRef = useRef();
    const dispatch = useDispatch();
    const [state, setState] = useState({
        title: "AllProducts",
    });
    useEffect(() => { dispatch(getProductsByCategory(item)); }, [dispatch]);
    useEffect(() => { return () => {dispatch(clearCache())} }, [dispatch]);
    //----------actions-------------
    // function handleCategory(e) {
    //     setState({
    //         ...state,
    //         title: e
    //     })
    //     dispatch(getProductsByCategory(e));
    // };
    // function handlePrice(e) {
    //     dispatch(getByPrice(e));
    // };
    // function open() {
    //     pickerRef.current.focus();
    // };
    // function close() {
    //     pickerRef.current.blur();
    // };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{state.title}</Text>
            <View style={styles.selects}>
                <View style={styles.selects}>
                    {/* ------------Select category------------- */}
                    <Text >Filter by:  </Text>
                    {/* <Picker
                        defaultValue ={null} 
                        ref={pickerRef}
                        multiple={true}
                        selectedValue={categories}
                        onValueChange={(itemValue, itemIndex) =>
                        handleCategory(itemValue)
                        }>
                            <Picker.Item label={null}  value={null} />
                            {categories.length ? (
                            categories.map((c, index) => (
                                <Picker.Item label={c} value={c} key={index}/>
                            )
                            )
                        ) : (null)}
                    </Picker> */}
                </View>
                <View style={styles.selects}>
                    {/* ------------order By Price------------- */}
                    <Text >Order by:  </Text>
                    {/* <Picker
                        defaultValue ={null} 
                        ref={pickerRef}
                        multiple={true}
                        onValueChange={(itemValue, itemIndex) =>
                            handlePrice(itemValue)
                        }>  <Picker.Item label={null}  value={null} />
                            <Picker.Item label="higher" value="higher" />
                            <Picker.Item label="lower" value="lower" />
                    </Picker> */}
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
    selects: { flexDirection: "row", padding: 5, justifyContent: "space-evenly" },
    flatList: { marginTop: 10, padding: 5 },
    title: { fontSize: 20, padding: 5, marginLeft: 10, }
})

export default Allproducts;