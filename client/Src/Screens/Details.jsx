import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Button,
  Image,
} from "react-native";

const Details = (props) => {
  
  const { route } = props;
  const { params } = route;
  let descriptionArray = Object.entries(params.description); //converte el objecto en array de arrays (con key y value)

  // console.log(params.img);

  return (
    <View style={styles.container}>
      <Image source={{ uri: params.img }} style={styles.image} />
      <View style={styles.contInt}>
        <View style={styles.priceOffer}>
          <Text style={styles.price}>$ {params.price}</Text>
          {params.offer > 0 ? (
            <Text style={styles.offer}>{params.offer}% off!</Text>
          ) : null}
        </View>
        <View style={styles.descriptionCont}>
          <Text style={styles.name}>{params.name}: </Text>
          {descriptionArray.map((item, index) => {
            return (
              <Text style={styles.description} key={index}>
                {item[0]}: {item[1]}
              </Text>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const nameFont = 15;
const priceOfferFont = 15;
const fontDescription = 12;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    padding: 10,
    width: "100%",
    height: "100%",
    borderColor: "#EAEAEA",
    backgroundColor: "white",
  },
  priceOffer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 5,
    fontSize: priceOfferFont,
    marginTop: 10
  },
  image: {
    marginBottom: 2,
    marginTop: 5,
    height: 200,
    width: 250,
    borderRadius: 10,
  },
  contInt: { marginTop: 5, width: "98%", backgroundColor: "#EAEAEA" },
  price: { fontSize: priceOfferFont },
  name: { fontSize: nameFont, marginHorizontal: 10, marginVertical: 10 },
  offer: { color: "red", fontSize: priceOfferFont },
  descriptionCont: {display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center"},
  description: { fontSize: fontDescription, padding: 5, backgroundColor: "white", borderRadius: 5, borderColor: "#EAEAEA", marginHorizontal: 5, marginVertical: 5 },
});

export default Details;