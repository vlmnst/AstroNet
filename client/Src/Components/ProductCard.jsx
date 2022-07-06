import { View, Text, Image, StyleSheet } from "react-native";


const ProductCard = (props) => {

    return (
        <View style={styles.container}>
            <Image source={{ uri: props.img }}
                style={styles.image}
            />
            <View style={styles.contInt} >
                <Text style={styles.price}>$ {props.price}</Text>
                <Text style={styles.description}>{props.description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { alignItems: 'center', marginTop: 10, padding: 5, borderWidth: 1, width: 110, height: 160, borderColor: "grey" },
    image: { marginBottom: 2, height: 100, width: 100, borderRadius: 10 },
    contInt: { marginTop: 5 },
    price: { fontSize: 15 },
    description: { fontSize: 10 }
})

export default ProductCard;