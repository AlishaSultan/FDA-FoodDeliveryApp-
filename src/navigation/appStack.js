import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import MapScreen from "../Screens/MapScreen";
import DrawerNavigator from "./DrawerNavigator";
import CartItems from "../Screens/CartItems";
import AddtoCart from "../Screens/AddtoCart";
import UseLanguageSelection from "../Screens/UseLanguageSelection";
const App = createStackNavigator();

export function AppStack() {
  return (
    <App.Navigator>
      <App.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <App.Screen
        name="UseLanguageSelection"
        component={UseLanguageSelection}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />

      <App.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />

      <App.Screen
        name="CartItems"
        component={CartItems}
        options={{
          headerShown: false,
          tabBarVisible: false,
        }}
      />

      <App.Screen
        name="AddtoCart"
        component={AddtoCart}
        options={{
          headerShown: false,
          tabBarVisible: false,
        }}
      />
    </App.Navigator>
  );
}
