import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderDetail from './OrderDetail.jsx';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity
} from "react-native";

const PurchaseHistory = (props) => {
  // ---------- dispatch ----------
  console.log(props)
  const { route } = props;
  const { params } = route;
  const { navigation } = params
  console.log(params)
  const dispatch = useDispatch();

  // ---------- global states ----------
  const purchaseProductsH = useSelector((state) => state.USER.productHistory);
  const userName = useSelector((state) => state.USER.userName)
    
  // mount
  // const handleSubmit=( )=>{
  //   navigation.navigate('OrderDetail')
  // }
  // const handleVolver=( )=>{
  //    navigation.navigate('Profile')
  // }
  return (
    
      <SafeAreaView style={styles.AndroidSafeArea}>
        <View style={styles.container}>
        {/* <TouchableOpacity style={styles.Bottunn_} onPress={handleVolver()}>
                    <Text>Return</Text>
        </TouchableOpacity> */}
             {/* ------------ TITLE ------------ */}
            <Text style={styles.title}>Purchase History</Text>
            <Text>{userName}</Text>
       

        {/* ------------ PRODUCTS CARDS ------------ */}
        
        {purchaseProductsH.productsHistory?.length?
        <FlatList
          columnWrapperStyle={{ justifyContent: "space-evenly" }}

          numColumns={2}
          data={purchaseProductsH.productsHistory}
          renderItem={({ item }) => (
            <View> 
                {console.log(item)}
                <Text>{userName}</Text>
                <Text>{`order: ${item.order}`}</Text>
                <Text>{`date: ${item.date}`}</Text>
                <Text> {`total: $${item.total}`}</Text>
                <TouchableOpacity style={styles.Bottunn_} onPress={() => navigation.navigate("OrderDetail", item)}>
                    <Text>Details</Text>
                </TouchableOpacity>
              {/* <PurchaseOrders navigation={navigation} item={item} /> */}
            </View>
          )}
        />
        :<View>
        <Text>No purchases</Text>
        </View>}
        </View>
      </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    // paddingTop: StatusBar.currentHeight + 10,
  },
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  selectsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  selects: {
    flexDirection: "column",
    margin: 10,
    width: "40%",
  },
  flatList: {
    marginTop: 0,
    padding: 0,
    width: "100%",
  },
  title: {
    fontSize: 20,
    padding: 5,
    textAlign: "center",
  },
  Bottunn_:{backgroundColor:"#ccc",padding: 5,borderRadius: 12}, width: "25%",
});

export default PurchaseHistory;
