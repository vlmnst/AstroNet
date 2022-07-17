import React, { useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUserFullData,getPurchaseOrders } from "../../Redux/Slice/userSlice";


const UserProfile = ({ navigation, route }) => {

    const dispatch = useDispatch()
    const data = useSelector((state) => state.USER.userFullData)
    const email = useSelector((state) => state.USER.email)
    const userName = useSelector((state) => state.USER.userName)

    useEffect(()=>{  
        dispatch(getPurchaseOrders(userName));
        dispatch(getUserFullData(email))
    },[dispatch])

    return (
            <View style={styles.conteiner}>
                {!data[0] ?
                <View>
                    <Text>Loading...</Text>
                </View>:
                <View>
                    <View style={styles.view1}>
                        <Text style={styles.textusername}>{data[0]?.username.slice(0,1).toUpperCase().concat(data[0]?.username.slice(1,data[0]?.username.length))}</Text>
                        <View style={styles.conteineruserdata}>
                            <Text style={styles.text1}>My user data:</Text>
                            <View style={styles.tagandtxt}>
                                <Text style={styles.texttag}>Email: </Text>
                                <Text style={styles.text}>{data[0]?.email}</Text>
                            </View>
                            <View style={styles.tagandtxt}>
                                <Text style={styles.texttag}>First name: </Text>
                                <Text style={styles.text}>{data[0]?.firstname}</Text>
                            </View>
                            <View style={styles.tagandtxt}>
                                <Text style={styles.texttag}>Last name: </Text>
                                <Text style={styles.text}>{data[0]?.lastname}</Text>
                            </View>
                            <View style={styles.tagandtxt}>
                                <Text style={styles.texttag}>Dni: </Text>
                                <Text style={styles.text}>{data[0]?.dni}</Text>
                            </View>
                            <View style={styles.tagandtxt}>
                                <Text style={styles.texttag}>Phone: </Text>
                                <Text style={styles.text}>{data[0]?.phone}</Text>
                            </View>
                            <Text style={styles.text1}>Address:</Text>
                            <View style={styles.tagandtxt}>
                                <Text style={styles.texttag}>Country: </Text>
                                <Text style={styles.text}>{data[0]?.location.country}</Text>
                            </View>
                            <View style={styles.tagandtxt}>
                                <Text style={styles.texttag}>City: </Text>
                                <Text style={styles.text}>{data[0]?.location.city}</Text>
                            </View>
                            <View style={styles.tagandtxt}>
                                <Text style={styles.texttag}>Street: </Text>
                                <Text style={styles.text}>{data[0]?.address.streetAdress}</Text>
                            </View>
                            {data[0]?.address.department?
                                <View style={styles.tagandtxt}>
                                    <Text style={styles.texttag}>Department: </Text>
                                    <Text style={styles.text}>{data[0]?.address.department}</Text>
                                </View>
                            :null}
                            {data[0]?.address.floor?
                                <View style={styles.tagandtxt}>
                                    <Text style={styles.texttag}>Floor: </Text>
                                    <Text style={styles.text}>{data[0]?.address.floor}</Text>
                                </View>
                            :null}
                            <View style={styles.tagandtxt}>
                                <Text style={styles.texttag}>ZipCode: </Text>
                                <Text style={styles.text}>{data[0]?.address.zipCode}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.view2}>
                        <Text style={styles.text1}>Orders:</Text>
                        <TouchableOpacity style={styles.Bottunn_} onPress={()=>navigation.navigate("PurchaseHistory", {navigation})}>
                            <Text>watch</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
            </View>
            
    );
};

const styles = StyleSheet.create({
    conteiner: {
        position: 'absolute',
        alignItems:"center",
        width: '100%',
        height: '100%',
        
    },
    conteineruserdata: {
        justifyContent:"center",
    },
    view1: {
        height:'60%'
    },
    view2: {
        height:'40%'
    },
    textusername: {
        fontSize: 30,
        marginTop:20
    },
    text1:{
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 10
    },
    tagandtxt: {
        flexDirection:"row",
        alignItems:"center"
    },
    texttag: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    text:{
        fontSize: 15
    },
});

export default UserProfile;