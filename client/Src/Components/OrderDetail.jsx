import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import FeatherIcon from 'react-native-vector-icons/Feather';

const OrderDetail = (props) => {
  const { navigation, route } = props;
  let { detail } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.SBcontainer}>
				<View style={styles.SB}>
					<FeatherIcon style={styles.iconMenu} name="skip-back" size={36} onPress={() => navigation.goBack()}/>
					<Text style={{fontSize:28, color:'white', fontWeight:'bold'}}>Purchase Order</Text>
				</View>
			</View>

      <FlatList
        style={{height:'88%'}}
        numColumns={1}
        data={detail}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item,index }) => (

          <View style={styles.PODetail}>
            <Image source={{ uri: item.img[0] }} style={styles.image} />
            <Text>{item.name}</Text>
            <Text>{`price: $${item.price}`}</Text>
            <Text>{`Quantity: ${item.quantity}`}</Text>
          </View>
        )}
      />
      <Text style={styles.total}>{`Total: $${route.params?.total}`}</Text>
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
  title: {
    fontSize: 20,
    padding: 5,
    textAlign: "center",
  },
  Bottunn_: { backgroundColor: "#ccc", padding: 5, borderRadius: 12 },
});

export default OrderDetail;
