import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";

const { Navigator, Screen} =  createBottomTabNavigator();

import { Page } from "../Home";
import { Register } from "../Register";
import { Resume } from "../Resume";
import { MaterialIcons } from "@expo/vector-icons"

export function AppRoutes() {
    const theme = useTheme();
    return(
        <Navigator
        screenOptions={{
            headerShown:false,
            tabBarActiveTintColor: theme.colors.orange,
            tabBarInactiveTintColor: theme.colors.grey,
            tabBarLabelPosition: "beside-icon",
            tabBarStyle: {
                height: 88,
        
            },
        }}
        >
            <Screen
            name="Listagem"
            component={Page}
            options={{
                tabBarIcon: (({size, color}) => 
                <MaterialIcons 
                name="format-list-bulleted"
                size={size}
                color={color}
                ></MaterialIcons>
                )
            }}
            ></Screen>
            <Screen
            name="Cadastrar"
            component={Register}
            options={{
                tabBarIcon: (({size, color}) => 
                <MaterialIcons 
                name="attach-money"
                size={size}
                color={color}
                ></MaterialIcons>
                )
            }}
            ></Screen>
            <Screen
            name="Resumo"
            component={Resume}
            options={{
                tabBarIcon: (({size, color}) => 
                <MaterialIcons 
                name="pie-chart"
                size={size}
                color={color}
                ></MaterialIcons>
                )
            }}
            ></Screen>
        </Navigator>
    );
};