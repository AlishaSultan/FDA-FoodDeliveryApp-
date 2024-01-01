// LanguageSelectionScreen.js
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../Global/styles";
import { Button } from "react-native-elements";

const LanguageSelectionScreen = ({ navigation }) => {
  const { i18n } = useTranslation();

  const changeLanguage = async (language) => {
    await AsyncStorage.setItem("appLanguage", language);
    i18n.changeLanguage(language);
    navigation.replace("CustomButtons"); // Replace with your main screen
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Image source={require("../assets/language.png")} style={styles.logo} />
        <Text style={styles.language}>Select Language</Text>

        <View style={styles.buttonContainer}>
          <Button
            title="English"
            buttonStyle={styles.createButton}
            titleStyle={styles.createButtonTitle}
            onPress={() => changeLanguage("en")}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title=" اردو"
            buttonStyle={styles.createButton}
            titleStyle={styles.createButtonTitle}
            onPress={() => changeLanguage("ur")}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Español"
            buttonStyle={styles.createButton}
            titleStyle={styles.createButtonTitle}
            onPress={() => changeLanguage("es")}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="عربي"
            buttonStyle={styles.createButton}
            titleStyle={styles.createButtonTitle}
            onPress={() => changeLanguage("ar")}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: width, // Set width to 100%
    height: height, // Set height to cover the entire screen
    backgroundColor: colors.buttons,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: width * 0.8, // 80% of the screen width
    height: undefined,
    aspectRatio: 1,
    marginBottom: 20,
  },
  language: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 15,
    width: width * 0.8, // 70% of the screen width
  },
  createButton: {
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 3,
    borderColor: colors.darkColor,
    height: 55,
  },
  createButtonTitle: {
    color: "#F9629F",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LanguageSelectionScreen;
