import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from "react-native";
import PutPrivileges from "../../../Redux/Slice/index";
import {PutBanned} from "../../../Redux/Slice/index";
import { getCredentials } from "../../utils/handleCredentials";
import { useDispatch} from "react-redux";
import {useState, useEffect} from "react";

const UserCard = (props) => {
    const [userAdmin, setUserAdmin] = useState();
    //-----------Mount Credentials---------------
    useEffect(() => {
        const checkCreds= async()=>{
            const credentials = await getCredentials();
            if (credentials) {
                setUserAdmin(credentials.username);
            };
        };
        checkCreds()
    }, []);
    const dispatch = useDispatch();
    const { navigation, item } = props;
    //-----------User Types---------------
    const userType={
        user:"user",
        mod:"mod",
        banned:"banned",
    }
    //-----------Handlers---------------
    const handlePushPrivilege=(type)=>{
        if (type !== "banned"){
        const payload = {username:userAdmin, privilege:type}
        dispatch(PutPrivileges(item.username,payload))
    }else{
        const payload = {name:item.username, username:userAdmin, privilege:type}
        dispatch(PutBanned(payload))
    }
        
    }
    const handleReset=()=>{
        //dispatch(funcionreset()) Falta accion en reducer y ruta en el back 
    }
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate("Details", {"item":item})}
        ><View>
                <TouchableOpacity
                        style={styles.buttonDetail}
                        onPress={() => navigation.navigate("Details", {"item":item})} >
                        <Text style={styles.text}>Details</Text>
                </TouchableOpacity>
                {item.role === 'admin' ?
                <TouchableOpacity
                style={styles.button}
                onPress={() =>handlePushPrivilege(userType.user)} >
                <Text style={styles.text}>Remove from admins</Text>
            </TouchableOpacity>
            :
                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>handlePushPrivilege(userType.mod)} >
                    <Text style={styles.text}> Set as moderator </Text>
                </TouchableOpacity>}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>handleReset()} >
                    <Text style={styles.text}> Reset password </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>handlePushPrivilege(userType.banned)} >
                    <Text style={styles.text}> ban user </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <View style={styles.line}>
                    <Text style={styles.user}>{item.username} {item.role}</Text>
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
        flex: 1,
        alignItems: "center",
        margin: 5,
        padding: 0,
        borderWidth: 2,
        borderColor: "#EAEAEA",
        backgroundColor: "white",
        borderRadius: 10,
    },
    card: {
        justifyContent: "space-between",
        marginBottom: 5,
    },
    line: {
        flexDirection: "row",
    },
    detail: {
        fontSize: font,
    },
    user: {
        fontSize: 20,
        color: "green",
        alignSelf:"center",
    },
    name: {
        color: "red",
        fontSize: font,
    },
    button: {
        margin: 5,
        alignItems: "center",
        backgroundColor: '#686868',
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 15
    },
    buttonDetail: {
        margin: 5,
        alignItems: "center",
        backgroundColor: 'green',
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 15
    },
    text: {
        color: 'white'
    }
});

export default UserCard;