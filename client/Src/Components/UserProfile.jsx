import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";


const UserProfile = ({ navigation, route }) => {

    return (
            <View style={styles.conteiner}>
                <Text style={styles.text}>UserName</Text>
            </View>
    );
};

const styles = StyleSheet.create({
    conteiner: {
        position: 'absolute',
        // justifyContent: 'center',
        alignItems:"center",
        width: '100%',
        height: '100%',
        
    },
    text: {
        fontSize: 20
    }
});

export default UserProfile;