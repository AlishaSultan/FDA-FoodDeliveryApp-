import React, { useState, useRef, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import { colors, parameters, title } from "../Global/styles";
import { Icon, Button, SocialIcon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import Swiper from "react-native-swiper";
import { SignInContext } from "../contexts/authContext";
import { useTranslation } from "react-i18next";
// import auth from '@react-native-firebase/auth'
export default function SignWelcomeScreen({ navigation }) {
  // const { userToken, dispatchSignedIn } = useContext(SignInContext);
  // useEffect(() => {
  //     const unsubscribe = auth().onAuthStateChanged((user) => {
  //       if (user) {
  //         dispatchSignedIn({ type: "UPDATE_SIGN_IN", payload: { userToken: "signed-in" } });
  //       } else {
  //         dispatchSignedIn({ type: "UPDATE_SIGN_IN", payload: { userToken: null } });
  //       }
  //     });

  //     // Clean up the subscription when the component unmounts
  //     return () => unsubscribe();
  //   }, [dispatchSignedIn]);
  const { i18n } = useTranslation();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 3,
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: 35,
        }}
      >
        <Text style={{ fontSize: 22, color: "#FF69B4", fontWeight: "bold" }}>
          {i18n.t("DISCOVER_RESTAURANTS")}
        </Text>
        <Text style={{ fontSize: 22, color: "#FF69B4", fontWeight: "bold" }}>
          {i18n.t("IN_YOUR_AREA")}
        </Text>
      </View>

      <View style={{ flex: 4, justifyContent: "center" }}>
        <Swiper autoplay={true}>
          <View style={styles.slide1}>
            <Image
              source={{
                uri: "https://img.freepik.com/premium-photo/photo-bowl-food-with-smoke-coming-out-it_948953-3731.jpg",
              }}
              style={{ height: "100%", width: "100%" }}
            />
          </View>

          <View style={styles.slide2}>
            <Image
              source={{
                uri: "https://img.freepik.com/premium-photo/chef-prepares-food-hot-pan-with-steam_192985-2807.jpg",
              }}
              style={{ height: "100%", width: "100%" }}
            />
          </View>

          <View style={styles.slide3}>
            <Image
              source={{
                uri: "https://img.freepik.com/premium-photo/there-is-plate-food-with-sauce-sauce-it-generative-ai_901242-10077.jpg",
              }}
              style={{ height: "100%", width: "100%" }}
            />
          </View>

          <View style={styles.slide4}>
            <Image
              source={{
                uri: "https://img.freepik.com/premium-photo/bowl-noodles-with-tomato-it-tomato-side_853177-5169.jpg",
              }}
              style={{ height: "100%", width: "100%" }}
            />
          </View>

          <View style={styles.slide5}>
            <Image
              source={{
                uri: "https://img.freepik.com/premium-photo/chef-cooking-food-with-fire-background_905510-16081.jpg",
              }}
              style={{ height: "100%", width: "100%" }}
            />
          </View>
        </Swiper>
      </View>
      <View style={{ flex: 4 }}>
        <View style={{ marginHorizontal: 40, marginVertical: 80 }}>
          <Button
            title={i18n.t("SIGn_IN")}
            buttonStyle={parameters.styledButton}
            titleStyle={parameters.buttonTitle}
            onPress={() => {
              navigation.navigate("SignInScreen");
            }}
          />
        </View>

        <View style={{ marginTop: -55, marginHorizontal: 40 }}>
          <Button
            title={i18n.t("CREATE_ACCOUNT")}
            buttonStyle={styles.createButton}
            titleStyle={styles.createButtonTitle}
            onPress={() => {
              navigation.navigate("SignUpScreen");
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide1: {
    flex: 1,
    justifyContent: "center",

    alignItems: "center",
    backgroundColor: "white",
  },

  slide2: {
    flex: 1,

    alignItems: "center",

    justifyContent: "center",
    backgroundColor: "white",
  },

  slide3: {
    flex: 1,

    alignItems: "center",

    justifyContent: "center",
    backgroundColor: "white",
  },

  slide4: {
    flex: 1,

    alignItems: "center",

    justifyContent: "center",
    backgroundColor: "white",
  },

  slide5: {
    flex: 1,

    alignItems: "center",

    justifyContent: "center",
    backgroundColor: "white",
  },

  createButton: {
    backgroundColor: "white",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.buttons,
    height: 55,
  },

  createButtonTitle: {
    color: "#F9629F",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "-3",
  },
});
