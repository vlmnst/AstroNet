import { View, Text, Image, StyleSheet } from "react-native";

const ProductCard = (props) => {

  let descriptionArray = Object.entries(props.description) //converte el objecto en array de arrays (con key y value)
  
  return (
    <View style={styles.container}>
      <Image source={{ uri: props.img }}
        style={styles.image}
      />
      <View style={styles.contInt} >
        <View style={styles.priceOffer}>
          <Text style={styles.price}>$ {props.price}</Text>
          {(props.offer > 0) ? (<Text style={styles.offer} >{props.offer}% off!</Text>) : null}
        </View>
        <Text style={styles.name}>{props.name}: </Text>
        {/* {descriptionArray.map((item, index) => {
          return (
            <Text style={styles.description} key={index} >{item[0]}: {item[1]}</Text>
          )
        })} */}
      </View>
    </View>
  );
};

const font = 11;
const fontDescription = 10;
const styles = StyleSheet.create({
  container: { display: "flex", alignItems: 'center', margin:"2%", padding: 5, borderWidth: 2, width: 300, borderColor: "#EAEAEA", backgroundColor:"white", borderRadius:15 },
  priceOffer: {flexDirection:'row', justifyContent: "space-between", marginBottom: 5 },
  image: { marginBottom: 2, height: 200,  width:250, borderRadius: 10 },
  contInt: { marginTop: 5, width:300 },
  price: { fontSize: font },
  name: { fontSize: font },
  offer: { color: "red", fontSize: font },
  description: { fontSize: fontDescription,padding:5 }
})

export default ProductCard;

// const description = {
//   "Teclas": "MAS TECLAS",
//   "marca": "cualquiercosa"
// };

{/* <ProductCard
price="444"
name="laptop"
img= "https://img.lovepik.com/free-png/20220121/lovepik-laptop-png-image_401598576_wh860.png"
offer="30"
description= {description}
/> */}