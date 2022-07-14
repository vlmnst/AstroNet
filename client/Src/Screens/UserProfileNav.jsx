import React from "react";
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserProfile from "../Components/UserProfile";
const Stack = createNativeStackNavigator();

const UserProfileNav = () => {
    return (
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen
                    name='Profile'
                    component={UserProfile}
                />
            </Stack.Navigator >
    )
}


export default UserProfileNav