import React from "react";
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Details from "./Details";
import Allproducts from "../Components/Allproducts";
import Home from "../Components/Home";
import Categories from "../Screens/Details";
const Stack = createNativeStackNavigator();
import NavBar from "../Components/NavBar";

const UserHome = () => {
    return (
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen
                    name='Home'
                    component={Home}
                />
                <Stack.Screen
                    name='Allproducts'
                    component={Allproducts}
                />
                <Stack.Screen
                    name='Categories'
                    component={Categories}
                />
                <Stack.Screen
                    name='Details'
                    component={Details}
                />
            </Stack.Navigator >
    )
}


export default UserHome
                