import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Modal,
  TextInput,
  FlatList,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { colors } from "../Global/styles";
import { Icon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { filterData } from "../Global/Data";
import filter from "lodash/filter";
import { useTranslation } from "react-i18next";

export default function SearchComponent() {
  const navigation = useNavigation();
  const [data, setData] = useState([...filterData]);
  const [ModalVisible, setModalVisible] = useState(false);
  const [textInputFocussed, setTextInputFocussed] = useState(true);
  const textInput = useRef(0);
  const { t } = useTranslation();

  const contains = ({ name }, query) => {
    if (name.toLowerCase().includes(query.toLowerCase())) {
      return true;
    }
    return false;
  };

  const handleSearch = (text) => {
    const dataS = filter(filterData, (userSearch) => {
      return contains(userSearch, text);
    });

    setData([...dataS]);
  };

  return (
    <View style={{ alignItems: "center", paddingTop: 30 }}>
      <TouchableWithoutFeedback
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <View style={styles.SearchArea}>
          <Icon
            name="search"
            style={styles.SearchIcon}
            type="material"
            iconStyle={{ marginLeft: 5, color: colors.buttons }}
            size={23}
          />

          <Text style={{ fontSize: 14, color: colors.text }}>
            {t("WHAT_ARE_YOU_LOOKING_FOR")}
          </Text>
        </View>
      </TouchableWithoutFeedback>

      <Modal animationType="fade" transparent={false} visible={ModalVisible}>
        <View style={styles.modal}>
          <View style={styles.view1}>
            <View style={styles.TextInput}>
              <Animatable.View
                animation={textInputFocussed ? "fadeInRight" : "fadeInLeft"}
                duration={400}
              >
                <Icon
                  name={textInputFocussed ? "arrow-back" : "search"}
                  onPress={() => {
                    if (textInputFocussed) setModalVisible(false);
                    setTextInputFocussed(true);
                  }}
                  style={styles.icon2}
                  type="material"
                  iconStyle={{ marginRight: 5, color: colors.darkColor }}
                />
              </Animatable.View>
              <TextInput
                style={{ width: "90%" }}
                placeholder=""
                autoFocus={false}
                ref={textInput}
                onFocus={() => {
                  setTextInputFocussed(true);
                }}
                onBlur={() => {
                  setTextInputFocussed(false);
                }}
                onChangeText={handleSearch}
              />

              <Animatable.View
                animation={textInputFocussed ? "fadeInLeft" : ""}
                duration={400}
              >
                <Icon
                  name={textInputFocussed ? "cancel" : null}
                  iconStyle={{ color: colors.darkColor }}
                  type="material"
                  style={{ marginRight: -10 }}
                  onPress={() => {
                    textInput.current.clear();
                  }}
                />
              </Animatable.View>
            </View>
          </View>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  Keyboard.dismiss();
                  navigation.navigate("SearchResult", { item: item.name });
                  setModalVisible(false);
                  setTextInputFocussed(true);
                }}
              >
                <View style={styles.view2}>
                  <Text style={{ color: colors.text, fontSize: 15 }}>
                    {t(item.name)}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text1: {
    color: colors.buttons,
    fontSize: 16,
  },

  TextInput: {
    marginHorizontal: 0,
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.darkColor,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },

  SearchArea: {
    marginTop: 10,
    width: "94%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.darkColor,
    flexDirection: "row",
    alignItems: "center",
  },

  SearchIcon: {
    fontSize: 24,
    padding: 5,
    color: colors.darkColor,
  },

  view1: {
    height: 70,
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  view2: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },

  icon2: {
    fontSize: 24,
    padding: 5,
    color: colors.grey2,
  },

  modal: {
    flex: 1,
  },
});
