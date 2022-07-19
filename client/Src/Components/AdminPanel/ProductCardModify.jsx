import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const ProductCardModify = (props) => {
    const { navigation, item } = props;
    // console.log(item);
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate("ProductModify", item)}
        >
            <Image source={{ uri: item.img[0] }} style={styles.image} />
            <View style={styles.contInt}>
                <View style={styles.priceOffer}>
                    {item.offer > 0 ? (
                    <Text style={styles.pricethrough}>$ {item.price}</Text>)
                    : <Text style={styles.price}>$ {item.price}</Text>}
                    {item.offer > 0 ? (
                      <Text style={styles.offer}>{item.offer}% off!</Text>
                    ) : null}
                     {item.offer > 0 ? (
                      <Text style={styles.pricenew}>$ {item.price - (item.price * (item.offer/100))}</Text>
                    ) : null}
                </View>
                <Text style={styles.name}>{item.name.slice(0, 65)}... </Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("ProductModify", item)} >
                <Text style={styles.buttontext}>Modify product</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const font = 10;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        margin: 5,
        padding: 0,
        borderWidth: 2,
        width: "100%",
        height: 250,
        borderColor: "#EAEAEA",
        backgroundColor: "white",
        borderRadius: 10,
    },
    priceOffer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    image: {
        margin: 10,
        height: 110,
        width: "100%",
        borderRadius: 10,
        resizeMode: 'contain',
    },
    contInt: {
        margin: 20,
        width: 130,
        altextAlign: "center",
    },
    price: {
        fontSize: font,
    },
    name: {
        margin: 5,
        fontSize: font,
    },
    offer: {
        color: "red",
        fontSize: font,
    },
    button: {
        marginTop:220,
        position: "absolute",
        margin: 5,
        alignItems: "center",
        backgroundColor: 'green',
        borderRadius: 5,
        

    },
    buttontext: {
        color:"white",
        margin: 5,
        alignItems: "center",
        backgroundColor: 'green',
        borderRadius: 5,
        // padding: 10,
        // marginHorizontal: 15
    },
    pricethrough: {
        fontSize: font,
        textDecorationLine:'line-through'
      },
      pricenew: {
        color: "green",
        fontSize: font,
      },
});

export default ProductCardModify;