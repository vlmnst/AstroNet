import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
const AverageScore = ({ item }) => {
  // ------CALCULO DEL PUNTAJE ---------
  let score = item?.reviews.map((ele) => {
    return ele.rating;
  });
  let total = score.reduce((a, b) => a + b, 0);
  total = total / score.length;
  //---------ESTRELLAS SEGUN PUNTAJE----------

  const noStarImg = require("../../assets/reviews/no-star.png");
  const starImg = require("../../assets/reviews/star.png");
  let starState = {
    one: noStarImg,
    two: noStarImg,
    three: noStarImg,
    four: noStarImg,
    five: noStarImg,
  };

  function handleStarsReview(number) {
    switch (number) {
        case 1:
            starState = { one: starImg, two: noStarImg, three: noStarImg, four: noStarImg, five: noStarImg };
            break;
        case 2:
            starState = { one: starImg, two: starImg, three: noStarImg, four: noStarImg, five: noStarImg };
            break;
        case 3:
            starState = { one: starImg, two: starImg, three: starImg, four: noStarImg, five: noStarImg };
            break;
        case 4:
            starState = { one: starImg, two: starImg, three: starImg, four: starImg, five: noStarImg };
            break;
        case 5:
            starState = { one: starImg, two: starImg, three: starImg, four: starImg, five: starImg };
            break;
        default:
            break;
    };
};
   handleStarsReview(Math.floor(total))


  return (
    <View style={styles.score}>
      <Text>Average score: {Math.floor(total)} </Text>
      {/* STARS RATING */}
      {/* <TouchableOpacity style={{direction: 'flex', flexDirection: 'row', marginBottom: 5}}> */}
      <View
        style={{ direction: "flex", flexDirection: "row", marginBottom: 5 }}
      >
        <Image source={starState.one} style={{ height: 30, width: 30 }} />
        <Image source={starState.two} style={{ height: 30, width: 30 }} />
        <Image source={starState.three} style={{ height: 30, width: 30 }} />
        <Image source={starState.four} style={{ height: 30, width: 30 }} />
        <Image source={starState.five} style={{ height: 30, width: 30 }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  score: {
    backgroundColor: "#ffff",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    marginVertical: 10,
    paddingVertical: 15,
  },
});

export default AverageScore;
