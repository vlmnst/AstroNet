import React, { useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
// import { ROUTE } from "@env";
const ROUTE = "http://192.168.253.163:3001";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setUserData } from "../../Redux/Slice/userSlice";
import * as Google from "expo-auth-session/providers/google";
import * as Web from "expo-web-browser";
import CustomButton from "./CustomButton";

Web.maybeCompleteAuthSession();

const Login = ({ navigation }) => {

  // ---------- LOGIN WITH GOOGLE ----------
  // google states
  const [accessToken, setAccessToken] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "249536522363-39rfcrblktar14u0n6eo9bjrcgj4to67.apps.googleusercontent.com",
    androidClientId:
      "249536522363-69m8roucbhests6sk69l3msirfjm9lhf.apps.googleusercontent.com",
    webClientId:
      "249536522363-2bvea9vfafhkscv8fs8vrbbe0fei9e5i.apps.googleusercontent.com",
  });

  async function getUserInfo() {
    let response = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const userInfo = await response.json();
    responseToLogin(userInfo.email);
  };

  useEffect(() => {
    //checkeamos si la respuesta 'success'
    if (response?.type === "success") {
      const { authentication } = response;
      setAccessToken(authentication.accessToken);
      accessToken && getUserInfo();
    }
  }, [response, accessToken]);

  // respuesta para saber si está registrado
  const responseToLogin = async (email) => {

    //ruta para indtificar el user y traer la data
    let res = await axios.post(ROUTE + "/users/getByEmail/" + email);
    const { status, message, data } = res.data;
    
    if (!status) { navigation.navigate("Create User") };

    if (status) {
      dispatch(setUserData(data));
      AsyncStorage.setItem("storageCredentials", JSON.stringify(data)).catch(
        () => console.log("error while persistLogin at Login.jsx")
      );
      navigation.navigate("Home");
    };
  };
  // ---------- END LOGIN WITH GOOGLE ----------

  // local states
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  // create account
  const handleCreate = () => {
    navigation.navigate("UserCreate");
  };
  
  // check credentials
  const onSubmit = async() => {

    if (username.length < 1 || password.length < 1) return alert ('enter username and password');

    const credentials = { username, password };

    // checkeo si ya está logueado
    const signedUp = await AsyncStorage.getItem("storageCredentials");

    if (signedUp !== null) {
      alert("Already signed in");
    } else {
      try {
        let res = await axios.post(ROUTE + "/login", credentials);
        const { status, message, data } = res.data; // data contiene el user y su token
        alert(status + " " + message);
        setMessage("");
        dispatch(setUserData(data));
        AsyncStorage.setItem("storageCredentials", JSON.stringify(data)).catch(
          () => console.log("error while persistLogin at Login.jsx")
        );
        setUsername('');
        setPassword('');
        navigation.navigate("Home"); // agregar props??
      } catch (e) {
        setMessage(e.response.data.status + " " + e.response.data.message);
      }
    }
  };

  return (
    <View style={styles.container}>

        {/* TITLE BAR */}
        <View style={styles.SBcontainer}>
            <View style={styles.SB}>
                <FeatherIcon style={styles.iconMenu} name="menu" size={36} onPress={() => navigation.openDrawer()}/>
                <Text style={{fontSize:28, color:'white', fontWeight:'bold'}}>Log In</Text>
            </View>
        </View>

        {/* USERNAME */}
        <View style={styles.inputsContainers}>
          <TextInput transparent
            style={styles.inputs}
            onChangeText={setUsername}
            value={username}
            placeholder="Username"
          />
        </View>

        {/* PASSWORD */}
        <View style={styles.inputsContainers}>
          <TextInput transparent
            style={styles.inputs}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>

        {/* WRONG CREDENTIALS */}
        {<Text style={styles.error}>{message}</Text>}

        <Button title="Sign in" onPress={() => onSubmit()} />

        {/* LOGIN WITH GOOGLE */}
        <CustomButton
          text="Sign in with Google"
          bgColor="#FAE9EA"
          fgColor="#DD4D44"
          onPress={() => { promptAsync() }}
        />

        {/* CREATE ACCOUNT */}
        <View style={styles.view}>
          <Icon name="logo-google" size={30} color="#641E16" /> 
          <CustomButton 
          text='Dont have an account? Create one' 
          onPress={() => handleCreate()}
          type='TERTIARY'
          />
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  SBcontainer: {
    height:'12%',
    backgroundColor:'#4A347F',
    width:'100%',
  },
  container: {
    flex: 1,
    minHeight:'100%',
    // justifyContent: "center",
    alignItems: 'center',
    marginHorizontal: 16,
    // backgroundColor: "#5E5E5E",
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
  inputsContainers: {
    width: '50%',
    marginTop: 20,
  },
  inputs: { 
    padding: 10, 
    fontSize: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
  },
  error: { 
    color: "red" ,
    fontSize: 15,
    marginVertical: 5,
  },
  view:{
    flexDirection:"row"
  }
});

export default Login;
