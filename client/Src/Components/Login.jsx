import React, { useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { ROUTE } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setUserData } from "../../Redux/Slice/userSlice";
import * as Google from "expo-auth-session/providers/google";
import * as Web from "expo-web-browser";
import GoogleButton from "react-google-button";
import CustomButton from "./CustomButton";

Web.maybeCompleteAuthSession();

const Login = ({ navigation }) => {
  // const URL = 'http://localhost:3001/login';
  //ESTADOS PARA LOGIN DE GOOGLE -------------
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
  }

  useEffect(() => {
    //checkeamos si la respuesta 'success'
    if (response?.type === "success") {
      const { authentication } = response;
      setAccessToken(authentication.accessToken);
      accessToken && getUserInfo();
    }
  }, [response, accessToken]);

  // RESPUESTA PARA SABER SI ESTA REGISTRADO O NO
  const responseToLogin = async (email) => {
    //ruta para indtificar el user y traer la data
    let res = await axios.post(ROUTE + "/users/getByEmail/" + email);
    const { status, message, data } = res.data;
    if (!status) {
      navigation.navigate("Create User");
    }
    if (status) {
      dispatch(setUserData(data));
      // console.log(data)
      AsyncStorage.setItem("storageCredentials", JSON.stringify(data)).catch(
        () => console.log("error while persistLogin at Login.jsx")
      );
      navigation.navigate("Home");
    }
  };

  const [message, setMessage] = useState("");

  const handleCreate = () => {
    navigation.navigate("UserCreate");
  };
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const credentials = {
      username: data.username,
      password: data.password,
    };

    const signedUp = await AsyncStorage.getItem("storageCredentials");

    if (signedUp !== null) {
      alert("Already signed in");
    } else {
      try {
        let res = await axios.post(ROUTE + "/login", credentials);
        const { status, message, data } = res.data; // data contiene el user y su token
        alert(status + " " + message);
        setMessage("");
        // console.log(data)
        // const { username, role } = data;
        dispatch(setUserData(data));
        AsyncStorage.setItem("storageCredentials", JSON.stringify(data)).catch(
          () => console.log("error while persistLogin at Login.jsx")
        );
        navigation.navigate("Home"); // agregar props??
      } catch (e) {
        setMessage(e.response.data.status + " " + e.response.data.message);
      }
    }
  };

  return (
    <View style={{minHeight:'100%'}}>
        {/* USERNAME */}
        <View style={styles.SBcontainer}>
            <View style={styles.SB}>
                <FeatherIcon style={styles.iconMenu} name="menu" size={36} onPress={() => navigation.openDrawer()}/>
                <Text style={{fontSize:28, color:'white', fontWeight:'bold'}}>Log In</Text>
            </View>
        </View>
        <Text>Username</Text>
        <Controller
          name="username"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.username && <Text style={styles.error}>Insert username</Text>}

        {/* PASSWORD */}
        <Text>Password</Text>
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={true}
            />
          )}
        />
        {errors.password && <Text style={styles.error}>Insert password</Text>}

        {/* WRONG CREDENTIALS */}
        {<Text style={styles.error}>{message}</Text>}

        <Button title="Sign in" onPress={handleSubmit(onSubmit)} />
        <CustomButton
          text="Sign in with Google"
          bgColor="#FAE9EA"
          fgColor="#DD4D44"
          onPress={() => {
            promptAsync();
          }}
        />
        <View style={styles.view}>
        <Icon name="logo-google" size={30} color="#641E16" /> 
        <CustomButton 
        text='Dont have an account? Create one' 
        onPress={() => handleCreate()}
        type='TERTIARY'
        />
        </View>
        
        {/* <Button title="Create account" onPress={() => handleCreate()} /> */}

        {/* LOGIN GOOGLE */}
        {/* <TouchableOpacity
          onPress={() => {
            promptAsync()
           }}
        ><Text>Login with Google</Text>
        </TouchableOpacity> */}
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
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
    backgroundColor: "#5E5E5E",
  },
  input: {
    heigth:80,
    backgroundColor: "#FFFFFF",
    marginTop: 0,
    marginHorizontal: 10,
    padding: 5,
    width: "100%",
  },
  error: { color: "red" },
  view:{
    flexDirection:"row"
  }
});

export default Login;
