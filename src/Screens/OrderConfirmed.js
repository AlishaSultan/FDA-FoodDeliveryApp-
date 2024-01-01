import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { colors } from "../Global/styles";
import { useTranslation } from "react-i18next";

export default function OrderConfirmed({ route }) {
  const { t } = useTranslation();
  const [timer, setTimer] = useState(60);
  const [orderStatus, setOrderStatus] = useState(t("ORDER_CONFIRMED"));
  const [imageIndex, setImageIndex] = useState(0);

  const images = [
    require("../assets/oderConfirmed.png"),
    require("../assets/rider.jpg"),
    require("../assets/del3.png"),
  ];

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      clearInterval(countdownInterval);

      // Change image and order status based on the index
      if (imageIndex === 0) {
        setOrderStatus(t("RIDER_ON_WAY"));
      } else if (imageIndex === 1) {
        setOrderStatus(t("DELIVERED_THANKS"));
      } else if (imageIndex === 2) {
        // Stop at the last image and don't change the index or order status

        // Add a field to Firestore to indicate order delivery
        const { orderId } = route.params;
        if (orderId) {
          const currentUserUid = auth().currentUser.uid;
          firestore()
            .collection("orders")
            .doc(currentUserUid)
            .collection("user_orders")
            .doc(orderId)
            .update({ delivered: "Your order has been delivered" }) // Add a new field 'delivered' with value true
            .then(() => {
              console.log("Order delivered successfully");
            })
            .catch((error) => {
              console.error("Error updating order:", error);
            });
        }

        return;
      }

      // Increment the image index or reset to 0 if it reaches the end
      setImageIndex((prevIndex) => prevIndex + 1);
    }, 60000);

    // Clear intervals and timeouts when the component is unmounted
    return () => {
      clearInterval(countdownInterval);
      clearTimeout(timeout);
    };
  }, [imageIndex, route.params]);

  return (
    <View style={styles.container}>
      <Image source={images[imageIndex]} style={styles.image} />
      <View style={styles.timerContainer}>
        {/* <Text style={styles.timerText}>{timer} sec</Text> */}
      </View>
      <Text style={styles.orderStatusText}>{orderStatus}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    marginTop: 90,
    width: 450,
    height: 550,
    resizeMode: "contain",
  },
  timerContainer: {
    marginTop: 20,
  },
  timerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  orderStatusText: {
    marginTop: -30,
    fontSize: 18,
    fontWeight: "bold",
    color: colors.darkColor,
    textAlign: "center",
    justifyContent: "center",
  },
});
