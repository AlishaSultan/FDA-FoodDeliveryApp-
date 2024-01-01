import React from "react";
import { View, Modal, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Icon, Button } from "react-native-elements";
import { colors } from "../Global/styles";
import { useTranslation } from "react-i18next";
const QuantityModal = ({
  visible,
  onClose,
  onIncrement,
  onDecrement,
  itemName,
  currentQuantity,
}) => {
  const { t } = useTranslation();
  //console.log('Current Quantity:', currentQuantity);
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.edit}>{t("ADJUST_QUNATITY")}</Text>
          <Text style={styles.edit1}>{itemName}</Text>
          <Text style={styles.current}>
            {t("CURRENT_QUANTITY")}: {currentQuantity}
          </Text>
          <View style={styles.buttons}>
            <Icon
              reverse
              name="add-outline"
              type="ionicon"
              color={colors.darkColor}
              onPress={onIncrement}
            />
            <Icon
              reverse
              name="remove-outline"
              type="ionicon"
              color="red"
              onPress={onDecrement}
            />
            <Icon
              reverse
              name="close-outline"
              type="ionicon"
              color="green"
              onPress={onClose}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 40,
    borderRadius: 25,
    elevation: 5,
    width: "80%", // Adjust the width as needed
    alignSelf: "center",
    opacity: 1, // Set opacity as needed
    borderColor: colors.darkColor,
    borderWidth: 2,
  },
  buttons: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: -5,
    justifyContent: "space-evenly",
  },

  createButton1: {
    width: 90,
    height: 45,
    borderRadius: 15,
    backgroundColor: colors.darkColor,
  },
  createButtonTitle: {
    color: "white",
    fontSize: 16,
  },

  edit: {
    alignSelf: "center",
    marginTop: -20,
    fontSize: 18,
    color: colors.darkColor,
    fontWeight: "bold",
  },
  edit1: {
    marginTop: 20,
    fontSize: 15,
    color: colors.text,
    fontWeight: "bold",
  },
  current: {
    marginTop: 10,
    fontSize: 15,
    color: colors.text,
    fontWeight: "bold",
  },
});

export default QuantityModal;
