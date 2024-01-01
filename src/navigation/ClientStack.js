import React, { useLayoutEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../Screens/SearchScreen";
import SearchResult from "../Screens/SearchResult";
import RestaurantMainPage from "../Screens/RestaurantMainPage";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import MenuProductScreen from "../Screens/MenuProductScreen";
import PreferenceScreen from "../Screens/PreferenceScreen";
import AddCart from "../Screens/AddCart";
import CartItems from "../Screens/CartItems";
import OrderConfirmed from "../Screens/OrderConfirmed";
import { CartProvider } from "../contexts/CartContext";

const ClientSearch = createStackNavigator();

export default function ClientStack({ navigation, route }) {
  const tabHiddenRoutes = ["RestaurantMainPage", "MenuProductScreen"]; // Add other routes if needed

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (tabHiddenRoutes.includes(routeName)) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    }
  }, [navigation, route]);

  return (
    <CartProvider>
      <ClientSearch.Navigator>
        <ClientSearch.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <ClientSearch.Screen
          name="SearchResult"
          component={SearchResult}
          options={{ headerShown: false }}
        />
        <ClientSearch.Screen
          name="RestaurantMainPage"
          component={RestaurantMainPage}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />
        <ClientSearch.Screen
          name="MenuProductScreen"
          component={MenuProductScreen}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />

        <ClientSearch.Screen
          name="PreferenceScreen"
          component={PreferenceScreen}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />
        <ClientSearch.Screen
          name="AddCart"
          component={AddCart}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />
        <ClientSearch.Screen
          name="OrderConfirmed"
          component={OrderConfirmed}
          options={{
            headerShown: false,
            tabBarVisible: false,
          }}
        />
      </ClientSearch.Navigator>
    </CartProvider>
  );
}
