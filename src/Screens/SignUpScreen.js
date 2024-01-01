import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { colors, title, parameters } from "../Global/styles";
import Header from "../Components/Header";
import { Formik } from "formik";
import { Icon, Button } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import Toast from "react-native-toast-message";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useTranslation } from "react-i18next";
const initialValues = {
  phone_number: "",
  name: "",
  last_name: "",
  address: "",
  email: "",
  password: "",
  username: "",
};
const SignUpScreen = ({ navigation }) => {
  const [passwordFocussed, setPassordFocussed] = useState(false);
  const [passwordBlured, setPasswordBlured] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { i18n } = useTranslation();

  // Inside your signUp function
  async function signUp(values) {
    const { phone_number, name, address, last_name, email, password } = values;

    // Check if any of the required fields is empty
    if (!phone_number || !name || !last_name || !email || !password) {
      Toast.show({
        type: "error",
        text1: i18n.t("PLEASE_FILL_ALL_FIELDS"),
        visibilityTime: 4000,
        autoHide: true,
      });
      return; // Don't proceed further if any field is empty
    }

    // Validate mobile number
    if (!phone_number || !/^(\+92)\d{10}$/.test(phone_number)) {
      Toast.show({
        type: "error",
        text1: i18n.t("ENTER_VALID_PHONE_NUMBER"),
        visibilityTime: 4000,
        autoHide: true,
      });
      return;
    }

    // Validate password
    if (
      !password ||
      !/(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(
        password
      )
    ) {
      Toast.show({
        type: "error",
        text1: i18n.t("PASSWORD_MUST_BE_STRONG"),
        visibilityTime: 4000,
        autoHide: true,
      });
      return;
    }

    try {
      // Attempt to create user
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      const uid = userCredential.user.uid; // Get the UID of the signed-in user
      //console.log(uid)

      const userDoc = firestore().collection("SignUpData").doc(uid);

      const docSnapshot = await userDoc.get();

      // Document doesn't exist, create a new one
      await userDoc.set({
        email,
        phone_number,
        name,
        last_name,
        address,
        password,
      });
      Toast.show({
        type: "success",
        text1: i18n.t("ACCOUNT_CREATED_SUCCESSFULLY"),
        visibilityTime: 4000,
        autoHide: true,
      });

      navigation.navigate("SignInScreen");
    } catch (error) {
      // Handle other error cases
      if (error.code === "auth/email-already-in-use") {
        Toast.show({
          type: "error",
          text1: i18n.t("EMAIL_ALREADY_EXIT"),
          visibilityTime: 4000,
          autoHide: true,
        });
      } else if (error.code === "auth/invalid-email") {
        Toast.show({
          type: "error",
          text1: i18n.t("INVALID_EMAIL_ENTER_CORRECT"),
          visibilityTime: 4000,
          autoHide: true,
        });
      } else {
        Toast.show({
          type: "error",
          text1: i18n.t("ACCOUNT_CREATION_FAILED"),
          visibilityTime: 4000,
          autoHide: true,
        });
      }
    }
  }

  return (
    <View style={styles.container}>
      <Header
        title={i18n.t("MY_ACCOUNT")}
        type="arrow-left"
        navigation={navigation}
      />
      <ScrollView keyboardShouldPersistTaps="always">
        <View>
          <Text style={title}>{i18n.t("SIGN_UP")} </Text>
        </View>

        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            signUp(values);
          }}
        >
          {(props) => (
            <View style={styles.view2}>
              <View>
                <Text style={styles.text2}>{i18n.t("NEW_ON_XFOOD")}</Text>
              </View>
              <View style={styles.view6}>
                <Text style={styles.flagEmoji}>🇵🇰</Text>
                <TextInput
                  placeholder="+92"
                  style={styles.input1}
                  
                  autoFocus={true}
                  onChangeText={props.handleChange("phone_number")}
                  value={props.values.phone_number}
                />
              </View>
              <View style={styles.view6}>
                <TextInput
                  placeholder={i18n.t("FIRST_NAME")}
                  style={styles.input1}
                  autoFocus={false}
                  onChangeText={props.handleChange("name")}
                  value={props.values.name}
                />
              </View>

              <View style={styles.view6}>
                <TextInput
                  placeholder={i18n.t("LAST_NAME")}
                  style={styles.input1}
                  autoFocus={false}
                  onChangeText={props.handleChange("last_name")}
                  value={props.values.last_name}
                />
              </View>

              <View style={styles.view6}>
                <TextInput
                  placeholder={i18n.t(
                    "ALI_123_MAIN_STREET_KARACHI_740000_PAKISTAN"
                  )}
                  style={styles.input1}
                  autoFocus={false}
                  onChangeText={props.handleChange("address")}
                  value={props.values.address}
                />
              </View>

              <View style={styles.view10}>
                <View>
                  <Icon
                    name="email"
                    style={styles.email}
                    color={colors.buttons}
                    type="material"
                  />
                </View>
                <View style={styles.view11}>
                  <TextInput
                    placeholder={i18n.t("EMAIL")}
                    style={styles.input4}
                    autoFocus={false}
                    onChangeText={props.handleChange("email")}
                    value={props.values.email}
                  />
                </View>
              </View>

              <View style={styles.view14}>
                <Animatable.View
                  animation={passwordFocussed ? "fadeInRight" : "fadeInLeft"}
                  duration={400}
                >
                  <Icon name="lock" color={colors.buttons} type="material" />
                </Animatable.View>
                <TextInput
                  placeholder={i18n.t("PASSWORD")}
                  style={{ flex: 1, fontSize: 13 }}
                  secureTextEntry={!showPassword}
                  autoFocus={false}
                  onChangeText={props.handleChange("password")}
                  value={props.values.password}
                  onFocus={() => setPassordFocussed(true)}
                  onBlur={() => setPasswordBlured(true)}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Animatable.View
                    animation={passwordFocussed ? "fadeInLeft" : "fadeInRight"}
                    duration={400}
                  >
                    <Icon
                      name={showPassword ? "visibility" : "visibility-off"}
                      color={colors.buttons}
                      type="material"
                      style={{ marginRight: 10 }}
                    />
                  </Animatable.View>
                </TouchableOpacity>
              </View>

              <View style={styles.view15}>
                <Text style={styles.text3}>
                  {i18n.t("BY_CREATING_OR_LOGGING_INTO_AN_ACCOUNT_YOU_ARE")}{" "}
                </Text>
                <View style={styles.view16}>
                  <Text style={styles.text3}>
                    {i18n.t("AGREEING_WITH_OUR")}{" "}
                  </Text>
                  <Text style={styles.text4}>
                    {" "}
                    {i18n.t("TERMS_CONDITIONS")}{" "}
                  </Text>
                  <Text style={styles.text3}> {i18n.t("AND")}</Text>
                </View>
                <Text style={styles.text4}>{i18n.t("PRIVACY_STATEMENT")}</Text>
              </View>
              <View style={styles.view17}>
                <Button
                  title={i18n.t("CREATE_MY_ACCOUNT")}
                  buttonStyle={parameters.styledButton}
                  titleStyle={parameters.buttonTitle}
                  onPress={() => {
                    props.handleSubmit();
                    // Add the navigation logic here
                  }}
                />
              </View>
            </View>
          )}
        </Formik>

        <View style={styles.view18}>
          <Text style={styles.text5}>{i18n.t("OR")}</Text>
        </View>
        <View style={styles.view19}>
          <View style={styles.view20}>
            <Text style={styles.text6}>
              {i18n.t("ALREADY_HAVE_AN_ACCOUNT_WITH_XFOOD")}
            </Text>
          </View>
          <View style={styles.view21}>
            <Button
              title={i18n.t("SIGN_IN")}
              buttonStyle={styles.button2}
              titleStyle={styles.title2}
              onPress={() => {
                navigation.navigate("SignInScreen");
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },

  view1: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
  },

  text1: { fontSize: 14, color: colors.buttons, fontWeight: "bold" },

  view2: {
    justifyContent: "flex-start",
    backgroundColor: "white",
    paddingHorizontal: 15,
  },

  view3: { marginTop: 5, marginBottom: 10 },

  text2: {
    fontSize: 14,
    color: colors.text,
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    marginTop: 15,
  },

  view4: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.grey4,
    borderRadius: 12,
    paddingLeft: 5,
  },

  view5: { marginLeft: 30, marginTop: 20 },

  input1: { fontSize: 13 },

  view6: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.buttons,
    borderRadius: 12,
    paddingLeft: 15,
    marginTop: 20,
    marginBottom: 3,
    marginHorizontal: 3,
  },

  view7: { marginLeft: 0, maxWidth: "65%" },

  input2: { fontSize: 16, marginLeft: 0, marginBottom: 0 },

  view8: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.grey4,
    borderRadius: 12,
    paddingLeft: 5,
    marginTop: 20,
    height: 48,
  },

  view9: { marginLeft: 0, maxWidth: "65%" },

  input3: { fontSize: 16, marginLeft: 0, marginBottom: 0 },

  view10: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.buttons,
    borderRadius: 12,
    paddingLeft: 15,
    marginTop: 20,
    marginBottom: 3,
    marginHorizontal: 3,
    height: 50,
  },

  email: { fontSize: 24, padding: 0, marginBottom: 0, marginTop: 11 },

  view11: { marginLeft: 30, maxWidth: "65%" },

  input4: { fontSize: 13, marginLeft: -25, marginBottom: -15, marginTop: -1 },

  view13: { flexDirection: "row", height: 40 },

  view14: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.buttons,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    paddingLeft: 15,
    marginTop: 20,
    marginHorizontal: 3,
  },

  view15: { alignItems: "center", justifyContent: "center", marginTop: 20 },

  text3: { fontSize: 13, color: colors.text },

  view16: { flexDirection: "row" },

  text4: {
    textDecorationLine: "underline",
    color: colors.buttons,
    fontSize: 13,
    fontWeight: "bold",
  },

  button1: {
    backgroundColor: colors.buttons,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.buttons,
    height: 50,
    paddingHorizontal: 20,
    width: "100%",
  },

  title1: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -3,
  },

  view17: { marginHorizontal: 5, marginTop: 30 },

  view18: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
  },

  text5: { fontSize: 16, fontWeight: "bold", color: colors.text },

  text6: {
    fontSize: 14,

    color: colors.text,
    marginRight: 70,
  },

  view19: { backgroundColor: "white", paddingHorizontal: 15 },

  view20: { marginTop: 10, marginLeft: 10 },

  view21: { marginTop: 5, alignItems: "flex-end" },

  button2: {
    backgroundColor: colors.background3,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.buttons,
    height: 42,
    paddingHorizontal: 30,
    // width:'100%'
    marginBottom: 20,
  },

  title2: {
    color: colors.buttons,
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -3,
  },
  flagEmoji: {
    fontSize: 20, // Adjust the size as needed
    marginTop: 10,
  },
});
