import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, ScrollView, Image } from "react-native";
import { colors } from "../Global/styles";
import { Icon, CheckBox, Button } from "react-native-elements";
import { menuDetailedData } from "../Global/Data";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useCart } from "../contexts/CartContext";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
export default function PreferenceScreen({ route, navigation }) {
  const { t } = useTranslation();
  const { image, name, price, productDetails, restaurant } = route.params || {};

  const { updateCartCount } = useCart();
  const [count, setCount] = useState(0); // Local count variable

  const updateFirebaseCartCount = async (newCount) => {
    try {
      const userId = auth().currentUser.uid;
      const countDocRef = firestore().collection("cartCount").doc(userId);

      await countDocRef.set({ count: newCount }, { merge: true });
    } catch (error) {
      console.error("Error updating cart count in Firebase:", error);
    }
  };
  const addToCart = async () => {
    // Assuming you have the item details and preferences available
    const newItem = {
      quantity,
      totalPrice,
      name,
      restaurant,
      image,
      productDetails,
      selectedPreferenceNames: Object.entries(selectedPreferences)
        .filter(([itemId, isSelected]) => isSelected)
        .map(([itemId]) => {
          return preferenceData
            .flat()
            .find((item) => item.id.toString() === itemId)?.name;
        }),
      dishPrice,
    };

    try {
      const userId = auth().currentUser.uid;
      const cartItemsRef = firestore().collection("cartItems").doc(userId);

      const snapshot = await cartItemsRef.get();
      const existingItems = snapshot.exists ? snapshot.data().items || [] : [];

      // Check if the item already exists in the cart
      const isItemInCart = existingItems.some(
        (item) => item.name === newItem.name
      );

      if (isItemInCart) {
        // If the item is already in the cart, show a toastr message
        Toast.show({
          type: "error",
          text1: t("ITEM_ALREADY_INTO_CART"),
          visibilityTime: 4000,
          autoHide: true,
        });
      } else {
        // If the item is not in the cart, add it
        await cartItemsRef.set(
          { items: [...existingItems, newItem] },
          { merge: true }
        );

        // Update the local count variable and the CartContext
        const newCount = existingItems.length + 1;
        setCount(newCount);
        updateCartCount(newCount);

        // Update the count in Firebase
        updateFirebaseCartCount(newCount);

        // Show success toastr message
        Toast.show({
          type: "success",
          text1: t("ITEM_ADDED_INTO_CART_SUCCESSFULLY"),
          visibilityTime: 4000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const [quantity, setQuantity] = useState(1);

  const preferenceTitles = menuDetailedData[0].preferenceTitle;
  const required = menuDetailedData[0].required;
  const minimumQuantity = menuDetailedData[0].minimum_quatity;
  const preferenceData = menuDetailedData[0].preferenceData;
  const [totalPrice, setTotalPrice] = useState(price || 0);
  const dishPrice = price || 0; // Also set dishPrice to 0 if price is not available

  const [selectedPreferences, setSelectedPreferences] = useState(() => {
    const initialState = {};
    preferenceData.forEach((group) => {
      group.forEach((item) => {
        initialState[item.id] = false;
      });
    });
    return initialState;
  });

  const handleCheckboxChange = (itemId, itemPrice) => {
    setSelectedPreferences((prevState) => {
      const updatedState = { ...prevState, [itemId]: !prevState[itemId] };

      const newTotalPrice = calculateTotalPrice(updatedState);

      setTotalPrice(newTotalPrice);
      return handleSelectionConstraints(updatedState);
    });
  };

  // Function to handle selection constraints
  const handleSelectionConstraints = (updatedState) => {
    const { minimum_quatity, required } = menuDetailedData[0];

    // Iterate through each preference group
    preferenceData.forEach((group, groupIndex) => {
      const selectedItemsInGroup = group.filter(
        (item) => updatedState[item.id]
      );

      // Check constraints only if required is true
      if (required[groupIndex]) {
        // Ensure at least minimum_quatity items are selected
        if (selectedItemsInGroup.length < minimumQuantity[groupIndex]) {
          // If not enough items selected, unselect all items in this group
          group.forEach((item) => (updatedState[item.id] = false));
        } else {
          // If enough items selected, unselect any extra items in this group
          selectedItemsInGroup
            .slice(minimumQuantity[groupIndex])
            .forEach((item) => {
              updatedState[item.id] = false;
            });
        }
      }
    });

    return updatedState;
  };

  // Function to calculate the total price
  // Function to calculate the total price
  // Function to calculate the total price
  // Function to calculate the total price
  const calculateTotalPrice = () => {
    const itemPrices = Object.entries(selectedPreferences)
      .filter(([itemId, isSelected]) => isSelected)
      .map(([itemId]) => {
        const selectedItem = preferenceData
          .flat()
          .find((item) => item.id.toString() === itemId);
        return selectedItem ? selectedItem.price || 0 : 0;
      });

    const totalItemPrice = itemPrices.reduce(
      (acc, itemPrice) => acc + itemPrice,
      0
    );

    // Provide a default value (0) for dishPrice if it's undefined
    const totalPrice =
      (dishPrice || 0) + totalItemPrice + (quantity - 1) * (dishPrice || 0);

    return totalPrice.toFixed(2);
  };

  // Function to handle quantity increase
  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Function to handle quantity decrease
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const navigateToAddCart = () => {
    const selectedPreferenceNames = Object.entries(selectedPreferences)
      .filter(([itemId, isSelected]) => isSelected)
      .map(([itemId]) => {
        return preferenceData
          .flat()
          .find((item) => item.id.toString() === itemId)?.name;
      });

    navigation.navigate("AddCart", {
      quantity: quantity, // Pass the quantity parameter
      totalPrice: calculateTotalPrice(),
      name,
      restaurant,
      image,
      productDetails,
      selectedPreferenceNames,
      dishPrice,
    });
  };

  // const navigateToCartItems = () => {
  //   const selectedPreferenceNames = Object.entries(selectedPreferences)
  //     .filter(([itemId, isSelected]) => isSelected)
  //     .map(([itemId]) => {
  //       return preferenceData.flat().find((item) => item.id.toString() === itemId)?.name;
  //     });

  //   navigation.navigate('CartItems', {
  //     quantity: quantity, // Pass the quantity parameter
  //     totalPrice: calculateTotalPrice(),
  //     name,
  //     restaurant,
  //     image,
  //     productDetails,
  //     selectedPreferenceNames,
  //     dishPrice,

  //   });
  // };

  // ...

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image style={styles.backgroundImage} source={{ uri: image }} />
        </View>
        <View style={styles.bar}>
          <Text style={styles.title}>{t("CHOOSE_A_PREFERENCE")}</Text>
        </View>
        <View style={styles.view12}>
          <Icon
            name="arrow-left"
            type="material-community"
            color={colors.darkColor}
            size={30}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <View style={styles.view1}>
          <Text style={styles.text1}>{name}</Text>
          <Text style={styles.text2}>{productDetails}</Text>
        </View>
        <View style={styles.view2}>
          <Text style={styles.text3}>{t("CHOOSE_A_MEAL_TYPE")}</Text>
          <View style={styles.view3}>
            <Text style={styles.text4}>{t("REQUIRED")}</Text>
          </View>
        </View>
        <View style={styles.view4}>
          <View style={styles.view5}>
            <View style={styles.view6}>
              <CheckBox
                center
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={true}
                checkedColor={colors.buttons}
              />
              <Text style={styles.text5}>- - - - -</Text>
            </View>
            <Text style={styles.text6}>Rs {price.toFixed(2)}</Text>
          </View>
        </View>

        {preferenceTitles.map((title, index) => (
          <View key={index}>
            <View style={styles.view7}>
              <Text style={styles.text8}>{title}</Text>
              {required[index] && (
                <View style={styles.view9}>
                  <Text style={styles.text7}>
                    {menuDetailedData[0].minimum_quatity[index]}
                    {t("REQUIRED")}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.view10}>
              {preferenceData[index].map((items) => (
                <View key={items.id} style={styles.view4}>
                  <View style={styles.view19}>
                    <View style={styles.view6}>
                      <CheckBox
                        center
                        checkedIcon="check-square-o"
                        uncheckedIcon="square-o"
                        checked={selectedPreferences[items.id]}
                        checkedColor={colors.buttons}
                        onPress={() =>
                          handleCheckboxChange(items.id, items.price)
                        }
                      />
                      <Text
                        style={{
                          color: colors.text,
                          marginLeft: -10,
                          fontSize: 13,
                        }}
                      >
                        {items.name}
                      </Text>
                    </View>
                    <Text style={styles.text6}>
                      Rs {items.price.toFixed(2)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.view13}>
        <Text style={styles.text11}>{t("QUANTITY")}</Text>
      </View>
      <View style={styles.view14}>
        <View style={styles.view15}>
          <Icon
            name="remove"
            type="material"
            color={"white"}
            size={20}
            onPress={handleDecrease}
          />
        </View>
        <Text style={styles.text9}>{quantity}</Text>
        <View style={styles.view16}>
          <Icon
            name="add"
            type="material"
            color={"white"}
            size={20}
            onPress={handleIncrease}
          />
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <View style={styles.buttons}>
          <Button
            title={t("CHECK_OUT")}
            onPress={() => {
              navigateToAddCart();
            }}
            buttonStyle={styles.createButton2}
            titleStyle={styles.createButtonTitle}
          />
          <Button
            title={`Add ${quantity} to Cart Rs ${calculateTotalPrice()}`}
            buttonStyle={styles.createButton1}
            titleStyle={styles.createButtonTitle}
            onPress={() => {
              addToCart();
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    width: "100%",
    backgroundColor: colors.buttons,
    overflow: "hidden",
    height: 350, //HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    width: "100%", //null,
    height: 350, //HEADER_MAX_HEIGHT,
    resizeMode: "cover",
  },
  bar: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: colors.darkColor,
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 310,
  },
  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    //paddingTop: Platform.OS !== 'ios' ?
    //HEADER_MAX_HEIGHT : 0,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center",
  },

  view1: {
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5,
  },

  text1: { fontSize: 18, color: colors.buttons, fontWeight: "bold" },

  text2: { fontSize: 14, color: colors.text, marginTop: 5 },
  view2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.buttons,
    height: 45,
  },

  text3: { fontSize: 15, fontWeight: "bold", color: "white", marginLeft: 15 },
  view3: {
    borderWidth: 3,
    borderColor: colors.darkColor,
    borderRadius: 15,
    marginRight: 10,
  },

  text4: { fontWeight: "bold", color: "white", padding: 5, fontSize: 12 },

  view4: { backgroundColor: "white", marginBottom: 10, marginLeft: -5 },
  view5: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 10,
  },
  view6: { flexDirection: "row", alignItems: "center" },
  text5: { fontWeight: "bold", marginLeft: -10, color: colors.buttons },
  text6: { fontSize: 13, fontWeight: "bold", color: colors.darkColor },
  view7: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.buttons,
    height: 45,
    marginTop: -10,
  },
  text8: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    marginLeft: 15,
    marginBottom: 5,
  },
  view9: {
    borderWidth: 3,
    borderColor: colors.darkColor,
    borderRadius: 15,
    marginRight: 10,
  },

  text7: { fontWeight: "bold", color: "white", padding: 5, fontSize: 12 },

  view10: { backgroundColor: "white", marginBottom: 10 },

  view11: { flexDirection: "row", alignItems: "center" },

  view12: { position: "absolute", top: 35, left: 15 },
  view13: {
    paddingBottom: 0,
    marginTop: -8,
    backgroundColor: colors.buttons,
    height: 45,
  },

  text11: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginLeft: 15,
    marginTop: 10,
  },

  view14: {
    flexDirection: "row",
    backgroundColor: colors.cardbackground,
    paddingVertical: 5,
    marginBottom: 0,
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 5,
  },

  view15: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: colors.darkColor,
    alignItems: "center",
    justifyContent: "center",
  },

  text9: { fontWeight: "bold", fontSize: 14, color: colors.darkColor },
  view16: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: colors.darkColor,
    alignItems: "center",
    justifyContent: "center",
  },

  view19: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 10,
  },
  buttons: {
    flexDirection: "row",
    marginTop: -15,
    marginBottom: -5,
    justifyContent: "space-around",
    marginBottom: 0,
    backgroundColor: "white",
  },

  createButton1: {
    width: 200,
    height: 50,
    borderRadius: 15,
    backgroundColor: colors.darkColor,
    height: 45,
  },
  createButton2: {
    width: 120,
    height: 50,
    borderRadius: 15,
    backgroundColor: colors.darkColor,
    height: 45,
  },
  createButtonTitle: {
    color: "white",
    fontSize: 14,
  },
});
