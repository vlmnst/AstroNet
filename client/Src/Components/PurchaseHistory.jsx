import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderDetail from './OrderDetail.jsx';
import FeatherIcon from 'react-native-vector-icons/Feather';
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
			<View style={styles.SBcontainer}>
				<View style={styles.SB}>
					<FeatherIcon style={styles.iconMenu} name="skip-back" size={36} onPress={() => navigation.goBack()}/>
					<Text style={{fontSize:28, color:'white', fontWeight:'bold'}}>Purchase History</Text>
				</View>
			</View>
            {/* <Text style={styles.title}>Purchase History</Text> */}
            <Text style={styles.userName}>{userName.slice(0,1).toUpperCase().concat(userName.slice(1,userName.length))}</Text>
        	{/* ------------ PRODUCTS CARDS ------------ */}
        
			{purchaseProductsH.productsHistory?.length?
				<FlatList
				numColumns={1}
				data={purchaseProductsH.productsHistory}
				renderItem={({ item }) => (
					<View style={styles.cardContainer}> 
					{/* <Text>{userName}</Text> */}
						<View style={{padding:10}}>
							<Text>{`order: ${item.order}`}</Text>
							<Text>{`date: ${item.date}`}</Text>
							<Text> {`total: $${item.total}`}</Text>
							<TouchableOpacity style={styles.Bottunn_} onPress={() => navigation.navigate("OrderDetail", item)}>
								<Text style={{fontSize:18, textAlign:"center"}}>Details</Text>
							</TouchableOpacity>
						</View>
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
SBcontainer: {
	height:'12%',
	backgroundColor:'#4A347F',
	width:'100%'
},
SB: {
	flexDirection: "row",
	justifyContent:"center",
	alignItems:"center",
	height:'65%',
	backgroundColor: '#4A347F',
	// backgroundColor:'white',
	width: '100%',
	marginTop:'9%'
},
iconMenu: {
	color:'white',
	position:'absolute',
	left:'5%'
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
	marginVertical:20,
	borderWidth:2,
	borderColor:'grey',
	borderRadius:10
},
title: {
	fontSize: 30,
	marginTop: 20,
	fontWeight: "bold",
	textAlign: "center",
},
userName: {
	marginVertical:15,
	fontSize: 25,
	fontWeight:"bold"
},
Bottunn_:{
	backgroundColor:"#ccc",
	padding: 5,
	borderRadius: 12},
	width: "25%",
});

export default PurchaseHistory;
