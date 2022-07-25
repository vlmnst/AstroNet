import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from "react-native";
import { PutBanned, getAllUsers, PutPrivileges } from "../../../Redux/Slice/index";
import { getCredentials } from "../../utils/handleCredentials";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

const UserCard = (props) => {
    const [userAdmin, setUserAdmin] = useState();
    const [userRol, setUserRol] = useState();
    //-----------Mount Credentials---------------
    useEffect(() => {
        const checkCreds = async () => {
            const credentials = await getCredentials();
            if (credentials) {
                setUserAdmin(credentials.username);
                setUserRol(credentials.role);
            };
        };
        checkCreds()
    }, []);
    useEffect(() => {

    }, []);
    const dispatch = useDispatch();
    const { navigation, item } = props;
    //-----------User Types---------------
    const userType = {
        user: "user",
        mod: "mod",
        banned: "banned",
    }
    //-----------Handlers---------------
    const handlePushPrivilege = async(type) => {
        if (type !== "banned") {
            const payload = {
                name: item.username,
                privileges: {
                    username: userAdmin,
                    privilege: type
                }
            }
            await dispatch(PutPrivileges(payload))
            alert('privileges changed successfully')
            dispatch(getAllUsers())
        } else {
            const payload = {
                name: item.username,
                privileges: {
                    privilege: type,
                    username: userAdmin
                }
            }
            await dispatch(PutBanned(payload))
            alert('user banned successfully')
            dispatch(getAllUsers())

        }
    }
    const handleReset = () => {
        //dispatch(funcionreset()) Falta accion en reducer y ruta en el back 
    }
    return (
        <TouchableOpacity
            style={item.role === 'banned' ? styles.containerBanned : styles.container}
            onPress={item.role === 'admin' ? null : () => navigation.navigate("Details", { "item": item })}
        ><View>
                {item.role === 'admin' ? <View style={styles.buttonDetail}><Text style={styles.text}>Admin</Text></View> :
                    <View>
                        <TouchableOpacity
                            style={styles.buttonDetail}
                            onPress={() => navigation.navigate("Details", { "item": item })}>
                            <Text style={styles.text}>Details</Text>
                        </TouchableOpacity>
                        {userRol === 'admin' ?
                            <View>
                                {item.role === 'mod' ?
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => handlePushPrivilege(userType.user)}>
                                        <Text style={styles.text}>Remove moderator</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => handlePushPrivilege(userType.mod)}>
                                        <Text style={styles.text}> Set as moderator </Text>
                                    </TouchableOpacity>
                                }
                            </View>
                            : null
                        }
                        {item.role === 'banned' ?
                            (<TouchableOpacity
                                style={styles.button}
                                onPress={() => handlePushPrivilege(userType.user)}>
                                <Text style={styles.text}> remove ban </Text>
                            </TouchableOpacity>)
                            :
                            (userRol === "mod" && item.role=== "mod" ? (null) : (
                                (<TouchableOpacity
                                    style={styles.button}
                                    onPress={() => handlePushPrivilege(userType.banned)}>
                                    <Text style={styles.text}> ban user </Text>
                                </TouchableOpacity>)
                            ))
                        }
                        {/* <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleReset()}>
                            <Text style={styles.text}> Reset password </Text>
                        </TouchableOpacity> */}

                    </View>
                }
            </View>

            <View style={styles.card}>
                <View style={styles.line}>
                    <Text style={styles.user}>{item.role}</Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.user}>{item.username}</Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.name}>firstname: </Text>
                    <Text style={styles.detail}> {item.firstname}</Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.name}>lastname: </Text>
                    <Text style={styles.detail}>{item.lastname}</Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.name}>email: </Text>
                    <Text style={styles.detail}>{item.email}</Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.name}>dni: </Text>
                    <Text style={styles.detail}>{item.dni}</Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.name}>birthday: </Text>
                    <Text style={styles.detail}>{item.birthday}</Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.name}>phone: </Text>
                    <Text style={styles.detail}>{item.phone}</Text>
                </View >
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

export default UserCard;