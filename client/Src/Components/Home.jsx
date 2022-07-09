import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View,Text } from "react-native";
import { getAllProducts} from '../../Redux/Slice';
import Allproducts from "./Allproducts";
import Categories from "./Categories";
import Banner from "./Banner";


const Home = ({ navigation }) => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    return (
        <View>
            <Banner/>
            <Categories {...navigation}/>
        </View>
    );
};


export default Home;
