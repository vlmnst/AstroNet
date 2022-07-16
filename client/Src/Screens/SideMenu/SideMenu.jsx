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
    let role = useSelector((state) => state.USER.role);
    let userName = useSelector((state) => state.USER.userName);
    
    const [currentBtn, setCurrentBtn] = useState('HomeNav');
    
    // const index = useNavigationState(state => state?.routes[0].state.index)
    const { routes } = navigation.getState()
    let index = routes[0].state?.index  
    const handlePressHome = (prop) => {
        // console.log(navigation.getState())
        if(currentBtn === prop && index > 0 ){
            navigation.navigate(prop)
            navigation.dispatch(
                StackActions.popToTop()
            )
        } else if (currentBtn !== prop && index > 0 ) {
            navigation.navigate(prop)
            navigation.dispatch(
                StackActions.popToTop()
            )
        } else {
            navigation.navigate(prop)
        }
        setCurrentBtn(prop)
    }

    let index2 = routes[2].state?.index   
    const handlePressPanelAdminBtn = (prop) => {
        setCurrentBtn(prop)
        if(currentBtn == prop && index2 > 0 ){
            navigation.navigate(prop)
            navigation.dispatch(
                StackActions.popToTop()
            )
        } else if (currentBtn != prop && index2 > 0 ) {
            navigation.navigate(prop)
            navigation.dispatch(
                StackActions.popToTop()
            )
        } else {
            navigation.navigate(prop)
        }
    }

    const handlePress = (prop) => {
        navigation.navigate(prop)
        setCurrentBtn(prop)
    }
    useEffect( () => {
        const credentials = async () => {
            const credentials = await getCredentials();
            if (credentials) {
                const { username, role, email } = credentials
                const data = { username, role, email }
                dispatch(setUserData(data))
            };
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
                onPress={() => handlePressHome('HomeNav')}
            />
            { userName ? (
                <ProfileBtn
                    text = "Profile"
                    onPress = { () => handlePress("ProfileNav") }
                />
            ) : null }
            { role === 'admin'||role === 'mod'?(
                <PanelAdminBtn
                    text = "PanelAdmin"
                    onPress = { () => handlePressPanelAdminBtn("PanelAdminNav") }
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