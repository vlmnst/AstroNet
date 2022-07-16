import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import {PutPrivileges} from "../../../Redux/Slice/index";
import {PutBanned} from "../../../Redux/Slice/index";
import { getCredentials } from "../../utils/handleCredentials";
import { useDispatch} from "react-redux";
import {useState, useEffect} from "react";

const UserDetails = (props) => {
    const { route } = props;
    const data = route.params.item
    const { navigation, item } = props;
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
    //-----------User Types---------------
    const userType={
        user:"user",
        mod:"mod",
        banned:"banned",
    }
        //-----------Handlers---------------
        const handlePushPrivilege=(type)=>{
            if (type !== "banned"){
                const payload = {
                    name:data.username,
                    privileges:{
                        username:userAdmin, 
                        privilege:type
                    }
                }
                dispatch(PutPrivileges(payload))
                alert('privileges changed successfully')
            }else{
            const payload = {
                name:data.username,
                privileges:{
                    privilege:type,
                    username:userAdmin
                }
            }
                dispatch(PutBanned(payload))
                alert('user banned successfully')
            
            }
        }
        const handleReset=()=>{
            //dispatch(funcionreset()) Falta accion en reducer y ruta en el back 
        }

    return (
        <ScrollView
            style={styles.container}
        >
            <View style={styles.title}>
                <View style={styles.titlecontainer}>
                    <Text style={styles.title}>Role </Text>
                    <Text style={styles.titletext}>{data.role} </Text>
                </View>
                <View style={styles.titlecontainer}>
                    <Text style={styles.title}>Id </Text>
                    <Text style={styles.titletext}>{data.id} </Text>
                </View>
                <View style={styles.titlecontainer}>
                    <Text style={styles.title}>User name </Text>
                    <Text style={styles.titletext}>{data.username} </Text>
                </View>
            </View>
            <View style={styles.buttoncard}>
                {data.role === 'admin' ?
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() =>handlePushPrivilege(userType.user)} >
                        <Text style={styles.text}>Remove from moderator</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() =>handlePushPrivilege(userType.mod)}  >
                        <Text style={styles.text}> Set as moderator </Text>
                    </TouchableOpacity>}
                    <TouchableOpacity
                    style={styles.button}
                    onPress={() =>handlePushPrivilege(userType.user)} >
                    <Text style={styles.text}> remove ban </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("ProductCreate")} >
                    <Text style={styles.text}> Reset password </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>handlePushPrivilege(userType.banned)} >
                    <Text style={styles.text}> ban user </Text>
                </TouchableOpacity>
            </View>

            {
/* address: {streetAdress: 'asd', floor: '1', department: 'J', zipCode: '1225'}
id: "62c38418fdcb5df78c9eb8c8"
location: {country: 'argentina', city: 'buenos aires', state: 'caba'}
productsHistory: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
role: "admin" */}

            <View style={styles.card}>
                <View style={styles.line}>
                    <Text style={styles.name}>firstname: </Text>
                    <Text style={styles.detail}> {data.firstname}</Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.name}>lastname: </Text>
                    <Text style={styles.detail}>{data.lastname}</Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.name}>email: </Text>
                    <Text style={styles.detail}>{data.email}</Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.name}>dni: </Text>
                    <Text style={styles.detail}>{data.dni}</Text>
                </View>

                <View style={styles.line}>
                    <Text style={styles.name}>birthday: </Text>
                    <Text style={styles.detail}>{data.birthday}</Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.name}>phone: </Text>
                    <Text style={styles.detail}>{data.phone}</Text>
                </View >
            </View>
            <View>
                {data.location ? Object.entries(data.location).map((p,index) => {
                    return(
                    <View style={styles.line} key={index}>
                    <Text style={styles.name} key={p[0]}>{p[0]}: </Text>
                    <Text style={styles.detail} key={p[1]}>{p[1]}</Text>
                    </View >
                    )
                })
                    : <Text style={styles.name}> "no location"</Text>}
            </View>
            <View>
                {data.address ? Object.entries(data.address).map((p,index) => {
                    return(
                    <View style={styles.line} key={index}>
                    <Text style={styles.name} key={p[0]}>{p[0]}: </Text>
                    <Text style={styles.detail} key={p[1]}>{p[1]}</Text>
                    </View >
                    )
                })
                    : <Text style={styles.name}> "no address"</Text>}
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        width: "100%",

    },
    line: {
        flexDirection: "row",
        borderWidth: 2,
        borderColor: "#EAEAEA",
        margin: 5,
    },
    detail: {
        fontSize: 20,
    },
    user: {
        fontSize: 20,
        color: "green",
        alignSelf: "center",
    },
    name: {
        color: "red",
        fontSize: 20,
        alignSelf: 'flex-start',
    },
    button: {
        width: 170,
        margin: 5,
        alignItems: "center",
        backgroundColor: '#686868',
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 15,
    },
    text: {
        color: 'white',
        margin: 5,
    },
    title: {
        padding: 5,
        backgroundColor: '#3E3E3E',
        fontSize: 20,
        color: "green",
        alignItems: 'stretch',
        width: '100%',
    },
    titletext: {
        paddingRight: 10,
        color: 'white',
        padding: 5,
        fontSize: 20,
        marginLeft: 30,
    },
    titlecontainer: {
        backgroundColor: "grey",
    },
    buttoncard: {
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#EAEAEA",
        backgroundColor: "white",
        borderRadius: 10,
    },
});

export default UserDetails;