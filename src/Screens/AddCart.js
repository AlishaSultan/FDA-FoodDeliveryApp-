// AddCart.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { colors } from "../Global/styles";
import { Icon, Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import firestore from "@react-native-firebase/firestore";
import OrderConfirmed from "./OrderConfirmed";
import { useTranslation } from "react-i18next";
export default function AddCart({ navigation, route }) {
  const { t } = useTranslation();
  const {
    name,
    quantity,
    totalPrice,
    restaurant,
    image,
    productDetails,
    selectedPreferenceNames,
  } = route.params || {};

  const [deliveryOption, setDeliveryOption] = useState("Leave at the Door");
  const [instruction, setInstruction] = useState("");

  const handleInstructionChange = (text) => {
    setInstruction(text);
  };

  const [storedInstruction, setStoredInstruction] = useState("");
  const [storedDeliveryOption, setStoredDeliveryOption] = useState("");
  //const [cartItems, setCartItems] = useState([]); // Initialize cartItems state
  const getCurrentUserUid = () => {
    const user = auth().currentUser;

    if (user) {
      return user.uid;
    } else {
      return null;
    }
  };

  const handleButtonClick = () => {
    if (instruction.trim() === "") {
      Toast.show({
        type: "error",
        text1: t("PLEASE_ENTER_SOME_TEXT"),
        visibilityTime: 4000,
        autoHide: true,
      });
    } else {
      setStoredInstruction(instruction);
      setStoredDeliveryOption(deliveryOption);

      Toast.show({
        type: "success",
        text1: t("INSTRUCTION_ADDED_SUCCESSFULLY"),
        visibilityTime: 4000,
        autoHide: true,
      });
    }
  };

  const OrderPlace = async () => {
    const currentUserUid = getCurrentUserUid();

    if (currentUserUid) {
      const orderData = {
        name,
        quantity,
        totalPrice,
        restaurant,
        image,
        productDetails,
        selectedPreferenceNames,
        deliveryOption: storedDeliveryOption,
        instruction: storedInstruction,
        // Add any other relevant data you want to store in Firestore
      };

      // Store order data in Firestore
      const addedOrder = await firestore()
        .collection("orders")
        .doc(currentUserUid)
        .collection("user_orders")
        .add(orderData);

      // Get the order ID from the addedOrder reference
      const newOrderId = addedOrder.id;
      //console.log('Newly added order ID:', newOrderId);

      navigation.navigate("OrderConfirmed", { orderId: newOrderId });
    } else {
      // Handle the case where the user is not authenticated
      // You may want to redirect the user to the login screen or show an error message
      Toast.show({
        type: "error",
        text1: "User not authenticated",
        visibilityTime: 4000,
        autoHide: true,
      });
    }
  };

  const [address, setAddress] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Fetch the current user ID
    const unsubscribeAuth = auth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      }
    });

    const unsubscribeAddress = firestore()
      .collection("SignUpData")
      .doc(userId)
      .onSnapshot((documentSnapshot) => {
        setAddress(documentSnapshot.data()?.address || "");
      });

    // Clean up the subscriptions when the component unmounts
    return () => {
      unsubscribeAuth();

      unsubscribeAddress();
    };
  }, [userId]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.view14}>
          <Icon
            name="arrow-left"
            type="material-community"
            color="white"
            size={22}
            iconStyle={{ marginLeft: 10 }}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.text15}>{t("YOUR_ORDER")}</Text>
        </View>
        <View style={styles.view1}>
          <Text style={styles.text1}>{restaurant}</Text>
        </View>
        <View style={styles.view2}>
          <Icon
            type="material-community"
            name="clock"
            color={colors.darkColor}
            size={18}
          />
          <Text style={styles.text2}> {t("ESTIMATED_DELIVERY_TIME")}</Text>
        </View>

        <View style={styles.map}>
          <Icon
            type="material-community"
            name="map-marker"
            color={colors.darkColor}
            size={22}
            iconStyle={{ marginLeft: -5, marginTop: -1 }}
          />
          <View style={styles.maptext}>
            <Text style={styles.maptext1}>{address}</Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 30,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setDeliveryOption("Leave at the Door");
            }}
          >
            <View
              style={{
                ...styles.deliveryButton,
                backgroundColor:
                  deliveryOption === "Leave at the Door"
                    ? (color = "#E11584")
                    : (color = colors.buttons),
              }}
            >
              <Text style={styles.deliveryText}>{t("LEAVE_AT_THE_DOOR")}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setDeliveryOption("Meet at the Door");
            }}
          >
            <View
              style={{
                ...styles.deliveryButton,
                backgroundColor:
                  deliveryOption === "Leave at the Door"
                    ? (color = colors.buttons)
                    : (color = "#E11584"),
              }}
            >
              <Text style={styles.deliveryText}>{t("MEET_AT_THE_DOOR")}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.view3}>
          <Text style={styles.text3}>{t("YOUR_ORDER")}</Text>
        </View>
        <View style={styles.view4}>
          <Image style={styles.backgroundImage} source={{ uri: image }} />
          <View>
            <View style={styles.view6}>
              <Text style={styles.text6}>{name}</Text>
            </View>
            <View style={styles.view6}>
              <Text style={styles.text12}>{productDetails}</Text>
            </View>
          </View>

          <View>
            {selectedPreferenceNames.length > 0 ? (
              <Text style={styles.text9}>
                {selectedPreferenceNames.map((preferenceName, index) => (
                  <Text
                    style={[
                      styles.text10,
                      index === 0 ? styles.firstPreference : null,
                    ]}
                    key={index}
                  >
                    {preferenceName}
                    {index !== selectedPreferenceNames.length - 1 && "\n"}
                  </Text>
                ))}
              </Text>
            ) : (
              <Text style={styles.noPreferenceText}>
                {t("NO_EXTRA_ITEMS_SELECTED")}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.view7}>
          <Text style={styles.text11}>
            {t("TOTAL_PRICE")}: Rs {totalPrice}
          </Text>
        </View>

        <View>
          <Text style={styles.inputText}>{t("ENTER_YOUR_INSTRUCTION")}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <TextInput
            style={styles.input}
            onChangeText={handleInstructionChange}
            value={instruction}
          />
        </View>
        <Button
          title={t("SUBMIT")}
          buttonStyle={styles.createButton}
          titleStyle={styles.createButtonTitle1}
          onPress={handleButtonClick}
        />

        <View>
          <Text style={styles.payment}>{t("PAYMENT_METHOD")}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../assets/cash_on_delivery.png")}
            style={styles.backgroundImage1}
          />
          <Text style={styles.text14}>{t("CASH_ON_DELIVERY")}</Text>
        </View>
        <Text style={styles.text16}>{t("DELIVERY_CHARGES")}: 70</Text>
        <Text style={styles.text17}>
          {t("TOTAL_PRICE")}: Rs {(parseFloat(totalPrice) + 70).toFixed(2)}
        </Text>

        <View>
          <Button
            title={t("PLACE_ORDER")}
            buttonStyle={styles.createButton1}
            titleStyle={styles.createButtonTitle}
            onPress={() => {
              OrderPlace();
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view14: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: colors.buttons,
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 30,
  },
  text15: {
    fontWeight: "bold",
    marginLeft: 28,
    color: "white",
    fontSize: 20,
  },
  view1: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  text1: {
    fontSize: 17,
    color: colors.darkColor,
    fontWeight: "bold",
  },
  text2: {
    fontSize: 14,
    color: colors.buttons,
    fontWeight: "bold",
  },
  view2: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  deliveryButton: {
    paddingHorizontal: 20,
    borderRadius: 15,
    paddingVertical: 10,
  },
  deliveryText: {
    marginLeft: 5,
    fontSize: 14,
    color: "white",
  },
  view3: {
    marginTop: 30,
    marginLeft: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text3: {
    fontSize: 16,
    color: colors.buttons,
    fontWeight: "bold",
  },
  text4: {
    marginRight: 30,
    fontSize: 18,
    color: colors.buttons,
    fontWeight: "bold",
  },
  backgroundImage: {
    width: "95%", //null,
    height: 250, //HEADER_MAX_HEIGHT,
    borderRadius: 15,
  },
  view4: {
    marginLeft: 15,
    marginTop: 10,
  },
  view5: {
    marginTop: 10,
    marginLeft: 20,
  },
  text5: {
    fontSize: 15,
    color: colors.text,
    fontWeight: "bold",
  },
  text6: {
    fontSize: 16,
    color: colors.darkColor,
    fontWeight: "bold",
  },
  text9: {
    marginTop: 10,
  },
  text10: {
    textAlign: "justify",
    fontSize: 14,
    color: colors.text,
  },
  firstPreference: {
    marginLeft: 2,
  },
  text11: {
    fontSize: 16,
    color: colors.darkColor,
    fontWeight: "bold",
    marginTop: 10,
  },
  view6: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text12: {
    fontSize: 14,
    color: colors.buttons,
    fontWeight: "bold",
    marginTop: -5,
  },
  view7: {
    alignItems: "center",
    justifyContent: "center",
  },
  noPreferenceText: {
    color: colors.text,
    marginTop: 10,
    fontWeight: "bold",
  },

  view8: {
    marginTop: 20,
    marginLeft: 20,
  },
  view9: {
    marginLeft: 190,
    marginTop: 2,
  },
  input: {
    height: 120,
    borderColor: colors.darkColor,
    borderWidth: 2,
    borderRadius: 15,
    width: "90%",
    marginLeft: 18,
    color: colors.text,
  },
  inputText: {
    marginTop: 20,
    fontSize: 16,
    color: colors.buttons,
    marginLeft: 25,
    fontWeight: "bold",
  },
  createButton: {
    backgroundColor: "#F9629F",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.buttons,
    height: 40,
    width: "30%",
    marginTop: 20,
    marginLeft: 20,
  },

  createButton1: {
    backgroundColor: "#F9629F",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginLeft: 40,
    borderColor: colors.buttons,
    height: 50,
    width: "80%",
    marginTop: 20,
    marginBottom: 3,
  },

  createButtonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "-3",
  },

  createButtonTitle1: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "-3",
  },

  backgroundImage1: {
    width: 70,
    height: 60,
    marginTop: 20,
    marginLeft: 20,
  },

  payment: {
    color: colors.text,
    marginTop: 20,
    fontWeight: "bold",
    color: colors.text,
    marginLeft: 32,
    fontSize: 16,
  },
  text14: {
    marginTop: 30,
    marginLeft: 2,
    fontWeight: "bold",
    fontSize: 15,
    color: colors.text,
  },
  text16: {
    marginTop: -10,
    marginLeft: 110,
    fontWeight: "bold",
    fontSize: 15,
    color: colors.text,
  },
  text17: {
    marginTop: 10,
    marginLeft: 110,
    fontWeight: "bold",
    fontSize: 16,
    color: colors.darkColor,
  },
  map: {
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 20,
  },
  maptext1: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "bold",
  },
});
