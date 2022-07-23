import React from "react";
import Cart from "../Components/Cart";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ProductReviews from "../Components/ProductReviews";
import AverageScore from "../Components/AverageScore";
import IconIonicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageDetails from "../Components/ImageDetails";

const Details = (props) => {

  const { route } = props;
  const { params } = route;
  const { navigation } = props

  return (
    <View>

      <View style={styles.SBcontainer}>
        <View style={styles.SB}>
          <IconIonicons style={styles.iconMenu} name="chevron-back" size={36} onPress={() => props.navigation.goBack()}/>
          <Icon style={styles.iconCart} name="cart-outline" size={30}  onPress={() => navigation.navigate("Cart")}/>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <ImageDetails images={params.img}/>

        <View style={styles.contInt}>
          <View style={styles.priceOffer}>
            {params.offer > 0 ? (
              <Text style={styles.pricethrough}>$ {params.price}</Text>
            ) : (
              <Text style={styles.price}>$ {params.price}</Text>
            )}
            {params.offer > 0 ? (
              <Text style={styles.offer}>{params.offer}% off!</Text>
            ) : null}
            {params.offer > 0 ? (
              <Text style={styles.pricenew}>
                $ {params.price - params.price * (params.offer / 100)}
              </Text>
            ) : null}
          </View>

          <View style={styles.descriptionCont}>
            <Text style={styles.name}>{params.name}: </Text>
            {params.description.map((item, index) => {
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
            <Text style={styles.description}>{params.detail}</Text>
          </View>

          <View style={styles.addcartbtn}>
            <Cart navigation={route} item={params} />
          </View>

            {/* -------AVERAGE SCORE--------------  */}
            {params.reviews.length > 0 ?
            <AverageScore item={params}/>
            :
            null }

          {/* -------USERS COMMENTS--------------  */}
          <View style={styles.reviewscontainer}>
          {params.reviews.length > 0 ?
          params.reviews.map((reviews, index) => (
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
  name: { fontSize: nameFont, marginHorizontal: 10, marginVertical: 10 },
  offer: { color: "red", fontSize: priceOfferFont },
  descriptionCont: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    
  },
  description: {
    fontSize: fontDescription,
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
});

export default Details;
