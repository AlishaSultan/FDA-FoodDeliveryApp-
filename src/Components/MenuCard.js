import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { colors } from "../Global/styles";

export default function MenuCard({ name, price, image, productDetails }) {
  return (
    <View style={styles.view1}>
      <View style={styles.view2}>
        <View style={styles.view3}>
          <Text style={styles.text1}>{name}</Text>
          <View>
            <Text style={styles.text2}>{productDetails}</Text>
          </View>
          <Text style={styles.text3}>Rs {price}</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Image style={styles.image} source={{ uri: image }} />
        </View>
      </View>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  view1: {
    backgroundColor: "white",
    elevation: 8,
    shadowOpacity: 0.4,
    shadowColor: colors.darkColor,
    margin: 5,
    padding: 20,
  },

  view2: {
    flex: 1,
    flexDirection: "row",
    padding: 0,
    justifyContent: "space-between",
  },

  view3: { flex: 6, justifyContent: "space-between" },

  text1: {
    fontSize: 15,
    color: colors.text,
    fontWeight: "bold",
  },

  text2: {
    fontSize: 12,
    color: colors.text,
    marginRight: 2,
  },

  text3: {
    fontSize: 12,
    color: colors.darkColor,
  },

  image: { flex: 1, height: 70 },
});
