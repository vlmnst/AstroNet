import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from "../Components/Home";

const Stack = createNativeStackNavigator()

const Main = () => {
    return (
        <NavigationContainer  >
            <Stack.Navigator
                screenOptions={{
                    //headerShown: false
                }}>
                <Stack.Screen
                name = 'Home'
                component= { Home }
                />
            </Stack.Navigator>
        </NavigationContainer >
    )
}


export default Main