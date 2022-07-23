import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import CustomButton from "./CustomButton";
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useSelector } from "react-redux";
import Email from "./AdminPanel/email"

const PanelAdmin = ({ navigation, route }) => {

    const userName = useSelector((state) => state.USER.userName)

    return (
            <View style={styles.conteiner}>
                <View style={styles.SBcontainer}>
                    <View style={styles.SB}>
                        <FeatherIcon style={styles.iconMenu} name="menu" size={36} onPress={() => navigation.openDrawer()}/>
                        <Text style={{fontSize:28, color:'white', fontWeight:'bold'}}>Admin Panel</Text>
                    </View>
                </View>
                {/* <Image source={{uri : 'https://img.freepik.com/free-vector/abstract-colorful-technology-dotted-wave-background_1035-17450.jpg'}} style={styles.background}/> */}
                <Text style={styles.userName}>{userName.slice(0,1).toUpperCase().concat(userName.slice(1,userName.length))}</Text>
                <View style={{height:'78%', width:'100%', alignItems:"center"}}>
                    {/* <CustomButton 
                        onPress={() => navigation.navigate("AllUsers")}
                        text='All Users'
                        fgColor='#17202A'
                    /> */}
                    <TouchableOpacity style={styles.TouchableOpacity} onPress={() => navigation.navigate("AllUsers")}>
                        <View style={styles.button}>
                            <Text style={styles.text}>Users</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <CustomButton 
                        onPress={() => navigation.navigate("AllAdmin")}
                        text='All Products'
                        fgColor='#17202A'
                    /> */}
                    <TouchableOpacity style={styles.TouchableOpacity} onPress={() => navigation.navigate("AllAdmin")}>
                        <View style={styles.button}>
                            <Text style={styles.text}>Products</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <CustomButton 
                        onPress={() => navigation.navigate("ProductCreate")}
                        text='Create Product'
                        fgColor='#17202A'
                    /> */}
                    <TouchableOpacity style={styles.TouchableOpacity} onPress={() => navigation.navigate("ProductCreate")}>
                        <View style={styles.button}>
                            <Text style={styles.text}>Post new product</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TouchableOpacity} onPress={() => navigation.navigate("AllPurchaseHistory")}>
                        <View style={styles.button}>
                            <Text style={styles.text}>All Purchase History</Text>
                        </View>
                    </TouchableOpacity>
                    <Email/>
                </View>
            </View>
    );
};

const styles = StyleSheet.create({
    // background: {
    //     flex: 1,
    //     position: 'absolute',
    //     width: '100%',
    //     height: '100%'
    // },
    conteiner: {
        position: 'absolute',
        // justifyContent: 'center',
        alignItems:"center",
        width: '100%',
        height: '100%'
    },
    SBcontainer: {
        height:'12%',
        backgroundColor:'#4A347F',
        width:'100%'
    },
    SB: {
        flexDirection: "row",
        justifyContent:"center",
        alignItems:"center",
        height:'65%',
        backgroundColor: '#4A347F',
        // backgroundColor:'white',
        width: '100%',
        marginTop:'9%'
    },
    iconMenu: {
        color:'white',
        position:'absolute',
        left:'5%'
    },
    userName: {
        color:'#4A347F',
        fontSize:40,
        fontStyle:"italic",
        fontWeight:"bold",
        marginTop:'15%',
    },
    TouchableOpacity: {
        height:'10%',
        width:'80%',
        justifyContent:"center",
        alignItems:"center",
        marginTop:'20%'
    },
    button: {
        height: '100%',
        backgroundColor: '#4A347F',
        width: '70%',
        justifyContent:"center",
        alignItems:"center",
        margin: 20,
        borderRadius: 15
    },
    text: {
        fontSize:20,
        color: 'white'
    }
});

export default PanelAdmin;