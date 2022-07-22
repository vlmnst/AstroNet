import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SideMenu from "./SideMenu/SideMenu";
import UserHome from "./UserHome";
import PanelAdminNav from "./PanelAdminNav";
import Cart from "../Components/CartLobby";

import UserProfileNav from "./UserProfileNav";


import Login from "../Components/Login";

const Drawer = createDrawerNavigator();


const Main = () => {

    return (
        <NavigationContainer  >
            <Drawer.Navigator
                drawerContent={(props) => <SideMenu { ...props } />}
                screenOptions={{headerShown: false}}
            >
                <Drawer.Screen
                    options={{
                        title:''
                    }}
                    name='HomeNav'
                    component={UserHome}
                />
                <Drawer.Screen 
                    name='Cart' 
                    component={Cart} 
                />
                <Drawer.Screen
                    options={{
                        title:''
                    }}
                    name='ProfileNav'
                    component={UserProfileNav}
                />
                <Drawer.Screen
                    options={{
                        title:''
                    }}
                    name='PanelAdminNav'
                    component={PanelAdminNav}
                />
                <Drawer.Screen
                    options={{
                        title:''
                    }}
                    name='Login'
                    component={Login}
                />

            </Drawer.Navigator >
        </NavigationContainer >
    )
};

export default Main;