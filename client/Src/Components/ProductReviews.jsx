import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const ProductReviews = ({ reviews }) => {
  //por props solo estoy pasando al review de producto
  console.log(reviews)
  return (
    <View style={styles.divOne}>

        <View>
          <View style={styles.div}>
            <Text>{reviews.owner}</Text>
            <Text>{reviews.rating}</Text>
          </View>
          <Text>{reviews.comment}</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  divOne: {
    backgroundColor: "#ffff",
    borderRadius: 5,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    marginVertical: 10,
    paddingVertical: 15,
  },
  div: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ProductReviews;
