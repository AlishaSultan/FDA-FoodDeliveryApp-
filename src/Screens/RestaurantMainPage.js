import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import RestaurantHeader from "../Components/RestaurantHeader";
import { ScrollView } from "react-native-gesture-handler";
import { restaurantData } from "../Global/Data";
import { colors } from "../Global/styles";
import { Icon } from "react-native-elements";
import { TabView, TabBar } from "react-native-tab-view";
import MenuScreen from "../Screens/RestaurantTabs/MenuScreen";
import { useCart } from "../contexts/CartContext";
import { useTranslation } from "react-i18next";

const SCREEN_WIDTH = Dimensions.get("window").width;
const initialLayout = SCREEN_WIDTH;

export default function RestaurantMainPage({ navigation, route }) {
  const { t } = useTranslation();
  const { restaurant } = route.params;
  const { cartCount } = useCart();
  const [routes] = useState([
    { key: "first", title: t("MENU") },
    { key: "second", title: t("INFO") },
    { key: "third", title: t("REVIEWS") },
    { key: "fourth", title: t("GALLERY") },
  ]);

  const [index, setIndex] = useState(0);

  // Find the restaurant in the data array based on the name
  const selectedRestaurant = restaurantData.find(
    (item) => item.restaurantName === restaurant
  );

  // If the restaurant is not found, you can handle it accordingly
  if (!selectedRestaurant) {
    return (
      <View style={styles.container}>
        <Text>Restaurant not found</Text>
      </View>
    );
  }

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: colors.cardbackground }}
      tabStyle={styles.tabStyle}
      scrollEnabled={true}
      style={styles.tab}
      labelStyle={styles.tabLabel}
      contentContainerStyle={styles.tabContainer}
    />
  );

  const UpdateRoute1 = ({ route }) => {};

  const menuPressed = () => {
    navigation.navigate("MenuProductScreen", {
      restaurant: selectedRestaurant?.restaurantName,
    });
  };

  // If the restaurant is found, render the details
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <RestaurantHeader
            id={selectedRestaurant.id}
            restaurantName={restaurant}
            navigation={navigation}
          />
          {selectedRestaurant.discount && (
            <View style={styles.view1}>
              <Text style={styles.text1}>
                {t("GET")} {selectedRestaurant.discount}
                {t("OFF_ON_FOOD_TOTAL")}
              </Text>
            </View>
          )}
          <View style={styles.view2}>
            <View style={styles.view3}>
              <Text style={styles.text2}>
                {selectedRestaurant.restaurantName}
              </Text>
              <Text style={styles.text3}>{selectedRestaurant.foodType}</Text>
              <View style={styles.view4}>
                <Icon
                  name="star"
                  type="material-community"
                  color={colors.darkColor}
                  size={15}
                />
                <Text style={styles.text4}>
                  {selectedRestaurant.averageReview}
                </Text>

                <Icon
                  name="map-marker"
                  type="material-community"
                  color={colors.darkColor}
                  size={14}
                />
                <Text style={styles.text6}>
                  {selectedRestaurant.farAway} {t("MI_AWAY")}
                </Text>
              </View>
            </View>
            <View style={styles.view5}>
              <Text style={styles.text18}>{t("COLLECT")}</Text>
              <View style={styles.view7}>
                <Text style={styles.text7}>
                  {selectedRestaurant.collectTime}
                </Text>
                <Text style={styles.text7}>{t("MIN")}</Text>
              </View>
            </View>
            <View style={styles.view8}>
              <Text style={styles.text9}>{t("DELIVERY")}</Text>
              <View style={styles.view9}>
                <Text style={styles.text11}>
                  {selectedRestaurant.deliveryTime}
                </Text>
                <Text style={styles.text11}>{t("MIN")}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.view10}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={UpdateRoute1}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            renderTabBar={renderTabBar}
            tabBarPosition="top"
          />
        </View>

        {index === 0 && (
          <MenuScreen
            navigation={navigation}
            route={{
              params: { restaurant: selectedRestaurant.restaurantName },
            }}
            onPress={menuPressed}
          />
        )}
      </ScrollView>
      <TouchableOpacity>
        <View style={styles.view11}>
          <View style={styles.view12}>
            <Text style={styles.text13}>
              {t("DELIGHT_IN_CULINARY_BLISS_WITH_US")}
            </Text>
            <View style={styles.view13}>
              {/* <Text style = {styles.text14}>{cartCount}</Text> */}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  view1: {
    width: "100%",
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  text1: {
    color: colors.darkColor,
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  view2: {
    flexDirection: "row",
    flex: 1,
    marginBottom: 5,
    marginHorizontal: 10,
    justifyContent: "space-between",
    marginTop: 5,
  },
  view3: {
    flex: 8,
  },
  text2: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  text3: {
    fontSize: 12,
    color: colors.text,
  },
  view4: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  text4: {
    fontSize: 12,
    color: colors.text,
    marginLeft: 2,
  },
  text5: {
    fontSize: 12,
    color: colors.text,
    marginLeft: 2,
    marginRight: 5,
  },
  text6: {
    fontSize: 12,
    color: colors.text,
    marginLeft: 0,
    fontWeight: "bold",
  },
  view5: {
    flex: 3,
    alignItems: "center",
  },
  text18: {
    fontSize: 13,
    fontWeight: "bold",
    color: colors.darkColor,
  },
  view7: {
    width: 40,
    height: 40,
    alignItems: "center",
    borderRadius: 20,
    justifyContent: "space-around",
  },
  text7: {
    fontSize: 13,
    color: colors.text,
    marginTop: 5,
  },
  view8: {
    flex: 3,
    alignItems: "center",
  },
  text9: {
    fontSize: 13,
    fontWeight: "bold",
    color: colors.darkColor,
  },
  view9: {
    width: 45,
    height: 45,
    backgroundColor: colors.buttons,
    alignItems: "center",
    borderRadius: 50,
    justifyContent: "space-around",
  },
  text10: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.cardbackground,
    marginTop: 5,
  },
  text11: {
    fontSize: 12,
    color: colors.cardbackground,
    marginBottom: 0,
  },
  view10: {
    elevation: 10,
    backgroundColor: colors.pagebackground,
    marginTop: 7,
  },
  view11: {
    backgroundColor: colors.buttons,
    height: 45,
    marginBottom: 0,
  },
  view12: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  text12: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 18,
    color: colors.cardbackground,
  },
  view13: {
    borderWidth: 2,
    borderColor: colors.cardbackground,
    borderTopLeftRadius: 15,

    width: 25,
    marginLeft: 270,
    marginTop: 10,
  },
  text13: {
    paddingHorizontal: 3,
    fontWeight: "bold",
    fontSize: 16,
    color: colors.cardbackground,
    marginTop: 10,
  },
  text14: {
    paddingHorizontal: 6,
    fontWeight: "bold",
    fontSize: 18,
    color: colors.cardbackground,
  },
  tab: {
    paddingTop: 0,
    backgroundColor: colors.buttons,
    justifyContent: "center",
    alignItems: "center",
  },
  tabContainer: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontWeight: "bold",
    color: colors.cardbackground,
    fontSize: 14,
  },
  tabStyle: {
    width: SCREEN_WIDTH / 4,
    maxHeight: 45,
  },
  view14: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: colors.buttons,
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 18,
  },
  text15: {
    fontWeight: "bold",
    marginLeft: 28,
    color: "white",
    fontSize: 15,
  },

  view15: {
    marginTop: 5,
    paddingBottom: 20,
  },
});
