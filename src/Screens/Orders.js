import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  useWindowDimensions,
} from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { colors } from "../Global/styles";
import { useTranslation } from "react-i18next";

export default function Orders() {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState("");
  const [userId, setUserId] = useState("");
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    // Fetch the current user ID
    const unsubscribeAuth = auth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      }
    });

    // Fetch orders
    const unsubscribeOrders = firestore()
      .collection("orders")
      .doc(userId)
      .collection("user_orders")
      .onSnapshot((querySnapshot) => {
        const fetchedOrders = [];
        querySnapshot.forEach((documentSnapshot) => {
          fetchedOrders.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });
        setOrders(fetchedOrders);
      });

    // Fetch user address
    const unsubscribeAddress = firestore()
      .collection("SignUpData")
      .doc(userId)
      .onSnapshot((documentSnapshot) => {
        setAddress(documentSnapshot.data()?.address || "");
      });

    // Clean up the subscriptions when the component unmounts
    return () => {
      unsubscribeAuth();
      unsubscribeOrders();
      unsubscribeAddress();
    };
  }, [userId]); // Include userId in the dependency array to update when it changes

  return (
    <View style={styles.container}>
      <View style={styles.view14}>
        <View style={{ marginTop: -height * 0.12, marginLeft: -width * 0.42 }}>
          <Image
            source={require("../assets/order.png")}
            style={{ width: width * 1.3, height: height * 0.3 }} // Set the width and height as per your requirements
          />
        </View>
      </View>

      <ScrollView>
        {orders.map((order) => (
          <View key={order.id} style={styles.card}>
            <View style={styles.card1}>
              <View style={styles.image}>
                <Image
                  source={{ uri: order.image }}
                  style={{
                    width: width * 0.3,
                    height: height * 0.15,
                    borderRadius: width * 0.05,
                  }} // Set the width and height as per your requirements
                />
              </View>
              <View style={styles.info}>
                <Text style={styles.text1}>
                  {t("RESTAURANT_NAME")}: {order.restaurant}
                </Text>
                <Text style={styles.text1}>
                  {t("DISH_NAME")}: {order.name}
                </Text>
                {order.selectedPreferenceNames?.length > 0 ? (
                  <Text style={styles.text1}>
                    {order.selectedPreferenceNames.map(
                      (preferenceName, index) => (
                        <Text
                          style={[
                            styles.text10,
                            index === 0 ? styles.firstPreference : null,
                          ]}
                          key={index}
                        >
                          {preferenceName}
                          {index !== order.selectedPreferenceNames.length - 1 &&
                            "\n"}
                        </Text>
                      )
                    )}
                  </Text>
                ) : (
                  <Text style={{ color: colors.text }}>
                    {t("NO_EXTRA_ITEMS_SELECTED")}
                  </Text>
                )}

                <Text style={styles.text1}>
                  {t("QUANTITY")}: {order.quantity}
                </Text>
                <Text style={styles.text1}>
                  {t("TOTAL_PRICE")}: {order.totalPrice}
                </Text>
                <Text style={styles.text2}>{order.delivered}</Text>
              </View>
              {/* Add other order details as needed */}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    marginTop: 5,
    borderRadius: 15,
    borderColor: colors.darkColor,
    borderWidth: 1,
  },
  container: {
    flex: 1,
  },
  view14: {
    flexDirection: "row",
    alignItems: "center",
    padding: 90,
    backgroundColor: colors.buttons,
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 200,
    borderColor: colors.darkColor,
    borderWidth: 5,
    borderBottomEndRadius: 25,
    borderBottomLeftRadius: 25,
  },
  image: {
    marginLeft: -7,
    marginTop: -10,
  },
  card1: {
    flexDirection: "row",
  },
  info: {
    flexDirection: "column",
    marginLeft: 10,
  },
  text1: {
    color: colors.text,
    fontWeight: "bold",
    fontSize: 12,
  },
  text2: {
    marginLeft: 20,
    marginTop: 10,
    color: colors.darkColor,
    fontWeight: "bold",
  },
  orders: {
    justifyContent: "center",
    textAlign: "center",
  },
  text6: {},
});
