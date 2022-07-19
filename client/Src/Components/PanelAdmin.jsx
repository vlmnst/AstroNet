import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import CustomButton from "./CustomButton";

const PanelAdmin = ({ navigation, route }) => {

    return (
            <View style={styles.conteiner}>
                <Image source={{uri : 'https://img.freepik.com/free-vector/abstract-colorful-technology-dotted-wave-background_1035-17450.jpg'}} style={styles.background}/>
                <CustomButton 
                    onPress={() => navigation.navigate("ProductCreate")}
                    text='Create Product'
                    fgColor='#17202A'
                />
                {/* <TouchableOpacity>
                    <View style={styles.button}>
                        <Text style={styles.text}>Create Product</Text>
                    </View>
                </TouchableOpacity> */}
                <CustomButton 
                    onPress={() => navigation.navigate("AllAdmin")}
                    text='All Products'
                    fgColor='#17202A'
                />
                {/* <TouchableOpacity
                onPress={() => navigation.navigate("AllAdmin")}>
                    <View style={styles.button}>
                        <Text style={styles.text}>All Products</Text>
                    </View>
                </TouchableOpacity> */}
                  <CustomButton 
                    onPress={() => navigation.navigate("AllUsers")}
                    text='All Users'
                    fgColor='#17202A'
                />
                {/* <TouchableOpacity
                onPress={() => navigation.navigate("AllUsers")}>
                    <View style={styles.button}>
                        <Text style={styles.text}>All Users</Text>
                    </View>
                </TouchableOpacity> */}
            </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
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