import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Button,
} from "react-native";
import FeatherIcon from 'react-native-vector-icons/Feather';

const OrderDetail = (props) => {
  const { navigation, route } = props;
  let { detail } = route.params;

  // console.log('------------------');
  // console.log(route);


  return (
    <View style={styles.container}>
      <View style={styles.SBcontainer}>
				<View style={styles.SB}>
					<FeatherIcon style={styles.iconMenu} name="skip-back" size={36} onPress={() => navigation.goBack()}/>
					<Text style={{fontSize:28, color:'white', fontWeight:'bold'}}>Purchase Order</Text>
				</View>
			</View>
      {/* <Text style={styles.title}>Purchase Order Details</Text> */}

      <FlatList
        // columnWrapperStyle={{ justifyContent: "space-evenly" }}
        style={{height:'88%'}}
        numColumns={1}
        data={detail}
        renderItem={({ item }) => (

          <View style={styles.PODetail}>

            {/* <Text>{item.id}</Text> */}
            <Image source={{ uri: item.img[0] }} style={styles.image} />
            <Text>{item.name}</Text>
            {/* <Text>{`Offer: ${item.offer}%`}</Text> */}
            <Text>{`price: $${item.price}`}</Text>
            <Text>{`Quantity: ${item.quantity}`}</Text>
            {/* <Text>{`review: ${item.review}`}</Text> */}
            {/* <View>
              <TouchableOpacity
                style={styles.Bottunn_}
                onPress={() => navigation.navigate("Detail", item)}
              >
                <Text>Product Details</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.Bottunn_}
                onPress={() => navigation.navigate()}
              >
                <Text>Review</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        )}
      />
      {/* <Text>{`Total: $${route.params?.total}`}</Text> */}
      <Text style={styles.total}>{`Total: $${route.params?.total}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // AndroidSafeArea: {
  //   // paddingTop: StatusBar.currentHeight + 10,
  // },
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
  image: {
    margin: 10,
    height: 110,
    width: "100%",
    borderRadius: 10,
    resizeMode: "contain",
  },
  PODetail: {
    flex: 1,
    alignItems: "center",
    margin: 15,
    padding: 20,
    borderWidth: 2,
    width: "90%",
    height: 250,
    borderColor: "#EAEAEA",
    backgroundColor: "white",
    borderRadius: 10,
  },
  total: {
    // flex: 1,
    alignItems: "center",
    marginVertical: 10,
    // padding: 20,
    borderWidth: 2,
    width: "90%",
    height: '5%',
    borderColor: "#EAEAEA",
    backgroundColor: "white",
    borderRadius: 10,
    textAlign:"center",
    justifyContent:"center",
    fontSize:26,
    fontWeight:"bold"
  },
  boton: {
    backgroundColor: "#ccc",
    padding: 5,
    borderRadius: 12,
    width: 100,
    height: 30,
  },

  // selectsContainer: {
  //   flexDirection: "row",
  //   justifyContent: "space-around",
  // },
  // selects: {
  //   flexDirection: "column",
  //   margin: 10,
  //   width: "40%",
  // },
  // flatList: {
  //   marginTop: 0,
  //   padding: 0,
  //   width: "100%",
  // },
  title: {
    fontSize: 20,
    padding: 5,
    textAlign: "center",
  },
  Bottunn_: { backgroundColor: "#ccc", padding: 5, borderRadius: 12 },
});

export default OrderDetail;
