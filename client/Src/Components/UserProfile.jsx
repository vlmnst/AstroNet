import React, { useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUserFullData,getPurchaseOrders } from "../../Redux/Slice/userSlice";
import FeatherIcon from 'react-native-vector-icons/Feather';
import Loader from "./Loader";

const UserProfile = ({ navigation }) => {

    const dispatch = useDispatch()
    const data = useSelector((state) => state.USER.userFullData)
    const email = useSelector((state) => state.USER.email)
    const userName = useSelector((state) => state.USER.userName)

    useEffect(()=>{  
        dispatch(getPurchaseOrders(userName));
        dispatch(getUserFullData(email))
    },[dispatch,email])

    return (
            <View Style={styles.conteiner}>
                {!data[0] ?
                <Loader/>
                :
                <View style={styles.view1}>
                    <View style={styles.SBcontainer}>
                        <View style={styles.SB}>
                            <FeatherIcon style={styles.iconMenu} name="menu" size={36} onPress={() => navigation.openDrawer()}/>
                            <Text style={{fontSize:28, color:'white', fontWeight:'bold'}}>Profile</Text>
                        </View>
                    </View>
                    <ScrollView contentContainerStyle={styles.ScrollView}>
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
                        <View style={styles.view2}>
                            <Text style={styles.text1}>Orders:</Text>
                            <View style={styles.view2_1}>
                                <TouchableOpacity style={styles.ordersandreviewsbtns} onPress={()=>navigation.navigate("PurchaseHistory", {navigation})}>
                                    <Text style={{color:'white', fontSize:20, fontWeight:"bold"}}>View</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.text1}>Reviews:</Text>
                            <View style={styles.view2_1}>
                                <TouchableOpacity style={styles.ordersandreviewsbtns} onPress={()=>navigation.navigate("DoReview", {navigation})}>
                                    <Text style={{color:'white', fontSize:20, fontWeight:"bold"}}>View</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>}
            </View>
    );
};

const styles = StyleSheet.create({
    conteiner: {
        alignItems: "center",
        width: '100%',
        minHeight: '100%',
    },
    view1: {
        minHeight:'100%'
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
        width: '100%',
        marginTop:'9%'
    },
    iconMenu: {
        color:'white',
        position:'absolute',
        left:'5%'
    },
    conteineruserdata: {
        justifyContent:"center",
    },
    ScrollView: {
        minHeight:'88%',
        marginHorizontal: 25
    },
    view2: {
        height:'15%',
    },
    view2_1: {
        height: '50%',
        justifyContent:"flex-start",
        alignItems:"center"
    },
    textusername: {
        fontSize: 35,
        marginTop:25,
        fontWeight:"bold",
        fontStyle:"italic",
        color:'#4A347F'
    },
    text1:{
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 15
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
    ordersandreviewsbtns: {
        width:'60%',
        height: '70%',
        backgroundColor: '#4A347F',
        borderRadius: 15,
        alignItems:"center",
        justifyContent:"center"
    },
});

export default UserProfile;