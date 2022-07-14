import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, FlatList, StyleSheet, Image, Button } from "react-native";

// import NavBar from "./NavBar";
// import ProductCard from "./ProductCard.jsx";
import { getPurchaseProducts } from "../../Redux/Slice";
import { getCredentials } from "../utils/handleCredentials";

const DoReview = ({ route, navigation }) => {

    const dispatch = useDispatch();
    let purchaseProducts = useSelector((state) => state.ALL_PRODUCTS.allProducts);
    const [user, setUser] = useState(null);

    // console.log(purchaseProducts)

    // mount
    useEffect(() => {
        const checkCreds = async() => {
            let credentials = await getCredentials();
            credentials ? setUser(credentials.username) : setUser(null);
        };

        checkCreds();
    }, []);

    // update
    useEffect(() => {
        dispatch(getPurchaseProducts(user))
    }, [user]);

    return (
        <View style={styles.container}>
            {/* ------------ TITLE ------------ */}
            <Text style={styles.title}>Purchase products</Text>

            {/* ------------ PURCHASED PRODUCTS ------------ */}
            <FlatList
                // columnWrapperStyle={{ justifyContent: "space-evenly" }}
                style={styles.flatList}
                numColumns={1}
                data={purchaseProducts}
                renderItem={({ item }) => (
                    <View style={styles.cards}>
                        <Image source={{ uri: item.img }} style={styles.image} />
                        <View style={styles.contentCards}>
                            <Text style={styles.names}>{item.name.slice(0,30)}...</Text>
                            <Button style={styles.btn} title="Review" onPress={() => alert('rate')} />
                            <Text style={styles.names}>Purchased: ???</Text>
                        </View>
                        {/* <ProductCard navigation={navigation} item={item} /> */}
                    </View>
                )}
            />

        </View> 
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center",
    },
    flatList: {
        marginTop: 0,
        padding: 0,
        width: "100%",
    },
    cards: {
        // backgroundColor: 'grey',
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 5,
        borderStyle: 'solid',
        margin: 2,
    },
    contentCards: {
        // backgroundColor: 'red',
        width: '45%',
        padding: 10,
        // marginRight: 13,
    },
    btn: {
        width: 30,
    },
    title: {
        fontSize: 20,
        textAlign: "center",
    },
    names: {
        fontSize: 15,
        textAlign: 'center',
    },
    image: {
        margin: 10,
        height: 100,
        width: "50%",
        borderRadius: 10,
        resizeMode : 'contain',
        backgroundColor: 'black'
      },
});

export default DoReview;