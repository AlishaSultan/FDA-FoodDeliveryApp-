import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, parameters } from "../Global/styles";
import { Icon } from "react-native-elements";
export default function Header({ title, type, navigation }) {
  return (
    <View style={styles.header}>
      <View style={{ marginLeft: 20, marginTop: 6 }}>
        <Icon
          type="entypo"
          name={type}
          color={colors.headerText}
          size={26}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: colors.buttons,
    height: parameters.headerHeight,
  },

  headerText: {
    color: colors.headerText, // Add a comma here
    fontSize: 20, // Add a comma here
    fontWeight: "bold",

    marginLeft: 30,

    marginTop: 5,
  },
});
