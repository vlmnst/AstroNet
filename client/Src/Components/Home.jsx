import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View,Text, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { getAllProducts} from '../../Redux/Slice';
import Allproducts from "./Allproducts";
import Categories from "./Categories";
import Banner from "./Banner";
import NavBar from "./NavBar";

const Home = ({ navigation }) => {
    //----------ejemplo dispatch-------------
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);
    let Products = useSelector((state) => state.ALL_PRODUCTS.allProductsFiltered);

    return (
        <View>
            <SafeAreaView style={styles.AndroidSafeArea} >
            <NavBar/>         
            <Banner/>
            <Categories {...navigation}/>
           </SafeAreaView> 
        </View>
    );
};

const styles = StyleSheet.create({
    AndroidSafeArea: {
      paddingTop: StatusBar.currentHeight + 10,
    },
  });

export default Home;
