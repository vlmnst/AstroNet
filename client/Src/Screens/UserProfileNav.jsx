import React from "react";
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserProfile from "../Components/UserProfile";
import PurchaseHistory from "../Components/PurchaseHistory"
import DoReview from "../Components/DoReview";
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
                <Stack.Screen
                    name='PurchaseHistory'
                    component={PurchaseHistory}
                />
                <Stack.Screen
                    name='DoReview'
                    component={DoReview}
                />
            </Stack.Navigator >
    )
}


export default UserProfileNav