import React, { useEffect } from "react";
import Cart from "../Components/Cart";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import ProductReviews from "../Components/ProductReviews";
import AverageScore from "../Components/AverageScore";
import IconIonicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageDetails from "../Components/ImageDetails";
import { useSelector } from "react-redux";
import { getProductsByName } from "../../Redux/Slice";

const Details = (props) => {

  let role = useSelector((state) => state.USER.role);
  let product = useSelector((state) => state.ALL_PRODUCTS.allProductsFiltered);

  const { route } = props; 
  // const { params } = route;
  const { navigation } = props
  let item
  let params
  if(props.route.params.item){
    item = props.route.params.item
    params = props.route.params
  } else {
    item = props.route.params
    params = props.route.params
  }
  // console.log('--------------------------')
  // console.log(params)

  // useEffect(() => {
  //   dispatch(getProductsByName(item.name))
  // },[product])

  return (
    <View>

      <View style={styles.SBcontainer}>
        <View style={styles.SB}>
          <IconIonicons style={styles.iconMenu} name="chevron-back" size={36} onPress={() => props.navigation.goBack()}/>
          <Icon style={styles.iconCart} name="cart-outline" size={30}  onPress={() => navigation.navigate("Cart")}/>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <ImageDetails images={item.img}/>

        <View style={styles.contInt}>
          <View style={styles.priceOffer}>
            {item.offer > 0 ? (
              <Text style={styles.pricethrough}>$ {item.price}</Text>
            ) : (
              <Text style={styles.price}>$ {item.price}</Text>
            )}
            {item.offer > 0 ? (
              <Text style={styles.offer}>{item.offer}% off!</Text>
            ) : null}
            {item.offer > 0 ? (
              <Text style={styles.pricenew}>
                $ {params.price - item.price * (item.offer / 100)}
              </Text>
            ) : null}
          </View>

          <View style={styles.descriptionCont}>
            {item.name?
            <Text style={styles.name}>{item.name}: </Text>:null}
            {item.description?.map((item, index) => {
              return (
                <View key={index}>
                <Text style={styles.description} >
                  {Object.keys(item)} : {Object.values(item)}
                </Text>
                </View>
              );
            })}
          </View>

          <View>
            <Text style={styles.name}>Detail: </Text>
            <Text style={styles.description}>{item.detail}</Text>
          </View>

          { role === 'admin'||role === 'mod'?(
            <View>
              <TouchableOpacity style={styles.editbtn} onPress={() => navigation.navigate('ProductModify', props)}>
                <Text style={styles.editText}>Edit Product</Text>
              </TouchableOpacity>
            </View>
          ) : null }
          
          <View style={styles.addcartbtn}>
            { (item.stock === 0) 
              ? ( <Text style={styles.offer}>Without stock</Text>)
              : ( <Cart navigation={route} item={item} /> )
            }
          </View>

            {/* -------AVERAGE SCORE--------------  */}
            {item.reviews?.length > 0 ?
            <AverageScore item={item}/>
            :
            null }

          {/* -------USERS COMMENTS--------------  */}
          <View style={styles.reviewscontainer}>
          {item.reviews?.length > 0 ?
          item.reviews.map((reviews, index) => (
            <ProductReviews key={index} reviews={reviews}/>
          )) : 
          <View style={styles.divOne}>
          <Text>
            There are no reviews for this product yet ¡Be the first to purchase it!
          </Text>
        </View>
          
          }
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const nameFont = 15;
const priceOfferFont = 15;
const fontDescription = 12;

const styles = StyleSheet.create({
  SBcontainer: {
    height:'10%',
    backgroundColor:'#4A347F'
  },
  SB: {
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems:"center",
    height:'100%',
    backgroundColor: '#4A347F',
    width: '100%',
    marginTop:'4%'
  },
  iconMenu: {
    marginLeft:'7%',
    color:'white'
  },
  iconCart: {
    marginRight:'7%',
    color:'white'
  },
  container: {
    alignItems: "center",
    justifyContent:'center',
    padding: 10,
    width: "100%",
    backgroundColor: "white",
  },
  reviewscontainer:{
    marginBottom:'23%'
  },
  priceOffer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 5,
    fontSize: priceOfferFont,
    marginTop: 10,
  },
  image: {
    marginBottom: 2,
    marginTop: 5,
    height: 200,
    width: 250,
    borderRadius: 10,
  },
  contInt: { marginTop: 5, width: "100%", backgroundColor: "#EAEAEA" },
  price: { fontSize: priceOfferFont },
  name: { fontSize: 18, marginHorizontal: 10, marginVertical: 10 },
  offer: { color: "red", fontSize: priceOfferFont },
  descriptionCont: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    
  },
  description: {
    fontSize: 15,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "#EAEAEA",
    marginHorizontal: 5,
    marginVertical: 5,
  },
  addcartbtn: {
    width:'100%',
    justifyContent:"center",
    alignItems:"center",
    height:160
  },
  pricethrough: {
    fontSize: nameFont,
    textDecorationLine: "line-through",
  },
  pricenew: {
    color: "green",
    fontSize: nameFont,
  },
  divOne: {
    backgroundColor: "#ffff",
    borderRadius: 5,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    marginVertical: 10,
    paddingVertical: 15,
  },
  editbtn: {
    alignItems: "center",
    backgroundColor: "#BD0000",
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
    width:'50%',
    alignSelf:"center",
    marginTop:15
  },
  editText: {
    fontSize: 19,
    color: "white",
    fontWeight: "bold",
  },
});

export default Details;
