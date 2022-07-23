import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from "react-native";
import {getPurchasedProductsAllUsers,putpurchasedProducts} from "../../../Redux/Slice/userSlice";
import { getCredentials } from "../../utils/handleCredentials";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

const AllPurchaseHistoryCard = (props) => {
    const [userAdmin, setUserAdmin] = useState();
    //-----------Mount Credentials---------------
    useEffect(() => {
        const checkCreds = async () => {
            const credentials = await getCredentials();
            if (credentials) {
                setUserAdmin(credentials.username);
            };
        };
        checkCreds()
    }, []);
    useEffect(() => {

    }, []);
    const dispatch = useDispatch();
    const { navigation, item } = props;
    //-----------User Types---------------
    const statusType = {
        Processing: "Processing",
        Completed : "Completed",
        Delivered : "Delivered",
    }
    //-----------Handlers---------------
    const handlePushStatus = (type) => {
        
         const payload = {
            order: item.order,
            status: {
                 username: userAdmin,
                 status: type
             }
         }
         dispatch(putpurchasedProducts(payload))
         alert(`updated product`)
         dispatch(getPurchasedProductsAllUsers())
        
    }
    return (
        <TouchableOpacity
            style={item.status === 'Processing' ? styles.containerProcessing : styles.container}
        ><View>
                    <View>
                        <TouchableOpacity style={styles.buttonDetail} onPress={() => navigation.navigate("OrderDetail", item)}>
                        <Text>Details</Text>
                        </TouchableOpacity>
                        <View>
                            {item.status === 'Processing' ?
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => handlePushStatus(statusType.Processing)}>
                                    <Text style={styles.text}>Remove "Processing"</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => handlePushStatus(statusType.Processing)}>
                                    <Text style={styles.text}> Set as "Processing" </Text>
                                </TouchableOpacity>
                            }
                        </View>
                          
                        {item.status === 'Completed' ?
                            (<TouchableOpacity
                                style={styles.button}
                                onPress={() => handlePushStatus(statusType.Completed)}>
                                <Text style={styles.text}> remove "Completed" </Text>
                            </TouchableOpacity>)
                            :
                            (<TouchableOpacity
                                    style={styles.button}
                                    onPress={() => handlePushStatus(statusType.Completed)}>
                                    <Text style={styles.text}> Set as "Completed" </Text>
                                </TouchableOpacity>)
                        }
                        {item.status === 'Delivered' ?
                            (<TouchableOpacity
                                style={styles.button}
                                onPress={() => handlePushStatus(statusType.Delivered)}>
                                <Text style={styles.text}> remove "Delivered" </Text>
                            </TouchableOpacity>)
                            :
                            (<TouchableOpacity
                                    style={styles.button}
                                    onPress={() => handlePushStatus(statusType.Delivered)}>
                                    <Text style={styles.text}> Set as "Delivered" </Text>
                                </TouchableOpacity>)
                        }
                    </View>
            </View>

            <View style={styles.card}>
            <View style={styles.line}>
                    <Text style={styles.name}>order: </Text>
                    <Text style={styles.detail}>{item.order}</Text>
            </View>
            <View style={styles.line}>
                    <Text style={styles.name}>date: </Text>
                    <Text style={styles.detail}>{item.date}</Text>
            </View>
            <View style={styles.line}>
                    <Text style={styles.name}>total: </Text>
                    <Text style={styles.detail}>{item.total}</Text>
            </View>

            </View>
        </TouchableOpacity>
    );
};

const font = 11;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        margin: 5,
        borderWidth: 2,
        borderColor: "#EAEAEA",
        backgroundColor: "white",
        borderRadius: 10,
        width:'98%'
    },
    containerBanned: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        margin: 5,
        padding: 0,
        borderWidth: 2,
        borderColor: "#EAEAEA",
        backgroundColor: "grey",
        borderRadius: 10,
    },
    card: {
        justifyContent: "space-between",
        marginBottom: 5,
        marginLeft:10
    },
    line: {
        flexDirection: "row",
    },
    detail: {
        fontSize: font,
    },
    user: {
        fontSize: 20,
        color: "#4A347F",
        alignSelf: "center",
        width:'80%'
    },
    name: {
        // color: "red",
        fontSize: font,
        fontWeight:"bold"
    },
    button: {
        width:100,
        margin: 5,
        alignItems: "center",
        backgroundColor: '#C21700',
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 15,
        width:'90%'
    },
    buttonDetail: {
        width:100,
        margin: 5,
        alignItems: "center",
        backgroundColor: '#4A347F',
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 15,
        width:'90%'
    },
    text: {
        color: 'white',
        fontSize:12
    }
});


export default AllPurchaseHistoryCard;