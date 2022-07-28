import React from "react";
import { useDispatch} from "react-redux";
import { Text, View, TextInput, StyleSheet, TouchableOpacity, ScrollView  } from "react-native";
import { useForm, Controller } from "react-hook-form";
// import { ROUTE }  from '@env';
// const ROUTE = "https://proyectofinal-api-777.herokuapp.com";
const ROUTE = "http://192.168.0.16:3001";
import axios from 'axios';
import FeatherIcon from 'react-native-vector-icons/Feather';

const UserCreate = ({ navigation, route }) => {

	const email  = route.params

	
	const { control, handleSubmit, formState: { errors } } = useForm({
		defaultValues: {
        username: '',
        email: '',
        password: '',
        dni: 0,
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
	});

    const onSubmit = async(data) => {

		if (!data.birthday.match(/^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/)) {
			return alert('bad birthday');
		} 

		if (!data.dni.match(/^[0-9]+([.][0-9]+)?$/)) {
			return alert('bad dni');
		}

		if (!data.phone.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/))  {
			return alert('bad phone');
		} 

		try {
			const user = {
			username: data.username,
			email: data.email,
			password: data.password,
			dni: data.dni,
			firstname: data.firstname,
			lastname: data.lastname,
			birthday: data.birthday,
			phone: data.phone,
			location: {"country":data.country,"city":data.city,"state":data.state},
			address: {"streetAdress":data.streetAdress , "floor":data.floor , "department":data.department , "zipCode":data.zipCode }
			}
			const res = await axios.post(ROUTE +"/users/register", user);
			alert("user created successfully !")
			navigation.navigate('Login')
		} catch (error) {
			alert(!error.response.data.error?error.response.data:error.response.data.error )
		}
    };

    const Separator = () => (
        <View style={styles.separator} />
    );

    return(
		<View style={{minHeight:'100%'}}>
			<View style={styles.SBcontainer}>
				<View style={styles.SB}>
					<FeatherIcon style={styles.iconMenu} name="menu" size={36} onPress={() => navigation.openDrawer()}/>
					<Text style={{fontSize:25, color:'white', fontWeight:'bold'}}>Create Your Account</Text>
				</View>
			</View>
			<ScrollView contentContainerStyle={styles.container}>
				{/* <Text style={styles.Title}>Create Your Account</Text> */}
				<View style={styles.containerRow2}>
					<View style={styles.containerLabelColumn}>
						<Text style={styles.TitleText}>Username:</Text>
						<Controller
							control={control}
							rules={{
							required: true,
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={styles.input}
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
								/>
							)}
							name="username"
						/>
						{errors.username && <Text style={styles.ErrorText}>Insert username</Text>}
					</View>
					<View style={styles.containerLabelColumn}>
						<Text style={styles.TitleText}>Password:</Text>  
						<Controller
							control={control}
							rules={{
								required: true,
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={styles.input}
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									secureTextEntry={true}
								/>
							)}
							name="password"
						/>
						{errors.password && <Text style={styles.ErrorText}>Insert password</Text>}
					</View>
				</View>
				<View style={styles.containerRow2}>
					<View style={styles.containerLabelColumn}>
						<Text style={styles.TitleText}>Email:</Text>  
						{
						email ? 
						(<Controller
							control={control}
							rules={{
								required: true,
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={styles.input}
									onBlur={onBlur}
									onChangeText={onChange}
									value={email}
									/>
									)}
							name="email"
						/>) 
						: 
						(
							<Controller
							control={control}
							rules={{
								required: true,
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={styles.input}
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									/>
									)}
							name="email"
						/>
						)
						}
						
						{errors.email && <Text style={styles.ErrorText}>Insert email </Text>}
					</View>
					<View style={styles.containerLabelColumn}>
						<Text style={styles.TitleText}>Dni:</Text>  
						<Controller
							control={control}
							rules={{
								required: true,
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={styles.input}
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
								/>
							)}
							name="dni"
						/>
						{errors.dni && <Text style={styles.ErrorText}>Insert Dni</Text>}
					</View>
				</View>
				<View style={styles.containerRow2}>
					<View style={styles.containerLabelColumn}>
						<Text style={styles.TitleText}>Firstname:</Text>            
						<Controller
							control={control}
							rules={{
								required: true,
								min: 1,
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={styles.input}
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
								/>
							)}
							name="firstname"
						/>
						{errors.firstname && <Text style={styles.ErrorText}>Insert Firstname</Text>}
					</View>
					<View style={styles.containerLabelColumn}>
						<Text style={styles.TitleText}>Lastname:</Text>  
						<Controller
							control={control}
							rules={{
								required: true,
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={styles.input}
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
								/>
							)}
							name="lastname"
						/>
						{errors.lastname && <Text style={styles.ErrorText}>Insert lastname</Text>}
					</View>
				</View>
				<View style={styles.containerRow2}>
					<View style={styles.containerLabelColumn}>
						<Text style={styles.TitleText}>Birthday:</Text>  
						<Controller
							control={control}
							rules={{
								required: true,
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={styles.input}
									type={'date'}
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									placeholder={'dd/mm/yyyy'}
								/>
							)}
							name="birthday"
						/>
						{errors.birthday && <Text style={styles.ErrorText}>Insert Birthday</Text>}
					</View>
					<View style={styles.containerLabelColumn}>
						<Text style={styles.TitleText}>Phone:</Text>  
						<Controller
							control={control}
							rules={{
								required: true,
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={styles.input}
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
								/>
							)}
							name="phone"
						/>
						{errors.phone && <Text style={styles.ErrorText}>Insert Phone</Text>}
					</View>
				</View>
				<Text style={styles.TitleAdressLocation}>Location</Text>
				<View style={styles.ContainerLocationAndAdress}>
					<View style={styles.containerRow2}>
						<View style={styles.containerLabelColumn}>
							<Text style={styles.TitleText}>Country:</Text>  
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										style={styles.input}
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
									/>
								)}
								name="country"
							/>
							{errors.country && <Text style={styles.ErrorText}>Insert Country</Text>}
						</View>
						<View style={styles.containerLabelColumn}>
							<Text style={styles.TitleText}>City:</Text>  
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										style={styles.input}
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
									/>
								)}
								name="city"
							/>
							{errors.city && <Text style={styles.ErrorText}>Insert city</Text>}
						</View>
					</View>
					<View style={styles.containerRow2}>
						<View style={styles.containerLabelColumn}>
							<Text style={styles.TitleText}>State:</Text>  
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										style={styles.input}
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
									/>
								)}
								name="state"
							/>
							{errors.state && <Text style={styles.ErrorText}>Insert state</Text>}
						</View>
					</View>
				</View>
				<Text style={styles.TitleAdressLocation}>Address</Text>
				<View style={styles.ContainerLocationAndAdress}>
					<View style={styles.containerRow2}>
						<View style={styles.containerLabelColumn}>
							<Text style={styles.TitleText}>Street:</Text>  
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										style={styles.input}
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
									/>
								)}
								name="streetAdress"
							/>
							{errors.streetAdress && <Text style={styles.ErrorText}>Insert street address</Text>}
						</View>
						<View style={styles.containerLabelColumn}>
							<Text style={styles.TitleText}>floor:</Text>  
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										style={styles.input}
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
									/>
								)}
								name="floor"
							/>
							{errors.floor && <Text style={styles.ErrorText}>Insert floor</Text>}
						</View>
					</View>
					<View style={styles.containerRow2}>
						<View style={styles.containerLabelColumn}>
							<Text style={styles.TitleText}>Department:</Text>  
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										style={styles.input}
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
									/>
								)}
								name="department"
							/>
							{errors.department && <Text style={styles.ErrorText}>Insert department</Text>}
						</View>
						<View style={styles.containerLabelColumn}>
							<Text style={styles.TitleText}>Zip code:</Text>  
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										style={styles.input}
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
									/>
								)}
								name="zipCode"
							/>
							{errors.zipCode && <Text style={styles.ErrorText}>Insert Zip code</Text>} 
						</View>
					</View>
				</View>
				<TouchableOpacity style={styles.Bottunn_} onPress={handleSubmit(onSubmit)}>
					<Text>Register</Text>
				</TouchableOpacity>
				<Separator style={styles.separator} />
				{/* <Button style={styles.Bottunn_} title="Register" onPress={handleSubmit(onSubmit)} /> */}
			</ScrollView>
		</View>
    ); 
};


const styles = StyleSheet.create({
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
	container:{
		// justifyContent: 'center',
		alignItems: "center",
		width:'100%',
		// height:'88%'
		
	},
	Title: {
		fontSize:29,
		marginTop: 30,
		fontStyle:"italic",
		fontWeight:"bold"
	},
	TitleAdressLocation: {
		fontSize:22,
		marginTop:15,
		fontStyle:"italic"
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
		marginVertical: 5
	},
	ContainerLocationAndAdress: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		width:'90%'
	},
	ErrorText: {
		textAlign:"center",
		fontSize:14,
		color: 'red',
		// backgroundColor:"red",
		width: 150,
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
});

export default UserCreate;