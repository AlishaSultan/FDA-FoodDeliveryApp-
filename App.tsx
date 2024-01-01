import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ActivityIndicator,
  LogBox,
} from "react-native";
import { colors, title } from "./src/Global/styles";
import RootNavigator from "./src/navigation/RootNavigator";
import ToastMessage from "react-native-toast-message";
import { toastConfig } from "./src/Global/styles";
import { SignInContextProvider } from "./src/contexts/authContext";

import LottieView from "lottie-react-native";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/contexts/i18n"; // Your i18n configuration file
LogBox.ignoreAllLogs();
// Import your splash screen image

// Replace 'animation.json' with the path to your Lottie animation JSON file
const LottieAnimation = require("./src/assets/Animation - 1703167558802.json");
// @ts-ignore: Suppress "ReactImageView: Image source "null" doesn't exist" warning

const App = () => {
  const [splashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    // Simulate a 5-second delay for the loading indicator and splash screen

    const timerSplash = setTimeout(() => {
      setSplashVisible(false);
    }, 5000); // Adjust the duration for the splash screen if needed

    return () => {
      clearTimeout(timerSplash);
    };
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <SignInContextProvider>
        <View style={styles.container}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={colors.statusbar}
          />

          {splashVisible && (
            <View style={styles.splashContainer}>
              <Text style={styles.header}>Welcome on XFood</Text>
              <LottieView
                source={LottieAnimation}
                autoPlay
                loop={true} // Set to true if you want the animation to loop
                style={styles.lottieAnimation}
              />
            </View>
          )}

          {!splashVisible && (
            // Render RootNavigator when splashVisible is false
            <RootNavigator />
          )}

          <ToastMessage config={toastConfig} />
        </View>
      </SignInContextProvider>
    </I18nextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 150,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28,
  },
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.buttons, // Customize the background color
  },
  splashImage: {
    width: "100%", // Adjust the width of the splash screen image
    height: "100%", // Adjust the height of the splash screen image
  },
  loadingIndicator: {
    position: "absolute",
    alignSelf: "center",
  },
  lottieAnimation: {
    width: 700, // Adjust the width of the Lottie animation
    height: 1070, // Adjust the height of the Lottie animation
  },
});

export default App;
