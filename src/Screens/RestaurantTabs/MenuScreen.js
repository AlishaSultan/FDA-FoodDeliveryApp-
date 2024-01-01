import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { Icon, Button } from "react-native-elements";
import { restaurantData, specialData } from "../../Global/Data";
import { colors } from "../../Global/styles";
import { useTranslation } from "react-i18next";
export default function MenuScreen({ navigation, route, onPress }) {
  const { t } = useTranslation();
  // Use optional chaining to avoid errors if route or route.params is undefined
  const { restaurant } = route?.params || {};
  const selectedRestaurant = restaurantData.find(
    (item) => item.restaurantName === restaurant
  );

  if (!selectedRestaurant) {
    return (
      <View style={styles.container}>
        <Text>Restaurant not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        {specialData.map((specialItem) => (
          <TouchableWithoutFeedback key={specialItem.key}>
            <View style={styles.view2}>
              <Icon name="star" type="material-community" color="gold" />
              <Text style={styles.text1}>{t(specialItem.title)}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <Text style={styles.text2} onPress={onPress}>
          {t("SEE_MENU")}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
  view2: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    padding: 20,
    borderBottomColor: colors.grey5,
  },
  text1: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },

  text2: {
    fontSize: 16,
    marginTop: 10,
    color: colors.darkColor,
    marginRight: 20,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});
