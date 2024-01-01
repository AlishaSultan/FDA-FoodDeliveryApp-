import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions,
} from "react-native";
import SearchComponent from "../Components/SearchComponent";
import { colors } from "../Global/styles";
import { filterData } from "../Global/Data";
import { useTranslation } from "react-i18next";
const SCREEN_WIDTH = Dimensions.get("window").width;
export default function SearchScreen({ navigation }) {
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1, marginBottom: 30 }}>
      <SearchComponent />

      <View>
        <FlatList
          style={{ marginBottom: 1 }}
          data={filterData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate("SearchResult", { item: item.name });
              }}
            >
              <View style={styles.imageView}>
                <ImageBackground style={styles.image} source={item.image}>
                  <View style={styles.textView}>
                    <Text style={{ color: "white" }}>{item.name}</Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableWithoutFeedback>
          )}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListHeaderComponent={
            <Text style={styles.listHeader}>{t("TOP_CATEGORIES")}</Text>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageView: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH * 0.4475,
    height: SCREEN_WIDTH * 0.4475,
    marginLeft: SCREEN_WIDTH * 0.035,
    marginBottom: SCREEN_WIDTH * 0.035,

    marginTop: 10,
  },

  image: {
    height: SCREEN_WIDTH * 0.4475,
    width: SCREEN_WIDTH * 0.4475,
    borderRadius: 10,
  },

  listHeader: {
    fontSize: 18,
    color: colors.darkColor,
    marginLeft: 12,
    marginTop: 25,

    fontWeight: "bold",
  },

  textView: {
    height: SCREEN_WIDTH * 0.4475,
    width: SCREEN_WIDTH * 0.4475,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(52,52,52,0.3)",
  },
});
