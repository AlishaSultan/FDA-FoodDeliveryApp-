import React, { useEffect } from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import SignWelcomeScreen from "../Screens/SignWelcomeScreen";
import SignInScreen from "../Screens/SignInScreen";
import SignUpScreen from "../Screens/SignUpScreen";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import CustomButtons from "../Screens/CustomButtons";
import LanguageSelectionScreen from "../Screens/LanguageSelectionScreen";
const Auth = createStackNavigator();

export default function AuthStack() {
  // useEffect(() => {
  //     // initialize the Google SDK
  //     GoogleSignin.configure({
  //       webClientId: '380358041298-lrnv7qhef9sg86o279e67bdlp5rsdk9n.apps.googleusercontent.com',
  //     });
  //   }, []);

  return (
    <Auth.Navigator>
      <Auth.Screen
        name="LanguageSelectionScreen"
        component={LanguageSelectionScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />

      <Auth.Screen
        name="CustomButtons"
        component={CustomButtons}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <Auth.Screen
        name="SignWelcomeScreen"
        component={SignWelcomeScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />

      <Auth.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />

      <Auth.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
    </Auth.Navigator>
  );
}
