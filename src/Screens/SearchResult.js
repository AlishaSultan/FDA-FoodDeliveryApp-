import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, FlatList } from "react-native";
import SearchResultCard from "../Components/SearchResultCard";
import { restaurantData, filterData } from "../Global/Data";
import { colors } from "../Global/styles";
import RestaurantMainPage from "./RestaurantMainPage";
import { useTranslation } from "react-i18next";
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function SearchResult({ navigation, route }) {
  const { t } = useTranslation();
  // State to hold filtered restaurants
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  // Effect to filter restaurants based on the selected category
  useEffect(() => {
    const selectedCategory = route.params.item;

    // Check if a category is selected
    if (selectedCategory) {
      // Filter restaurants based on the selected category
      const categoryResults = restaurantData.filter(
        (restaurant) => restaurant.category === selectedCategory
      );

      // Update the filtered results
      setFilteredRestaurants(categoryResults);
    } else {
      // If no category is selected, show all restaurants
      setFilteredRestaurants(restaurantData);
    }
  }, [route.params.item]);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ backgroundColor: colors.cardbackground }}
        data={filteredRestaurants}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <SearchResultCard
            screen_width={SCREEN_WIDTH}
            images={item.images}
            averageReview={item.averageReview}
            numberofReview={item.numberofReview}
            restaurantName={item.restaurantName}
            farAway={item.farAway}
            businessAddress={item.businessAddress}
            productData={item.productData}
            onPressRestaurantCard={() => {
              navigation.navigate("RestaurantMainPage", {
                id: index,
                restaurant: item.restaurantName,
              });
            }}
          />
        )}
        ListHeaderComponent={
          <View>
            <Text style={styles.listHeader}>
              {filteredRestaurants.length} {t("SEARCH_RESULT_FOR")}{" "}
              {route.params.item}
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  listHeader: {
    color: colors.darkColor,
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 15,
    fontWeight: "bold",
  },
});
