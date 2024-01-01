import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import MenuCard from "../Components/MenuCard";
import { restaurantData } from "../Global/Data";

export function Route1({ navigation, route }) {
  const { restaurant } = route.params || {};

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    // Set the selected restaurant based on the received parameter
    setSelectedRestaurant(restaurant);
  }, [restaurant]);

  // Log the received parameters

  const filteredData = selectedRestaurant
    ? restaurantData.find((item) => item.restaurantName === selectedRestaurant)
        ?.productData || []
    : restaurantData.flatMap((item) => item.productData);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.view2}>
        <FlatList
          style={{ backgroundColor: "white" }}
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("PreferenceScreen", {
                  index,
                  image: item.image,
                  name: item.name,
                  price: item.price,
                  productDetails: item.productDetails,
                  restaurant: restaurant,
                });
              }}
            >
              <MenuCard
                name={item.name}
                image={item.image}
                price={item.price}
                productDetails={item.productDetails}
              />
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: "#673ab7",
  },

  view2: {
    marginTop: 5,
    paddingBottom: 20,
  },

  scene2: { backgroundColor: "#673ab7" },
});
