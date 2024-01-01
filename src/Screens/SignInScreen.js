import React, { useState, useRef, useContext } from "react";
import Toast from "react-native-toast-message";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { colors, parameters, title } from "../Global/styles";
import Header from "../Components/Header";
import { Icon, Button, SocialIcon } from "react-native-elements";
import { Formik } from "formik";
import auth from "@react-native-firebase/auth";
import { useTranslation } from "react-i18next";
import * as Animatable from "react-native-animatable";
import { SignInContext } from "../contexts/authContext";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { sendPasswordResetEmail } from "@react-native-firebase/auth";

export default function SignInScreen({ navigation }) {
  const { dispatchSignedIn, googleLogin } = useContext(SignInContext);
  const [textInput2F, setTextInput2F] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const textinput1 = useRef(1);
  const textinput2 = useRef(2);

  const handleForgotPassword = async (email) => {
    try {
      // Check if the email is empty
      if (!email) {
        Toast.show({
          type: "error",
          text1: i18n.t("EMAIL_IS_REQUIRED"),
          visibilityTime: 4000,
          autoHide: true,
        });
        return;
      }

      await auth().sendPasswordResetEmail(email);
      Toast.show({
        type: "success",
        text1: i18n.t("PASSWORD_RESET_EMAIL_SENT"),
        visibilityTime: 4000,
        autoHide: true,
      });
    } catch (error) {
      console.error("Error sending password reset email:", error);
      Toast.show({
        type: "error",
        text1: i18n.t("ERROR_SENDING_PASSWORD_RESET_EMAIL"),
        visibilityTime: 4000,
        autoHide: true,
      });
    }
  };

  async function _signInWithGoogle() {
    try {
      GoogleSignin.configure({
        offlineAccess: false,
        webClientId:
          "380358041298-lrnv7qhef9sg86o279e67bdlp5rsdk9n.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const { idToken } = await GoogleSignin.signIn();
      const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
      auth().signInWithCredential(googleCredentials);

      return userInfo;
    } catch (error) {
      console.log("=> Google Sign In", error);
      return null;
    }
  }

  async function signIn(data) {
    try {
      const { password, email } = data;

      // Validation checks
      if (!email) {
        Toast.show({
          type: "error",
          text1: i18n.t("EMAIL_IS_REQUIRED"),
          visibilityTime: 4000,
          autoHide: true,
        });
        return;
      }

      if (!password) {
        Toast.show({
          type: "error",
          text1: i18n.t("PASSWORD_IS_REQUIRED"),
          visibilityTime: 4000,
          autoHide: true,
        });
        return;
      }

      const user = await auth().signInWithEmailAndPassword(email, password);

      if (user) {
        dispatchSignedIn({
          type: "UPDATE_SIGN_IN",
          payload: { userToken: "signed-in" },
        });

        navigation.navigate("DrawerNavigator");
        Toast.show({
          type: "success",
          text1: i18n.t("SIGNED_IN_SUCCESSFULLY"),
          visibilityTime: 4000,
          autoHide: true,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: i18n.t("ENTER_CORRECT_CREDENTIALS"),
        visibilityTime: 4000,
        autoHide: true,
      });
    }
  }

  const { i18n } = useTranslation();

  return (
    <>
      <View style={styles.container}>
        <Header
          title={i18n.t("MY_ACCOUNT")}
          type="arrow-left"
          navigation={navigation}
        />

        <View>
          <Text style={title}>{i18n.t("SIGN_IN")}</Text>
        </View>

        <View
          style={{
            marginTop: 12,
            alignItems: "center",
          }}
        >
          <Text style={styles.text1}>
            {i18n.t("PLEASE_ENTER_THE_EMAIL_AND_PASSWORD")}
          </Text>
          <Text style={styles.text1}>
            {i18n.t("REGISTERED_WITH_YOUR_ACCOUNT")}
          </Text>
        </View>

        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            signIn(values);
          }}
        >
          {(props) => (
            <View>
              <View>
                <View style={{ marginTop: 30 }}>
                  <TextInput
                    style={styles.TextInput1}
                    placeholder={i18n.t("EMAIL")}
                    ref={textinput2}
                    onChangeText={props.handleChange("email")}
                    value={props.values.email}
                  />
                </View>
                <View style={styles.TextInput2}>
                  <Animatable.View
                    animation={textInput2F ? "" : "fadeInRight"}
                    duration={400}
                  >
                    <Icon
                      name="lock"
                      iconStyle={{ color: colors.buttons }}
                      type="material"
                    />
                  </Animatable.View>

                  <TextInput
                    style={{ width: "80%" }}
                    placeholder={i18n.t("PASSWORD")}
                    ref={textinput2}
                    secureTextEntry={!showPassword}
                    onFocus={() => setTextInput2F(false)}
                    onBlur={() => setTextInput2F(true)}
                    onChangeText={props.handleChange("password")}
                    value={props.values.password}
                  />

                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Animatable.View
                      animation={textInput2F ? "" : "fadeInLeft"}
                      duration={400}
                    >
                      <Icon
                        name={showPassword ? "visibility" : "visibility-off"}
                        iconStyle={{ color: colors.buttons }}
                        type="material"
                        style={{ marginRight: 14 }}
                      />
                    </Animatable.View>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                <Button
                  title={i18n.t("SIGn_IN")}
                  buttonStyle={parameters.styledButton}
                  titleStyle={parameters.buttonTitle}
                  onPress={props.handleSubmit}
                />
              </View>

              <TouchableOpacity
                onPress={() => handleForgotPassword(props.values.email)}
              >
                <View style={{ alignItems: "center", marginTop: 20 }}>
                  <Text style={styles.forgot}>{i18n.t("FORGOT_PASSWORD")}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FF69B4' }}>{i18n.t('OR')}</Text>
        </View>

        <View style={{ marginHorizontal: 15, marginVertical: 30 }}>
          <SocialIcon
            title={i18n.t("SIGN_IN_WITH_FACEBOOK")}
            button
            type="facebook"
            style={styles.SocialIcon}
            onPress={() => {}}
          />
        </View>

        <View style={{ marginHorizontal: 15, marginTop: -20 }}>
          <SocialIcon
            title={i18n.t("SIGN_IN_WITH_GOOGLE")}
            button
            type="google"
            style={styles.SocialIcon}
            onPress={() => {
              _signInWithGoogle();
            }}
          />
        </View>

        <View style={{ marginLeft: 30, marginTop: 30 }}>
          <Text style={{ color: "#F9629F", fontSize: 16, marginRight: 120 }}>
            {i18n.t("NEW_ON_XFOOD")}
          </Text>
        </View>

        <View style={{ alignItems: "flex-end", marginHorizontal: 20 }}>
          <Button
            title={i18n.t("CREATE_AN_ACCOUNT")}
            buttonStyle={styles.createButton}
            titleStyle={styles.createButtonTitle}
            onPress={() => {
              navigation.navigate("SignUpScreen");
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text1: {
    color: "#FF69B4",
    fontSize: 14,
    fontWeight: "bold",
  },

  TextInput1: {
    borderWidth: 1,
    borderColor: "#F9629F",
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    paddingLeft: 15,
  },

  TextInput2: {
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 20,
    borderColor: "#F9629F",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    paddingLeft: 15,
  },

  forgot: {
    color: "#FF69B4",
    textDecorationLine: "underline",
    fontWeight: "bold",
    fontSize: 16,
  },

  SocialIcon: {
    borderRadius: 12,
    height: 55,
  },

  createButton: {
    backgroundColor: "white",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.buttons,
    height: 47,
    paddingHorizontal: 20,
    marginBottom: 3,
  },

  createButtonTitle: {
    color: "#F9629F",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -3,
  },
});
