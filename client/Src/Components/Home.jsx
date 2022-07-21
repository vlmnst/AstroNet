import React, { useEffect, useState } from "react";
import Categories from "../Components/Categories";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";
import { getAllProducts, getCategories} from '../../Redux/Slice';
import {putToken} from '../../Redux/Slice/userSlice'
import Banner from "./Banner";
// import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import * as Notifications from 'expo-notifications';//EXPO PUSH IMPORT
import * as Permissions from 'expo-permissions';//EXPO PUSH IMPORT


const Home = ({ navigation, route }) => {

  //---------------------------------------------------------------------------------------------
  //----------------------------------EXPO PUSH NOTIFICATION-------------------------------------
  //---------------------------------------------------------------------------------------------
  useEffect(() => {
    registerForPushNotifications()
    .then(token=>token?dispatch(putToken(token)):null)
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
      console.log('we dont want your see our notification in web becose is suck, you are welcome');
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
    <View style={styles.conteiner}>

      <Modal
        transparent={true}
        visible={visible}
      >
        <View style={styles.modalConteiner}>
          <View style={styles.popUpConteiner}>
            <Text style={styles.modalbtntxt}>You are not logged in:</Text>
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

      {/* <View > */}
      <Banner navigation={navigation} />
      <Categories {...navigation} />
      {/* </View> */}

    </View>
  );
};

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: "white",
  },
  SB: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: "center",
    marginVertical: 20
  },
  modalConteiner: {
    backgroundColor: '#000000aa',
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  popUpConteiner: {
    backgroundColor: '#ffffff',
    height: '45%',
    width: '75%',
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  modalTouchableOpacity: {
    height: '15%',
    width: '70%',
    marginVertical: 20
  },
  modalbtntxtview: {
    backgroundColor: 'grey',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15
  },
  modalbtntxt: {
    fontSize: 17
  }
});

export default Home;