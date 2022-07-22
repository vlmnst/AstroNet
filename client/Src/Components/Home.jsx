import React, { useEffect, useState } from "react";
import Categories from "../Components/Categories";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, Modal, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { getAllProducts,getCategories } from '../../Redux/Slice';
import Banner from "./Banner";
// import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import img from '../../assets/logo/logoAstronet.jpeg'
import {putToken} from '../../Redux/Slice/userSlice'
import * as Notifications from 'expo-notifications';//EXPO PUSH IMPORT
import * as Permissions from 'expo-permissions';//EXPO PUSH IMPORT


const Home = ({ navigation, route }) => {

  //---------------------------------------------------------------------------------------------
  //----------------------------------EXPO PUSH NOTIFICATION-------------------------------------
  //---------------------------------------------------------------------------------------------
  useEffect(() => {
    registerForPushNotifications()
    .then(token=> token ? dispatch(putToken(token)) : null)
    .catch(err => console.log(err))
  }, []);
  // Token notificacion push (id unico de dispositivo)
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
      return token// <------TOKEN DISPOSITIVO-------
    }
    catch (error) {
      console.log('we dont want your see our notification in web because is suck, you are welcome');
    }
  }
  //---------------------------------------------------------------------------------------------

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
              {/* <View style={styles.popUpimgcontainer}> */}
                <Image style={styles.popUpimg} source={ img } />
              {/* </View> */}
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
    // flex: 1,
    // position: 'absolute',
    justifyContent: 'center',
    width: '100%',
    // flexDirection:"column",
    // alignItems:'space-between'
    // backgroundColor:'white'
    backgroundColor: "white",
  },
  ScrollViewStyles: {
    minHeight:'88%',
    // marginTop: 10,
    backgroundColor: 'white'
  },
  SB: {
    // flexDirection: 'row',
    width: '100%',
    height: '12%',
    // alignItems: 'center',
    // justifyContent: "center",
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
    // height:120,
    // resizeMode:"contain",
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