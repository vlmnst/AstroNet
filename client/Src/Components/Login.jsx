import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  StatusBar,
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
Web.maybeCompleteAuthSession();

const Login = ({ navigation }) => {
  // const URL = 'http://localhost:3001/login';
  //ESTADOS PARA LOGIN DE GOOGLE -------------
  const [accessToken, setAccessToken] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:'249536522363-39rfcrblktar14u0n6eo9bjrcgj4to67.apps.googleusercontent.com',
    androidClientId:'249536522363-69m8roucbhests6sk69l3msirfjm9lhf.apps.googleusercontent.com',
    webClientId:'249536522363-2bvea9vfafhkscv8fs8vrbbe0fei9e5i.apps.googleusercontent.com',
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
    responseToLogin(userInfo.email)
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
    let res = await axios.post(ROUTE+"/users/getByEmail/"+email);
    const { status, message, data } = res.data;
    if(!status){ navigation.navigate("Create User") }
    if(status){
        dispatch(setUserData(data));
        AsyncStorage.setItem("storageCredentials", JSON.stringify(data)).catch(
          () => console.log("error while persistLogin at Login.jsx")
        );
        navigation.navigate("Home")
    }
  }



  const [message, setMessage] = useState("");
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
    <View>
      <SafeAreaView style={styles.AndroidSafeArea}>
        {/* USERNAME */}
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
        <Button title="Create account" onPress={() => alert("create")} />

        {/* LOGIN GOOGLE */}
        <GoogleButton
          onClick={() => {
            promptAsync()
           }}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: { paddingTop: StatusBar.currentHeight + 10 },
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
    backgroundColor: "#5E5E5E",
  },
  input: {
    backgroundColor: "#FFFFFF",
    marginTop: 0,
    marginHorizontal: 10,
    padding: 5,
    width: "100%",
  },
  error: { color: "red" },
});

export default Login;
