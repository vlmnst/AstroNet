import React from "react";
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PanelAdmin from "../Components/PanelAdmin";
import ProductCreate from "../Components/ProductCreate";
import AllAdmin from "../Components/AdminPanel/allAdmin";
import ProductModify from "../Components/AdminPanel/ProductModify";
import AllUsers from "../Components/AdminPanel/AllUsers";
import UserDetails from "../Components/AdminPanel/UserDetails";

const Stack = createNativeStackNavigator();

const PanelAdminNav = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen
                name='PanelAdmin'
                component={PanelAdmin}
            />
            <Stack.Screen
                name='ProductCreate'
                component={ProductCreate}
            />
            <Stack.Screen
                name='AllAdmin'
                component={AllAdmin}
            />
            <Stack.Screen
                name='ProductModify'
                component={ProductModify}
            />
            <Stack.Screen
                name='AllUsers'
                component={AllUsers}
            />
            <Stack.Screen
                name='Details'
                component={UserDetails}
            />
        </Stack.Navigator >
    )
}


export default PanelAdminNav