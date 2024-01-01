import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";
import { colors, parameters } from "../Global/styles";
import Data from "../Global/Data";

export default function FoodCard({
  OnPressFoodCard,
  restaurantName,
  deliveryAvailable,
  discountAvailable,
  discountPercent,
  numberofReview,
  businessAddress,
  farAway,
  averageReview,
  images,
  screenWidth,
}) {
  return (
    <TouchableOpacity>
      <View style={{ ...styles.cardView, width: screenWidth }}>
        <Image
          style={{ ...styles.image, width: screenWidth }}
          source={{ uri: images }}
        />

        <View>
          <View>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
          </View>

          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={styles.distance}>
              <Icon
                name="place"
                type="material"
                color={colors.buttons}
                size={18}
                iconStyle={{
                  marginTop: 6,
                }}
              />

              <Text style={styles.Min}>{farAway} Min</Text>
            </View>
            <View style={{ flex: 9, flexDirection: "row" }}>
              <Text style={styles.address}>{businessAddress}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.review}>
        <Text style={styles.average}>{averageReview}</Text>
        <Text style={{ color: "white" }}>{numberofReview} reviews</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardView: {
    marginHorizontal: 9,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderWidth: 1,
    borderColor: "#E11584",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },

  image: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 150,
  },

  restaurantName: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.buttons,
    marginTop: 5,
    marginLeft: 15,
  },

  distance: {
    flex: 4,
    flexDirection: "row",
    borderRightColor: "#F9629F",
    paddingHorizontal: 10,
    borderRightWidth: 1,
  },

  Min: {
    fontSize: 12,
    fontWeight: "bold",
    paddingTop: 5,
    color: "#F9629F",
  },

  address: {
    fontSize: 12,
    paddingTop: 5,
    color: "#F9629F",
    paddingHorizontal: 10,
  },

  review: {
    position: "absolute",
    top: 0,
    right: 10,
    color: "white",
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 12,
  },

  average: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: -3,
  },
});
