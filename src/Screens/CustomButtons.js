import React from "react";
import { Alert, StatusBar, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import { Button } from "react-native-elements";
import Onboarding from "react-native-onboarding-swiper";
import { colors } from "../Global/styles";
import { useTranslation } from "react-i18next";
const LottieAnimation = require("../assets/Signup.json");
const LottieAnimation1 = require("../assets/Order.json");
const LottieAnimation2 = require("../assets/done2.json");
const LottieAnimation3 = require("../assets/done1.json");

const CustomButtons = ({ navigation, onFourthPageButtonPress }) => {
  const handleSkip = () => {
    Alert.alert("Skipped");
  };

  const handleFourthPageButtonPress = () => {
    if (onFourthPageButtonPress) {
      onFourthPageButtonPress();
    } else {
      navigation.navigate("SignWelcomeScreen");
      StatusBar.setBarStyle("default");
    }
  };

  const { width, height } = Dimensions.get("window");
  const isSmallDevice = width < 375; 
  const { i18n } = useTranslation();

  return (
    <Onboarding
      showDone={false}
      showSkip={false}
      onSkip={handleSkip}
      pages={[
        {
          title: i18n.t("AUTHENTICATION"),
          subtitle: i18n.t(
            "QUICKLY_VERIFY_YOUR_IDENTITY_AND_DIVE_INTO_A_WORLD_OF_DELICIOUS_POSSIBILITIES_ON_OUR_FOOD_DELIVERY_APP_ENJOY_SEAMLESS_ORDERING_IN_JUST_A_FEW_TAPS"
          ),
          backgroundColor: "#FF69B4",
          image: (
            <LottieView
              source={LottieAnimation}
              autoPlay
              loop={true}
              style={[
                styles.lottieAnimation,
                { height: isSmallDevice ? 300 : 500 },
              ]}
            />
          ),
        },
        {
          title: i18n.t("SEE_MENU_ORDER_FOOD"),
          subtitle: i18n.t(
            "EXPLORE_OUR_DIVErSE_MENU_AND_TREAT_YOUR_TASTE_BUDS_TO_A_CULINARY_JOURNEY_ORDER_WITH_EASE_AND_SAVOR_EVERY_BITE_DELIVERED_RIGHT_TO_YOUR_DOORSTEP"
          ),
          backgroundColor: "#FF69B4",
          image: (
            <LottieView
              source={LottieAnimation1}
              autoPlay
              loop={true}
              style={[
                styles.lottieAnimation,
                { height: isSmallDevice ? 300 : 500 },
              ]}
            />
          ),
        },
        {
          title: i18n.t("DELIVER_ON_TIME"),
          subtitle: i18n.t(
            "DELIVERING_CULINARY_DELIGHTS_TO_YOUR_DOOR_ORDER_NOW_FOR_A_TASTE_OF_HAPPINESS_BROUGHT_RIGHT_TO_YOU"
          ),
          backgroundColor: "#FF69B4",
          image: (
            <LottieView
              source={LottieAnimation2}
              autoPlay
              loop={true}
              style={[
                styles.lottieAnimation,
                { height: isSmallDevice ? 300 : 500 },
              ]}
            />
          ),
        },
        {
          title: i18n.t("NOW_YOURE_READY_TO_USE_IT"),
          subtitle: (
            <Button
              title={i18n.t("GET_STARTED")}
              buttonStyle={styles.createButton}
              titleStyle={styles.createButtonTitle}
              onPress={handleFourthPageButtonPress}
            />
          ),
          backgroundColor: "#FF69B4",
          image: (
            <LottieView
              source={LottieAnimation3}
              autoPlay
              loop={true}
              style={[
                styles.lottieAnimation,
                { height: isSmallDevice ? 300 : 500 },
              ]}
            />
          ),
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  lottieAnimation: {
    marginTop: -120,
    width: "100%",
  },
  createButton: {
    backgroundColor: colors.darkColor,
    alignContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "white",
    height: 55,
    marginTop: 10,
    width: 250,
  },
  createButtonTitle: {
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "-3",
  },
});

export default CustomButtons;
