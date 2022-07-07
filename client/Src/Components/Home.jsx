import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View,Text } from "react-native";
import { getAllProducts} from '../../Redux/Slice';
import Allproducts from "./Allproducts";



const Home = () => {
    //----------ejemplo dispatch-------------
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);
    let Products = useSelector((state) => state.ALL_PRODUCTS.allProductsFiltered);

    return (
        <View>
            <Allproducts/>
        </View>
    );
};


export default Home;
