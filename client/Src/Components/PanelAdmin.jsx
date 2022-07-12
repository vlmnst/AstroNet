import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";


const Home = ({ navigation, route }) => {

    return (
            <View style={styles.conteiner}>
                <TouchableOpacity>
                    <View style={styles.button}>
                        <Text style={styles.text}>Button 1</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.button}>
                        <Text style={styles.text}>Button 2</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.button}>
                        <Text style={styles.text}>Button 3</Text>
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

export default Home;