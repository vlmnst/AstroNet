import React, { useState, useEffect } from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Text, StyleSheet } from "react-native";
import { getCredentials } from '../../utils/handleCredentials';
// import { StackActions, NavigationActions } from 'react-navigation';

import HomeBtn from "./SideMenuBtns/HomeBtn";
import PanelAdminBtn from "./SideMenuBtns/PanelAdminBtn";
import LoginBtn from "./SideMenuBtns/LoginBtn";
import { StackActions, useNavigationState } from '@react-navigation/native';
import ProfileBtn from "./SideMenuBtns/ProfileBtn";
import LogoutBtn from "./SideMenuBtns/LogoutBtn";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../../Redux/Slice/userSlice";


const SideMenu = ({ navigation }) => {


    const dispatch = useDispatch()
    // const [userName, setUserName] = useState(null);
    // const [role, setRole] = useState('guest');
    let role = useSelector((state) => state.USER.role);
    let userName = useSelector((state) => state.USER.userName);


    
    const [currentBtn, setCurrentBtn] = useState('Home');
    
    const index = useNavigationState(state => state)
    // index ? console.log(index):null;

    const handlePressHome = () => {
        if(currentBtn === 'Home' || index > 0){
            navigation.dispatch(
                StackActions.popToTop()
            )
        } else if (currentBtn !== 'Home' || index > 0) {
            navigation.navigate('Home')
            navigation.dispatch(
                StackActions.popToTop()
            )
        } else {
            navigation.navigate('Home')
        }
        setCurrentBtn('Home')
    }
    const handlePress = (prop) => {
        navigation.navigate(prop)
        setCurrentBtn(prop)
    }

    useEffect( () => {
        const credentials = async () => {
            const credentials = await getCredentials();
            if (credentials) {
                // setUserName(credentials.username)
                const { username, role, email } = credentials
                const data = { username, role, email }
                dispatch(setUserData(data))
            };
            // if (credentials) {
            //     setRole(credentials.role);
            // } else {
            //     setRole('guest')
            // };
        }
        credentials()
    }, []);

    return (
        <DrawerContentScrollView
            style={ styles.container }
        >
            <Text style={ styles.title }>Menu</Text>
            <HomeBtn
                text = "Home"
                onPress={() => handlePressHome()}
            />
            { userName ? (
                <ProfileBtn
                text = "Profile"
                onPress = { () => handlePress("Profile") }
            />
            ) : null }
            { role === 'admin' ||role === 'mod'? (
                <PanelAdminBtn
                    text = "PanelAdmin"
                    onPress = { () => handlePress("PanelAdminNav") }
                />
            ) : null }
            { role === 'guest' ? (
                <LoginBtn
                    text = "Login"
                    onPress = { () => handlePress("Login") }
                />
            ) : null }
            { userName ? (
                <LogoutBtn
                    text = "Logout"
                />
            ) : null }
            
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        height: '100%'
    },
    title:{
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20
    }
})

export default SideMenu;