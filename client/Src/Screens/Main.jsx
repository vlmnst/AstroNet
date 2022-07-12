import React from "react";
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import UserHome from "./UserHome";
import Home from "../Components/Home";
import ProductCreate from "../Components/ProductCreate";
import PanelAdminNav from "./PanelAdminNav";
const Drawer = createDrawerNavigator();

const Main = () => {
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
                <Drawer.Screen
                    name='ProductCreate'
                    component={ProductCreate}
                />
                <Drawer.Screen
                    name='PanelAdminNav'
                    component={PanelAdminNav}
                    options={{
                        title: "PanelAdmin"
                    }}
                />
            </Drawer.Navigator >
        </NavigationContainer >
    )
}

export default Main