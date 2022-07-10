import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from "../Components/Home";
import Allproducts from "../Components/Allproducts";
import Categories from "../Components/Categories";
import Details from "../Components/Details";

const Stack = createNativeStackNavigator()

const Main = () => {
    return (
        <NavigationContainer  >
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen
                    name='Home'
                    component={Home}
                />
                <Stack.Screen
                    name='Categories'
                    component={Categories}
                />
                <Stack.Screen
                    name='Allproducts'
                    component={Allproducts}
                />
                <Stack.Screen
                name = 'Details'
                component= { Details }
                />
            </Stack.Navigator>
        </NavigationContainer >
    )
}


export default Main