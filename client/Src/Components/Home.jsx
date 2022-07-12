import React, { useEffect } from "react";
import Categories from "../Components/Categories";
import { useDispatch } from "react-redux";
import { View, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { getAllProducts,getCategories } from '../../Redux/Slice';
import Banner from "./Banner";
import NavBar from "./NavBar";


const Home = ({ navigation, route }) => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
      <View style={styles.conteiner}>
        <SafeAreaView style={styles.AndroidSafeArea} >
          <NavBar navigation={navigation} route={route} />
          <Banner navigation={navigation} />
          <Categories {...navigation} />
        </SafeAreaView>
      </View>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: StatusBar.currentHeight + 10,
  },
  conteiner: {
    position: 'absolute',
    justifyContent: 'center',
    width: '100%'
  }
});

export default Home;