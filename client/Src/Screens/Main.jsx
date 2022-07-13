import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import UserHome from "./UserHome";
import Home from "../Components/Home";
// import ProductCreate from "../Components/ProductCreate";
import PanelAdminNav from "./PanelAdminNav";
const Drawer = createDrawerNavigator();

// login credentials
import Login from "../Components/Login";
import { getCredentials } from '../utils/handleCredentials';

const Main = () => {
    const [role, setRole] = useState('guest');

    // posible solucion: setear role desde reducer
        // es buena practica o super inseguro? (me modifican el estado del reducer a admin y chau)

    useEffect(async() => {
        const credentials = await getCredentials();
        if (credentials) {
            setRole(credentials.role);
        } else {
            setRole('guest')
        };
    }, []);

    return (
        <NavigationContainer  >
            <Drawer.Navigator
                screenOptions={{
                    // headerShown: false
                }}>
                <Drawer.Screen
                    name='UserHome'
                    component={UserHome}
                    options={{
                        drawerLabel: () => null,
                        title: "Home"
                    }}
                />
                <Drawer.Screen 
                    name='Home' 
                    component={Home} 
                />

                { role === 'admin' ? (
                    <Drawer.Screen name='PanelAdminNav' component={PanelAdminNav} />
                ) : null }

                { role === 'guest' ? (
                    <Drawer.Screen name='Login' component={Login} />
                ) : null }

            </Drawer.Navigator >
        </NavigationContainer >
    )
};

export default Main;