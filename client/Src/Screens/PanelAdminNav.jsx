import React from "react";
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PanelAdmin from "../Components/Home";
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
            </Stack.Navigator >
    )
}


export default PanelAdminNav