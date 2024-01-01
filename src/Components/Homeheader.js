// Header.js

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon, withBadge } from "react-native-elements";
import { colors, parameters } from "../Global/styles";
import CartItems from "../Screens/CartItems";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useTranslation } from "react-i18next";
export default function Header({ navigation }) {
  const [count, setCount] = useState(null);
  const { i18n } = useTranslation();

  const getCurrentUserUid = () => {
    const user = auth().currentUser;
    return user ? user.uid : null;
  };

  const getCountFromFirestore = async (uid) => {
    try {
      const addressSnapshot = await firestore()
        .collection("cartCount")
        .doc(uid);
      addressSnapshot.onSnapshot((doc) => {
        if (doc.exists) {
          const countData = doc.data();
          const userCount = countData.count;
          setCount(userCount);
        } else {
          console.log("Document does not exist");
          setCount(null);
        }
      });
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  useEffect(() => {
    const uid = getCurrentUserUid();
    if (uid) {
      getCountFromFirestore(uid);
    }
  }, []);

  const updateCartCount = async () => {
    const uid = getCurrentUserUid();
    if (uid) {
      try {
        const fetchedCount = await getCountFromFirestore(uid);
        setCount(fetchedCount);
      } catch (error) {
        console.error("Error updating cart count:", error);
      }
    }
  };

  const BadgeIcon = withBadge(count, {
    left: 5,
    top: -2,
    backgroundColor: "red",
    textStyle: { fontSize: 9 },
  })(Icon);

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={styles.menuIcon}
      >
        <Icon
          type="material-community"
          name="menu"
          color={colors.cardbackground}
          size={26}
        />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>XFood</Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate(CartItems)}
        style={styles.cartIcon}
      >
        <BadgeIcon
          type="material-community"
          name="cart"
          size={26}
          color={colors.cardbackground}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: colors.buttons,
    height: parameters.headerHeight,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  menuIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: colors.cardbackground,
    fontSize: 22,
    fontWeight: "bold",
  },
  cartIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
});
