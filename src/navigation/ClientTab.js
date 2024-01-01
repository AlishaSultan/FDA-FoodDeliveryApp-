import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import Home from "../Screens/Home";
import Orders from "../Screens/Orders";
import MyAccountScreen from "../Screens/MyAccountScreen";
import { withTranslation } from "react-i18next";
import ClientStack from "./ClientStack";
//import useLanguageSelection from '../Screens/UseLanguageSelection';
const ClientTabs = createBottomTabNavigator();

function RootClientTab({ t }) {
  return (
    <ClientTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#E11584",
        tabBarInactiveTintColor: "#F9629F",
        headerShown: false,
        tabBarLabel: getTabBarLabel(route),
        tabBarIcon: ({ color, size }) => getTabBarIcon(route, color, size),
        tabBarStyle: { display: "flex" },
      })}
    >
      <ClientTabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: t("Home"),
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" type="material" color={color} size={20} />
          ),
        }}
      />

      <ClientTabs.Screen
        name="ClientStack"
        component={ClientStack}
        options={{
          tabBarLabel: t("Search"),
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" type="material" color={color} size={20} />
          ),
        }}
      />
      <ClientTabs.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarLabel: t("Orders"),
          tabBarIcon: ({ color, size }) => (
            <Icon name="view-list" type="material" color={color} size={20} />
          ),
        }}
      />
      <ClientTabs.Screen
        name="MyAccountScreen"
        component={MyAccountScreen}
        options={{
          tabBarLabel: t("Account"),
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" type="material" color={color} size={20} />
          ),
        }}
      />
    </ClientTabs.Navigator>
  );
}

export const getTabBarLabel = (route) => {
  return route.name;
};

export const getTabBarIcon = (route, color, size) => {
  return <Icon name="home" type="material" color={color} size={size} />;
};

export default withTranslation()(RootClientTab);
