import React, {useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView,Modal, Button,TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { getUserFullData,getPurchaseOrders } from "../../Redux/Slice/userSlice";
import FeatherIcon from 'react-native-vector-icons/Feather';
import Loader from "./Loader";
import axios from 'axios';

const UserProfile = ({ navigation }) => {

    const dispatch = useDispatch()
    const data = useSelector((state) => state.USER.userFullData)
    const email = useSelector((state) => state.USER.email)
    const userName = useSelector((state) => state.USER.userName)
    const [modalOpenAdres, setModalOpenAdres] = useState(false);
    const [modalOpenUserData, setModalOpenUserData] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm({
		defaultValues: {
        username: '',
        email: '',
        password: '',
        dni: "",
        firstname: '',
        lastname: '',
        birthday: '',
        phone: '',
        country:"" ,
        city:"" ,
        state:"",
        streetAdress:"",
        floor:"",
        department:"",
        zipCode:"" 
		}
    })

    useEffect(()=>{  
        dispatch(getPurchaseOrders(userName));
        dispatch(getUserFullData(email))
    },[dispatch,email])

    function handleCancelation() {
        setModalOpenAdres(false);
        setModalOpenUserData(false);
    };
    function handleModalAdress() {
        setModalOpenAdres(true);
    };
    function handleModalUserData() {
        setModalOpenUserData(true);
    };
    const onSubmit = async(info) => {
		try {
			const user = {
			email: info.email?info.email:data[0]?.email,
			dni: info.dni?info.dni:data[0]?.dni,
			firstname: info.firstname?info.firstname:data[0]?.firstname,
			lastname: info.lastname?info.lastname:data[0]?.lastname,
			birthday: info.birthday?info.birthday:data[0]?.birthday,
			phone: info.phone?info.phone:data[0]?.phone,
			location: {"country":info.country?info.country:data[0]?.location?.country,"city":info.city?info.city:data[0]?.location?.city,"state":info.state?info.state:data[0]?.location?.state},
			address: {"streetAdress":info.streetAdress?info.streetAdress:data[0]?.address?.streetAdress , "floor":info.floor?info.floor:data[0]?.address?.floor , "department":info.department?info.department:data[0]?.address?.department , "zipCode":info.zipCode?info.zipCode:data[0]?.address?.zipCode }
			}
            await axios.put("https://proyectofinal-api-777.herokuapp.com"+"/users/update/"+userName, user);
			alert("user created successfully !")
			navigation.navigate('Profile')
		} catch (error) {
			alert(!error )
		}
    };
    const algo=true;

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
                            {/* //////////////////////////////////////////// */}
                            <View style={styles.view2_}>
                                <View style={styles.view2_1_}>
                                    <TouchableOpacity style={styles.ordersandreviewsbtns} onPress={()=>handleModalUserData()}>
                                        <Text style={{color:'white', fontSize:20, fontWeight:"bold"}}>Edit my user data</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Modal transparent visible={modalOpenUserData} >
                                        <View style={styles.modalBackground}>
                                        <View style={styles.containerRow2}>
                                            <View style={styles.containerLabelColumn}>
                                                <Text style={styles.TitleText}>Email:</Text>  
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <TextInput
                                                            style={styles.input}
                                                            onBlur={onBlur}
                                                            onChangeText={onChange}
                                                            value={value}
                                                            placeholder={data[0]?.email}
                                                            />
                                                            )}
                                                    name="email"
                                                />
                                            </View>
                                            <View style={styles.containerLabelColumn}>
                                                <Text style={styles.TitleText}>Dni:</Text>  
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <TextInput
                                                            style={styles.input}
                                                            onBlur={onBlur}
                                                            onChangeText={onChange}
                                                            value={value}
                                                            placeholder={data[0]?.dni.toString()}
                                                        />
                                                    )}
                                                    name="dni"
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.containerRow2}>
                                            <View style={styles.containerLabelColumn}>
                                                <Text style={styles.TitleText}>Firstname:</Text>            
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <TextInput
                                                            style={styles.input}
                                                            onBlur={onBlur}
                                                            onChangeText={onChange}
                                                            value={value}
                                                            placeholder={data[0]?.firstname}
                                                        />
                                                    )}
                                                    name="firstname"
                                                />
                                            </View>
                                            <View style={styles.containerLabelColumn}>
                                                <Text style={styles.TitleText}>Lastname:</Text>  
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <TextInput
                                                            style={styles.input}
                                                            onBlur={onBlur}
                                                            onChangeText={onChange}
                                                            value={value}
                                                            placeholder={data[0]?.lastname}
                                                        />
                                                    )}
                                                    name="lastname"
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.containerRow2}>
                                            <View style={styles.containerLabelColumn}>
                                                <Text style={styles.TitleText}>Birthday:</Text>  
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <TextInput
                                                            style={styles.input}
                                                            onBlur={onBlur}
                                                            onChangeText={onChange}
                                                            value={value}
                                                            placeholder={data[0]?.birthday}
                                                        />
                                                    )}
                                                    name="birthday"
                                                />
                                            </View>
                                            <View style={styles.containerLabelColumn}>
                                                <Text style={styles.TitleText}>Phone:</Text>  
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <TextInput
                                                            style={styles.input}
                                                            onBlur={onBlur}
                                                            onChangeText={onChange}
                                                            value={value}
                                                            placeholder={data[0]?.phone}
                                                        />
                                                    )}
                                                    name="phone"
                                                />
                                            </View>
                                        </View>
                                                    <View style={styles.view2}>
                                                        <View style={styles.view2_1}>
                                                            <TouchableOpacity style={styles.ordersandreviewsbtns} onPress={handleSubmit(onSubmit)}>
                                                                <Text style={{color:'white', fontSize:20, fontWeight:"bold"}}>Save</Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity style={styles.ordersandreviewsbtns} onPress={()=>handleCancelation()}>
                                                                <Text style={{color:'white', fontSize:20, fontWeight:"bold"}}>Cancel</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                            </View> 
                                    </Modal>
                            </View>
                            {/* //////////////////////////////////////////////////////// */}
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
                                <Text style={styles.texttag}>State: </Text>
                                <Text style={styles.text}>{data[0]?.location.state}</Text>
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
                            <View style={styles.view2_}>
                                <View style={styles.view2_1_}>
                                    <TouchableOpacity style={styles.ordersandreviewsbtns} onPress={()=>handleModalAdress()}>
                                        <Text style={{color:'white', fontSize:20, fontWeight:"bold"}}>Edit Address</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                                    <Modal transparent visible={modalOpenAdres} >
                                        <View style={styles.modalBackground}>
                                        <View style={styles.containerRow2}>
                                            <View style={styles.containerLabelColumn}>
                                                <Text style={styles.TitleText}>Country:</Text>  
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <TextInput
                                                            style={styles.input}
                                                            onBlur={onBlur}
                                                            onChangeText={onChange}
                                                            value={value}
                                                            placeholder={data[0]?.location.country}
                                                        />
                                                    )}
                                                    name="country"
                                                />
                                            </View>
                                            <View style={styles.containerLabelColumn}>
                                                <Text style={styles.TitleText}>City:</Text>  
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <TextInput
                                                            style={styles.input}
                                                            onBlur={onBlur}
                                                            onChangeText={onChange}
                                                            value={value}
                                                            placeholder={data[0]?.location.city}
                                                        />
                                                    )}
                                                    name="city"
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.containerRow2}>
                                            <View style={styles.containerLabelColumn}>
                                                <Text style={styles.TitleText}>State:</Text>  
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <TextInput
                                                            style={styles.input}
                                                            onBlur={onBlur}
                                                            onChangeText={onChange}
                                                            value={value}
                                                            placeholder={data[0]?.location.state}
                                                        />
                                                    )}
                                                    name="state"
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.containerRow2}>
                                            <View style={styles.containerLabelColumn}>
                                                <Text style={styles.TitleText}>Street:</Text>  
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <TextInput
                                                            style={styles.input}
                                                            onBlur={onBlur}
                                                            onChangeText={onChange}
                                                            value={value}
                                                            placeholder={data[0]?.address.streetAdress}
                                                        />
                                                    )}
                                                    name="streetAdress"
                                                />
                                            </View>
                                            <View style={styles.containerLabelColumn}>
                                                <Text style={styles.TitleText}>floor:</Text>  
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <TextInput
                                                            style={styles.input}
                                                            onBlur={onBlur}
                                                            onChangeText={onChange}
                                                            value={value}
                                                            placeholder={data[0]?.address.floor}
                                                        />
                                                    )}
                                                    name="floor"
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.containerRow2}>
                                            <View style={styles.containerLabelColumn}>
                                                <Text style={styles.TitleText}>Department:</Text>  
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <TextInput
                                                            style={styles.input}
                                                            onBlur={onBlur}
                                                            onChangeText={onChange}
                                                            value={value}
                                                            placeholder={data[0]?.address.department}
                                                        />
                                                    )}
                                                    name="department"
                                                />
                                            </View>
                                            <View style={styles.containerLabelColumn}>
                                                <Text style={styles.TitleText}>Zip code:</Text>  
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <TextInput
                                                            style={styles.input}
                                                            onBlur={onBlur}
                                                            onChangeText={onChange}
                                                            value={value}
                                                            placeholder={data[0]?.address.zipCode}
                                                        />
                                                    )}
                                                    name="zipCode"
                                                />
                                            </View>
                                            </View>
                                        {/* ///////////////////////////////////////////////////////////// */}
                                                    <View style={styles.view2}>
                                                    <View style={styles.modalbtnscontainer}>
                                                        <TouchableOpacity style={styles.modalbtnssave} onPress={handleSubmit(onSubmit)}>
                                                            <Text style={{color:'white', fontSize:20, fontWeight:"bold"}}>Save</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={styles.modalbtnscancel} onPress={()=>handleCancelation()}>
                                                            <Text style={{color:'white', fontSize:20, fontWeight:"bold"}}>Cancel</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    </View>
                                            </View> 
                                    </Modal>
                            </View>
                        <View style={styles.view2}>
                            <Text style={styles.text1}>Orders:</Text>
                            <View style={styles.view2_1}>
                                <TouchableOpacity style={styles.ordersandreviewsbtns1} onPress={()=>navigation.navigate("PurchaseHistory", {navigation})}>
                                    <Text style={{color:'white', fontSize:20, fontWeight:"bold"}}>View</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.text1}>Reviews:</Text>
                            <View style={styles.view2_1}>
                                <TouchableOpacity style={styles.ordersandreviewsbtns1} onPress={()=>navigation.navigate("DoReview", {navigation})}>
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
        height:'120%',
        // minHeight:'88%',
        // maxHeight:'150%',
        marginHorizontal: 25
    },
    view2: {
        height:'15%',
    },
    view2_1: {
        height: 70,
        width:'100%',
        justifyContent:"flex-start",
        alignItems:"center"
    },
    view2_: {
        height:50,
        marginTop:15
    },
    view2_1_: {
        height: '100%',
        justifyContent:"flex-start",
        alignItems:"center"
        // marginVertical: 15
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
        height: '100%',
        backgroundColor: '#B50000',
        borderRadius: 15,
        alignItems:"center",
        justifyContent:"center"
    },
    ordersandreviewsbtns1: {
        width:'60%',
        height: '100%',
        backgroundColor: '#4A347F',
        borderRadius: 15,
        alignItems:"center",
        justifyContent:"center"
    },
    modalBackground: {
        flex: 1,
        width: '100%',
        height: '25%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '100%',
        height: '10%',
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 20,
        elevation: 20,
    },
	container:{
		// justifyContent: 'center',
		alignItems: "center",
		width:'100%',
		// height:'88%'
		
	},
	input: {
		borderWidth: 1,
		borderRadius: 8,
		borderColor: "#A09E9E",
		backgroundColor: '#FFFFFF',
		marginTop: 0,
		marginHorizontal: 10,
		padding: 5,
		width: '100%'
	},
	// inputmul: { backgroundColor: '#FFFFFF', marginTop: 10, marginHorizontal: 10, padding: 5, height: 100, width: '100%' },
	containerRow2: {
		flexDirection:"row",
		justifyContent:"center",
		alignItems:"center",
		marginVertical:15,
		width:'90%'
	},
	containerLabelColumn: {
		flexDirection: "column",
		width:'50%',
		justifyContent:"center",
		alignItems:"center",
		margin:10
	},
	TitleText: {
		textAlign:"center",
		fontSize:15,
		width: '60%',
		marginVertical: 5,
        color:'white',
	},
	ContainerLocationAndAdress: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		width:'90%'
	},
	ErrorText: {
		textAlign:"center",
		fontSize:18,
		backgroundColor:"red",
		width: '150px',
		borderRadius: 30,
		paddingLeft:10,
		paddingRight:10,
		marginLeft:15,
		marginRight:15
	},
	Bottunn_: {
		backgroundColor:"#ccc",
		padding: 10,
		borderRadius: 12,
		marginBottom:'25%'
	},
	separator: { marginVertical: 15, borderBottomColor: '#737373', borderBottomWidth: StyleSheet.hairlineWidth },
    modalbtnscontainer: {
        width:'60%',
        height:50,
        flexDirection:"row",
        marginTop:35
    },
    modalbtnscancel: {
        marginHorizontal:10,
        backgroundColor:'#B50000',
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        width:'60%'
    },
    modalbtnssave: {
        marginHorizontal:10,
        backgroundColor:'#4A347F',
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        width:'60%'
    }
});

export default UserProfile;