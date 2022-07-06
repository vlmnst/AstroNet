import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View,Text } from "react-native";
import { getAllProducts} from '../../Redux/Slice';



const Home = () => {
    //----------ejemplo dispatch-------------
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);
    let Products = useSelector((state) => state.ALL_PRODUCTS.allProductsFiltered);
    console.log(Products)
    return (
        <View>
            <Text>Hola mundo</Text>
        </View>
    );
};


export default Home;
