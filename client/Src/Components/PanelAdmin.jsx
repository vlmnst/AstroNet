import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";


const PanelAdmin = ({ navigation, route }) => {

    return (
            <View style={styles.conteiner}>
                <TouchableOpacity
                onPress={() => navigation.navigate("ProductCreate")}>
                    <View style={styles.button}>
                        <Text style={styles.text}>Create Product</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => navigation.navigate("AllAdmin")}>
                    <View style={styles.button}>
                        <Text style={styles.text}>All Products</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => navigation.navigate("AllUsers")}>
                    <View style={styles.button}>
                        <Text style={styles.text}>All Users</Text>
                    </View>
                </TouchableOpacity>
            </View>
    );
};

const styles = StyleSheet.create({
    conteiner: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems:"center",
        width: '100%',
        height: '100%'
    },
    button: {
        height: 60,
        backgroundColor: 'grey',
        width: 140,
        justifyContent:"center",
        alignItems:"center",
        margin: 50,
        borderRadius: 15
    },
    text: {
        fontSize:20
    }
});

export default PanelAdmin;