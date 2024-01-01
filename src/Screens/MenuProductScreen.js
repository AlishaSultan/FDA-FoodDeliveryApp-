import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
import { colors } from "../Global/styles";
import { Icon } from "react-native-elements";
import { Route1 } from "./Menu";
import { restaurantData } from "../Global/Data";
import { useTranslation } from "react-i18next";
const MenuProductScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { restaurant } = route?.params || {};
  const selectedRestaurant = restaurantData.find(
    (item) => item.restaurantName === restaurant
  );

  return (
    <View style={styles.container}>
      <View style={styles.view14}>
        <Icon
          name="arrow-left"
          type="material-community"
          color="white"
          size={23}
          iconStyle={{ marginLeft: 10 }}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.text15}>{t("MENU")}</Text>
      </View>

      {/* Pass the restaurant name to Route1 */}
      <Route1
        navigation={navigation}
        route={{ params: { restaurant: selectedRestaurant?.restaurantName } }}
      />
    </View>
  );
};

export default MenuProductScreen;

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },

  container: { flex: 1, top: 0, left: 0, right: 0 },

  view1: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: colors.buttons,
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 25,
  },

  text1: {
    fontWeight: "bold",
    marginLeft: 40,
    color: colors.black,
    fontSize: 18,
  },

  view2: { marginTop: 5, paddingBottom: 20 },

  tab: {
    paddingTop: 0,
    backgroundColor: colors.buttons,
    justifyContent: "space-between",
    // alignItems:"center"
  },

  tabContainer: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },

  tabLabel: { fontWeight: "bold", color: colors.cardbackground },

  tabStyle: { width: SCREEN_WIDTH / 4, maxHeight: 45 },
  scene2: { backgroundColor: "#673ab7" },
  view14: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: colors.buttons,
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 30,
  },
  text15: {
    fontWeight: "bold",
    marginLeft: 24,
    color: "white",
    fontSize: 20,
  },
});
