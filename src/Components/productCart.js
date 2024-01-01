import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { colors } from "../Global/styles";
import { restaurantData } from "../Global/Data";
const ProductCart = ({ name, price, image }) => {
  return (
    <View style={styles.view1}>
      <View style={styles.view2}>
        <View style={styles.view3}>
          <Text style={styles.text1}>{name}</Text>
          <Text style={styles.text2}>Rs {price}</Text>
        </View>
        <View>
          <View style={styles.view4}>
            <Image style={styles.image} source={{ uri: image }} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductCart;

const styles = StyleSheet.create({
  view1: {
    backgroundColor: "white",
    elevation: 2,
    shadowOpacity: 0.4,
    shadowColor: "black",
    margin: 5,
    width: 250,
    padding: 10,
    marginLeft: 10,
  },

  view2: {
    flexDirection: "row",
    padding: 0,
    justifyContent: "space-between",
  },

  view3: {
    justifyContent: "space-between",
    width: 110,
  },

  text1: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "bold",
  },

  text2: {
    fontSize: 12,
    color: colors.text,
  },

  view4: {
    width: 75,
    height: 65,
  },

  image: {
    height: 65,
    width: 75,
  },
});
