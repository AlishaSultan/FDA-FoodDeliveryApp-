import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import { Icon } from "react-native-elements";
import Homeheader from "../Components/Homeheader";
import { colors, parameters } from "../Global/styles";
import { filterData, restaurantData } from "../Global/Data";
import FoodCard from "../Components/FoodCard";
import Countdown from "react-native-countdown-component";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useTranslation } from "react-i18next";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Home({ navigation }) {
  const [delivery, setDelivery] = useState(true);
  const [indexCheck, setIndexCheck] = useState("0");

  const [address, setAddress] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Fetch the current user ID
    const unsubscribeAuth = auth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      }
    });

    const unsubscribeAddress = firestore()
      .collection("SignUpData")
      .doc(userId)
      .onSnapshot((documentSnapshot) => {
        setAddress(documentSnapshot.data()?.address || "");
      });

    // Clean up the subscriptions when the component unmounts
    return () => {
      unsubscribeAuth();

      unsubscribeAddress();
    };
  }, [userId]);

  const { i18n } = useTranslation();
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="#F9629F"
      />
      <Homeheader navigation={navigation} />
      <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={true}>
        <View style={{ backgroundColor: "#ffa6c9", paddingBottom: 5 }}>
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setDelivery(true);
              }}
            >
              <View
                style={{
                  ...styles.deliveryButton,
                  backgroundColor: delivery
                    ? (color = "#E11584")
                    : (color = colors.buttons),
                }}
              >
                <Text style={styles.deliveryText}>{i18n.t("DELIVERY")}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setDelivery(false);
                navigation.navigate("MapScreen");
              }}
            >
              <View
                style={{
                  ...styles.deliveryButton,
                  backgroundColor: delivery
                    ? (color = colors.buttons)
                    : (color = "#E11584"),
                }}
              >
                <Text style={styles.deliveryText}>{i18n.t("PICK_UP")}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.main}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 30,
              backgroundColor: "#E11584",
              borderRadius: 10,
              paddingVertical: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 15,
              }}
            >
              <Icon
                type="material-community"
                name="map-marker"
                color="white"
                size={22}
              />

              <Text style={{ marginLeft: 5, color: "white", fontSize: 12 }}>
                {address ? address : "Loading address..."}...
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.cate}>
          <Text
            style={{ color: colors.text, fontSize: 18, fontWeight: "bold" }}
          >
            {i18n.t("CATEGORIES")}
          </Text>
        </View>

        <View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={filterData}
            keyExtractor={(item) => item.id}
            extraData={indexCheck}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => {
                  setIndexCheck(item.id);
                }}
              >
                <View
                  style={
                    indexCheck === item.id
                      ? { ...styles.smallCardSelected }
                      : { ...styles.smallCard }
                  }
                >
                  <Image
                    style={{ height: 60, width: 60, borderRadius: 50 }}
                    source={item.image}
                  />
                  <View>
                    <Text
                      style={
                        indexCheck === item.id
                          ? { ...styles.smallCardTextSelected }
                          : { ...styles.smallCardText }
                      }
                    >
                      {i18n.t(item.name)}
                    </Text>
                  </View>
                </View>
              </Pressable>
            )}
          />
          <View>
            <View style={styles.cate}>
              <Text
                style={{ color: colors.text, fontSize: 16, fontWeight: "bold" }}
              >
                {i18n.t("FREE_DELIVERY_NOW")}
              </Text>
            </View>
          </View>
        </View>

        <View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#F9629F",
                marginLeft: 20,
                fontSize: 14,
                marginTop: 15,
              }}
            >
              {i18n.t("OPTIONS_CHANGING_IN")}
            </Text>
            <Countdown
              style={{ color: "#F9629F" }}
              until={133260}
              size={13}
              digitStyle={{
                backgroundColor: "#E11584",
                marginTop: 10,
                marginLeft: 8,
              }}
              digitTxtStyle={{ color: "white" }}
            />
          </View>
          <FlatList
            style={{ marginTop: 10, marginBottom: 10 }}
            horizontal={true}
            data={restaurantData}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={{ marginRight: 5 }}>
                <FoodCard
                  screenWidth={SCREEN_WIDTH * 0.8}
                  images={item.images}
                  restaurantName={item.restaurantName}
                  farAway={item.farAway}
                  businessAddress={item.businessAddress}
                  averageReview={item.averageReview}
                  numberofReview={item.numberofReview}
                />
              </View>
            )}
          />

          <View>
            <View style={styles.cate}>
              <Text
                style={{ color: colors.text, fontSize: 16, fontWeight: "bold" }}
              >
                {i18n.t("PROMOTION_AVAILABLE")}
              </Text>
            </View>
          </View>
        </View>

        <View>
          <FlatList
            style={{ marginTop: 10, marginBottom: 10 }}
            horizontal={true}
            data={restaurantData}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={{ marginRight: 5 }}>
                <FoodCard
                  screenWidth={SCREEN_WIDTH * 0.8}
                  images={item.images}
                  restaurantName={item.restaurantName}
                  farAway={item.farAway}
                  businessAddress={item.businessAddress}
                  averageReview={item.averageReview}
                  numberofReview={item.numberofReview}
                />
              </View>
            )}
          />
        </View>
        <View></View>

        <View style={styles.cate}>
          <Text
            style={{ color: colors.text, fontSize: 16, fontWeight: "bold" }}
          >
            {i18n.t("RESTAURANT_IN_YOUR_AREA")}
          </Text>
        </View>

        <View style={{ width: SCREEN_WIDTH, paddingTop: 10 }}>
          {restaurantData.map((item) => (
            <View key={item.id} style={{ paddingBottom: 20 }}>
              <FoodCard
                screenWidth={SCREEN_WIDTH * 0.95}
                images={item.images}
                restaurantName={item.restaurantName}
                farAway={item.farAway}
                businessAddress={item.businessAddress}
                averageReview={item.averageReview}
                numberofReview={item.numberofReview}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      {delivery && (
        <View style={styles.floatButton}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("MapScreen");
            }}
          >
            <Icon name="place" type="material" size={26} color={"#E11584"} />

            <Text style={{ color: "#F9629F", textAlign: "center" }}>
              {i18n.t("MAP")}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },

  deliveryButton: {
    paddingHorizontal: 20,
    borderRadius: 15,
    paddingVertical: 5,
  },

  deliveryText: {
    marginLeft: 5,
    fontSize: 15,

    color: "white",
  },

  main: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },

  cate: {
    marginTop: 20,
    marginHorizontal: 20,
  },

  smallCard: {
    borderRadius: 30,
    backgroundColor: colors.cardbackground,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    width: 90,
    margin: 10,
    height: 90,
  },

  smallCardSelected: {
    borderRadius: 30,
    backgroundColor: colors.buttons,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    width: 90,
    margin: 10,
    height: 90,
  },

  smallCardTextSelected: {
    fontSize: 11,
    color: "white",
  },
  smallCardText: {
    fontSize: 11,
    color: "#F9629F",
  },

  floatButton: {
    position: "absolute",
    bottom: 10,
    right: 15,
    backgroundColor: "white",
    elevation: 10,
    width: 55,
    height: 55,
    borderRadius: 30,
    alignItems: "center",
  },
});
