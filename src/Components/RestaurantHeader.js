import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Animated,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { colors } from "../Global/styles";
import { restaurantData } from "../Global/Data";
import { Icon } from "react-native-elements";

export default function RestaurantHeader({ navigation, id, restaurantName }) {
  // Filter the restaurant data based on the restaurant name
  const filteredRestaurant = restaurantData.find(
    (restaurant) => restaurant.restaurantName === restaurantName
  );

  const index2 = 10;
  const currentValue = new Animated.Value(1);
  const [liked, setLiked] = useState(false);
  const [counter, setCounter] = useState(-2);
  const [visible, setVisible] = useState(false);

  const likeHandler = () => {
    if (liked == false) setVisible(true);

    setLiked(!liked);
    setCounter(index2);
  };

  useEffect(() => {
    if (liked == true) {
      Animated.spring(currentValue, {
        toValue: 3,
        friction: 2,
        useNativeDriver: true,
      }).start(() => {
        Animated.spring(currentValue, {
          toValue: 1,
          useNativeDriver: true,
          friction: 2,
        }).start(() => {
          setVisible(false);
        });
      });
    }
  }, [liked]);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.container}
        source={{ uri: filteredRestaurant.images }}
      >
        <View style={styles.view1}>
          <View style={styles.view2}>
            <Icon
              name="arrow-left"
              type="material-community"
              color={colors.darkColor}
              size={25}
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={styles.view3}>
            <Icon
              name={liked && index2 == counter ? "favorite" : "favorite-border"}
              type="material"
              color="red"
              size={25}
              onPress={likeHandler}
            />
          </View>
        </View>
        <View>
          <View style={styles.view4}>
            {visible && index2 === counter && (
              <Animated.View style={{ transform: [{ scale: currentValue }] }}>
                <Icon name="favorite" size={40} color="red" type="material" />
              </Animated.View>
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 270,
  },
  image: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginTop: 0,
  },
  view1: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  view2: {
    margin: 10,
    width: 40,
    height: 40,
    backgroundColor: colors.cardbackground,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  view3: {
    margin: 10,
    width: 40,
    height: 40,
    backgroundColor: colors.cardbackground,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  view4: {
    marginTop: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
