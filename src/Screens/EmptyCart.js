// EmptyCart.js

import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../Global/styles";

const EmptyCart = () => {
  return (
    <View style={styles.emptyContainer}>
      <Image
        source={require("../assets/emptyCart.png")} // Replace with the actual path to your image
        style={styles.image}
      />
      <Text style={styles.emptyText}>Nothing in the cart</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,

    marginTop: 220,
  },
  image: {
    width: 350, // Adjust the width as needed
    height: 350, // Adjust the height as needed
    marginBottom: 20, // Add margin to separate the image from the text
    marginLeft: 0,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
});

export default EmptyCart;
