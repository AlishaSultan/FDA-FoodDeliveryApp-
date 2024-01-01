import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { colors } from "../Global/styles";
import ProductCart from "./productCart";
import { restaurantData } from "../Global/Data";
import { FlatList } from "react-native-gesture-handler";

const SearchResultCard = ({
  onPressRestaurantCard,
  restaurantName,
  deliveryAvailable,
  discountAvailable,
  discountPercent,
  numberofReview,
  businessAddress,
  farAway,
  averageReview,
  images,
  productData,
}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPressRestaurantCard}>
        <View style={styles.view1}>
          <View style={{ height: 150 }}>
            <ImageBackground
              style={{ height: 250 }}
              source={{ uri: images }}
              imageStyle={styles.imageStyle}
            />

            <View style={styles.image}>
              <Text style={styles.text1}>{averageReview}</Text>
              <Text style={styles.text3}>{numberofReview} reviews</Text>
            </View>
          </View>

          <View style={styles.view3}>
            <View style={{ paddingTop: 5 }}>
              <Text style={styles.text5}>{restaurantName}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.view4}>
                <Icon
                  name="place"
                  type="material"
                  color={colors.darkColor}
                  size={18}
                  iconStyle={{ marginTop: 6.5 }}
                />

                <Text style={styles.view5}>{farAway}Min</Text>
              </View>
              <View style={{ flex: 9 }}>
                <Text style={styles.text6}>{businessAddress}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View style={{ marginTop: 5, paddingBottom: 20 }}>
        <FlatList
          style={{ backgroundColor: colors.cardbackground }}
          data={productData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ProductCart
              image={item.image}
              name={item.name}
              price={item.price}
            />
          )}
          horizontal={true}
        />
      </View>
    </View>
  );
};

export default SearchResultCard;

const styles = StyleSheet.create({
  view1: {
    marginHorizontal: 9,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },

  image: {
    position: "absolute",
    top: 0,
    right: 0,

    padding: 2,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 12,
  },
  imageStyle: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },

  text1: {
    color: "white",
    fontSize: 16,
    marginRight: 0,
    marginLeft: 0,
    fontWeight: "bold",
  },

  view2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -5,
  },

  text3: {
    fontSize: 15,

    color: "white",
    marginRight: 5,
  },

  text4: {
    fontSize: 10,
    fontWeight: "bold",
    color: colors.text,
  },

  view3: {
    flexDirection: "column",
    marginHorizontal: 10,
    marginTop: 100,
  },

  text5: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.text,
  },

  view4: {
    flex: 4,
    flexDirection: "row",
    borderRightWidth: 1,
    borderColor: colors.darkColor,
  },

  view5: {
    fontSize: 12,
    fontWeight: "bold",
    paddingTop: 7,
    color: colors.text,
  },

  text6: {
    fontSize: 12,
    paddingTop: 7,
    color: colors.text,
    paddingHorizontal: 10,
  },
});
