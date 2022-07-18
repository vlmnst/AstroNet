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
	const { route } = props;
	const { params } = route;
	const { navigation } = params
	const dispatch = useDispatch();

  // ---------- global states ----------
	const purchaseProductsH = useSelector((state) => state.USER.productHistory);
	const userName = useSelector((state) => state.USER.userName)
    
  // mount

	const handleSubmit=( )=>{
		// navigation.navigate('PurchaseOrders')
	}
	// const handleVolver=( )=>{
	//    navigation.navigate('Profile')
	// }
	return (
        <View style={styles.container}>
			{/* <TouchableOpacity style={styles.Bottunn_} onPress={handleVolver()}>
				<Text>Return</Text>
			</TouchableOpacity> */}
			{/* ------------ TITLE ------------ */}
            <Text style={styles.title}>Purchase History</Text>
            <Text style={styles.userName}>{userName}</Text>
        	{/* ------------ PRODUCTS CARDS ------------ */}
        
          {purchaseProductsH.productsHistory?.length?
            <FlatList
              numColumns={1}
              data={purchaseProductsH.productsHistory}
              renderItem={({ item }) => (
                <View style={styles.cardContainer}> 
                  {/* <Text>{userName}</Text> */}
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
    
	);
};

const styles = StyleSheet.create({
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
cardContainer: {
	marginVertical:20
},
title: {
	fontSize: 30,
	marginTop: 20,
	fontWeight: "bold",
	textAlign: "center",
},
userName: {
	marginVertical:15,
	fontSize: 25
},
Bottunn_:{
	backgroundColor:"#ccc",
	padding: 5,
	borderRadius: 12},
	width: "25%",
});

export default PurchaseHistory;
