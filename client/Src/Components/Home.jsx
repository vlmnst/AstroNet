import React, { useEffect, useState } from "react";
import Categories from "../Components/Categories";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, Modal, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { getAllProducts,getCategories } from '../../Redux/Slice';
import Banner from "./Banner";
// import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import img from '../../assets/logo/logoAstronet.png'
import {putToken} from '../../Redux/Slice/userSlice'
import * as Notifications from 'expo-notifications';//EXPO PUSH IMPORT
import * as Permissions from 'expo-permissions';//EXPO PUSH IMPORT


const Home = ({ navigation, route }) => {

  // expo push notification
  useEffect(() => {
    registerForPushNotifications()
    .then(token => token ? dispatch(putToken(token)) : null)
    .catch(err => console.log(err))
  }, []);

  // token notificacion push (id unico de dispositivo)
  const registerForPushNotifications = async () => {
    try {
      const{status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if (status != 'granted') {
          const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS)
        }
        if (status!='granted' ) {
          alert ('Fail to get push token');
          return;
        }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      return token
    }
    catch (error) {
      console.log('we dont want your see our notification in web because is suck, you are welcome');
    }
  }

  const [visible, setVisible] = useState(false)
  const [variable, setVariable] = useState('')
  const user = useSelector((state) => state.USER.userName)

  const setVariableTimeOut = () => {
    setVariable('listo')
  }

  useEffect(() => {
    setTimeout(setVariableTimeOut, 2000)
    if (user && variable === 'listo') {
      setVisible(false)
    } else if (!user && variable === 'listo') {
      setVisible(true)
    }
  }, [variable])

  const handleOnPress = () => {
    navigation.navigate('Login')
    setVisible(false)
  }

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <View Style={styles.conteiner}>
        <Modal
          transparent={true}
          visible={visible}
        >
          <View style={styles.modalConteiner}>
            <View style={styles.popUpConteiner}>
              <Image style={styles.popUpimg} source={ img } />
              <Text style={styles.modaltxt1}>Welcome to AstroNet</Text>
              <TouchableOpacity
                onPress={() => handleOnPress()}
                style={styles.modalTouchableOpacity}
              >
                <View style={styles.modalbtntxtview}>
                  <Text style={styles.modalbtntxt}>Log in or sign up</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={styles.modalTouchableOpacity}
              >
                <View style={styles.modalbtntxtview}>
                  <Text style={styles.modalbtntxt}>Continue as a guest</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
          <View style={styles.SB}>
            <SearchBar navigation={navigation} route={route} />
          </View>
          <ScrollView contentContainerStyle={styles.ScrollViewStyles}>
            <Banner navigation={navigation} />
            <Categories {...navigation} />
          </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  conteiner: {
    justifyContent: 'center',
    width: '100%',
    minHeight:'100%',
    backgroundColor: "white",
  },
  ScrollViewStyles: {
    minHeight:'88%',
    backgroundColor: 'white'
  },
  SB: {
    width: '100%',
    height: 100,
    backgroundColor: '#4A347F',
  },
  modalConteiner: {
    backgroundColor: '#000000aa',
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  popUpConteiner: {
    backgroundColor: '#FFFBE8',
    height: '75%',
    width: '85%',
    borderRadius: 25,
    alignItems:"center",
    justifyContent:"center"
  },
  modaltxt1: {
    fontSize:25,
    fontWeight:"bold",
    fontStyle:"italic",
    marginTop:'9%'
  },
  modalTouchableOpacity: {
    height: '10%',
    width: '65%',
    marginTop:50,
  },
  modalbtntxtview: {
    height: '100%',
    justifyContent:"center",
    alignItems:"center",
    borderRadius: 40,
    backgroundColor:'#4A347F',
  },
  modalbtntxt: {
    fontSize: 17,
    color:'white'
  },
  popUpimgcontainer: {
  },
  popUpimg: {
    height: '38%',
    width: '70%',
    alignSelf:"center",
    resizeMode:"contain",
    borderRadius: 120,
  }
});

export default Home;