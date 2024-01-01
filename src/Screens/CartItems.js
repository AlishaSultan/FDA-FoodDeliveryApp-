import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { Card, Icon, Button } from "react-native-elements";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { colors } from "../Global/styles";
import QuantityModal from "../Screens/QuantityModel"; // Import the QuantityModal component
import Toast from "react-native-toast-message";
import EmptyCart from "../Screens/EmptyCart";
import { useTranslation } from "react-i18next";
const CartItems = ({ navigation }) => {
  const { t } = useTranslation();
  const [cartItems, setCartItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedPreferences, setEditedPreferences] = useState([]);
  const [newPreference, setNewPreference] = useState("");
  const [quantityModalVisible, setQuantityModalVisible] = useState(false);
  const [selectedItemForQuantity, setSelectedItemForQuantity] = useState(null);

  // Add these state variables

  const navigateToAddToCart = (item) => {
    // Navigate to AddToCart screen and pass the item data
    navigation.navigate("AddtoCart", {
      item: item,
      onOrderPlaced: handleOrderPlaced,
    });
  };
  const handleOrderPlaced = () => {
    // Implement the logic to update cartItems after placing the order
    // For example, you can refetch the cartItems or remove the specific item
    // and update the state
    // ...

    // For example, you can clear the cartItems
    setCartItems([]);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const currentUser = auth().currentUser;

        if (currentUser) {
          const userId = currentUser.uid;
          const cartItemsRef = firestore().collection("cartItems").doc(userId);
          const snapshot = await cartItemsRef.get();

          if (snapshot.exists) {
            const items = snapshot.data().items || [];
            setCartItems(items);
          } else {
            setCartItems([]);
          }
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleDeleteItem = async (itemName) => {
    try {
      const currentUser = auth().currentUser;

      if (currentUser) {
        const userId = currentUser.uid;
        const cartItemsRef = firestore().collection("cartItems").doc(userId);

        const updatedItems = cartItems.filter((item) => item.name !== itemName);

        await cartItemsRef.set({ items: updatedItems }, { merge: true });

        setCartItems(updatedItems);
        Toast.show({
          type: "error",
          text1: t("ITEM_ADD"),
          visibilityTime: 4000,
          autoHide: true,
        });

        // Calculate the new cart count
        const newCount = updatedItems.length;

        // Update the cart count in the cartCount collection
        const countDocRef = firestore().collection("cartCount").doc(userId);
        await countDocRef.set({ count: newCount }, { merge: true });
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEditPreferences = (item) => {
    setSelectedItem(item);
    setEditedPreferences([...item.selectedPreferenceNames]); // Clone preferences for editing
    toggleModal();
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSavePreferences = () => {
    if (selectedItem) {
      // Update preferences in Firestore (replace this with your logic)
      const currentUser = auth().currentUser;

      if (currentUser) {
        const userId = currentUser.uid;
        const cartItemsRef = firestore().collection("cartItems").doc(userId);

        const updatedItems = cartItems.map((item) => {
          if (item.name === selectedItem.name) {
            return {
              ...item,
              selectedPreferenceNames: editedPreferences,
            };
          }
          return item;
        });

        cartItemsRef.set({ items: updatedItems }, { merge: true });

        setCartItems(updatedItems);
      }

      // Close the modal
      toggleModal();
    }
  };

  const handleAddPreference = () => {
    if (newPreference.trim() !== "") {
      setEditedPreferences([...editedPreferences, newPreference.trim()]);
      setNewPreference("");
    }
  };

  const handleEditPreference = (index, newValue) => {
    const updatedPreferences = [...editedPreferences];
    updatedPreferences[index] = newValue.trim();
    setEditedPreferences(updatedPreferences.filter(Boolean));
  };

  const openQuantityModal = (item) => {
    setSelectedItemForQuantity(item);
    setQuantityModalVisible(true);
  };

  const handleQuantityChange = async (operation) => {
    try {
      const currentUser = auth().currentUser;

      if (currentUser && selectedItemForQuantity) {
        const userId = currentUser.uid;
        const cartItemsRef = firestore().collection("cartItems").doc(userId);

        const updatedItems = cartItems.map((item) =>
          item.name === selectedItemForQuantity.name
            ? {
                ...item,
                quantity:
                  operation === "increment"
                    ? item.quantity + 1
                    : Math.max(item.quantity - 1, 1),
                totalPrice: item.dishPrice * (item.quantity + 1), // Use item.quantity directly
              }
            : item
        );

        await cartItemsRef.set({ items: updatedItems }, { merge: true });

        // Update the currentQuantity based on the selected item
        const updatedSelectedItem = updatedItems.find(
          (item) => item.name === selectedItemForQuantity.name
        );

        setSelectedItemForQuantity(updatedSelectedItem);
        setCartItems(updatedItems);
        Toast.show({
          type: "success",
          text1: t("ITEM_REMOVED"),
          visibilityTime: 2000,
          autoHide: true,
        });

        if (operation !== "increment" && operation !== "decrement") {
          setQuantityModalVisible(false);
          setSelectedItemForQuantity(null);
        }
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Card containerStyle={styles.cardContainer}>
            <Card.Image source={{ uri: item.image }} style={styles.cardImage} />
            <Text style={styles.price}>
              {t("TOTAL_P")}: Rs {item.totalPrice}
            </Text>
            <Text style={styles.quantity}>
              {t("QUANTITY_")}: {item.quantity}{" "}
              <TouchableOpacity onPress={() => openQuantityModal(item)}>
                <Icon
                  name="pencil"
                  type="material-community"
                  color={colors.darkColor}
                  size={15}
                />
              </TouchableOpacity>
            </Text>

            <TouchableOpacity
              onPress={() => handleDeleteItem(item.name)}
              style={{
                position: "absolute",
                top: 7,
                right: 2,
              }}
            >
              <Icon name="delete" color="red" size={22} />
            </TouchableOpacity>

            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>

              <View>
                <TouchableOpacity onPress={() => handleEditPreferences(item)}>
                  {item.selectedPreferenceNames && (
                    <Text style={styles.preferences}>
                      {t("PREFERENCES")}✎:{" "}
                      {item.selectedPreferenceNames.join(", ")}
                    </Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.buttons1}>
                    <Button
                      title={t("CHECKOUT")}
                      buttonStyle={styles.createButton2}
                      titleStyle={styles.createButtonTitle}
                      onPress={() => navigateToAddToCart(item)}
                    />
                  </View>
                </TouchableOpacity>
                <Modal
                  visible={isModalVisible}
                  transparent={true}
                  animationType="fade"
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <Text style={styles.edit}>{t("EDIT_PREFERENCE")}</Text>
                      {editedPreferences.map((preference, index) => (
                        <TextInput
                          key={index}
                          value={preference}
                          onChangeText={(newValue) =>
                            handleEditPreference(index, newValue)
                          }
                        />
                      ))}
                      <View style={styles.field}>
                        <TextInput
                          style={styles.input}
                          placeholder={t("ADD_NEW_PRE")}
                          value={newPreference}
                          onChangeText={(text) => setNewPreference(text)}
                        />
                      </View>
                      <View style={styles.buttons}>
                        <Button
                          title={t("ADD")}
                          buttonStyle={styles.createButton1}
                          titleStyle={styles.createButtonTitle}
                          onPress={handleAddPreference}
                        />
                        <Button
                          title={t("SAVE")}
                          buttonStyle={styles.createButton1}
                          titleStyle={styles.createButtonTitle}
                          onPress={handleSavePreferences}
                        />
                        <Button
                          title={t("CLOSE")}
                          buttonStyle={styles.createButton1}
                          titleStyle={styles.createButtonTitle}
                          onPress={toggleModal}
                        />
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
          </Card>
        )}
        ListHeaderComponent={() => (
          <View style={styles.view14}>
            <Icon
              name="arrow-left"
              type="material-community"
              color="white"
              size={22}
              iconStyle={{ marginLeft: 10 }}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.text15}>{t("YOUR_CART")}</Text>
          </View>
        )}
        ListFooterComponent={() =>
          quantityModalVisible && (
            // Example of using QuantityModal in your CartItems component
            <QuantityModal
              visible={quantityModalVisible}
              onClose={() => setQuantityModalVisible(false)}
              onIncrement={() => handleQuantityChange("increment")}
              onDecrement={() => handleQuantityChange("decrement")}
              itemName={
                selectedItemForQuantity ? selectedItemForQuantity.name : ""
              }
              currentQuantity={
                selectedItemForQuantity ? selectedItemForQuantity.quantity : 0
              }
            />
          )
        }
      />
      {cartItems.length !== 0 ? null : (
        <>
          <EmptyCart />
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 15,
    margin: 10,
    padding: 5,
    flexDirection: "row",
    borderColor: colors.darkColor,
    marginBottom: 0.2,
  },
  cardImage: {
    height: 120,
    width: 150,
    borderRadius: 25,
  },
  textContainer: {
    marginTop: 10,
  },
  field: {
    marginTop: 20,
    borderColor: colors.darkColor,
    borderWidth: 2,
    borderRadius: 25,
    height: 45,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
    alignSelf: "center", // Add this line
    marginTop: "12%",
    color: colors.darkColor,
  },

  details: {
    fontSize: 14,
    color: colors.darkColor,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: "bold",
    marginLeft: 5,
  },
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
  price: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: -90,
    marginLeft: 160,
    color: colors.darkColor,
  },
  quantity: {
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 160,
    fontSize: 14,
    color: colors.text,
    fontWeight: "bold",
  },
  restaurant: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: -5,
    marginLeft: 150,
    color: colors.darkColor,
  },
  preferences: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 10,
    fontWeight: "bold",
  },
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
    marginLeft: 28,
    color: "white",
    fontSize: 20,
  },
  edit: {
    alignSelf: "center",
    fontSize: 16,
    color: colors.darkColor,
    fontWeight: "bold",
  },
  input: {
    marginLeft: 15,
    color: colors.text,
  },
  buttons: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: -5,
    justifyContent: "space-around",
  },

  createButton1: {
    width: 60,
    height: 35,
    borderRadius: 15,
    backgroundColor: colors.darkColor,
  },
  createButtonTitle: {
    color: "white",
    fontSize: 12,
  },
  buttons1: {
    flexDirection: "row",
    marginTop: 2,
    marginBottom: -5,
    justifyContent: "space-around",
    marginLeft: 230,
    marginBottom: -3,
  },

  createButton2: {
    width: "100%",
    height: 45,
    borderRadius: 15,
    backgroundColor: colors.darkColor,
    marginLeft: "0.9%",
  },
});

export default CartItems;
