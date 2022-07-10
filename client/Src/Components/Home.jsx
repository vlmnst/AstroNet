import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { getAllProducts } from '../../Redux/Slice';
import Allproducts from "./Allproducts";
import Categories from "./Categories";
import Banner from "./Banner";
import NavBar from "./NavBar";

const Home = ({ navigation, route }) => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <View>
      <SafeAreaView style={styles.AndroidSafeArea} >
        <NavBar navigation={navigation} route={route} />
        <Banner />
        <Categories {...navigation} />
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