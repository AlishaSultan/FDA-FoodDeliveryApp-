import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Modal } from "react-native";
import { Button, Icon } from "react-native-elements";
import { colors } from "../Global/styles";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import firestore from "@react-native-firebase/firestore";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native-gesture-handler";
import UseLanguageSelection from "./UseLanguageSelection";
const ProfileFieldScreen = ({ navigation, route, onUpdateUserData }) => {
  const [userData, setUserData] = useState(route?.params?.userData || {});
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [isEmailModalVisible, setEmailModalVisible] = useState(false);
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
  const [isFirstNameModalVisible, setFirstNameModalVisible] = useState(false);
  const [isLastNameModalVisible, setLastNameModalVisible] = useState(false);
  const [isPhoneNumberModalVisible, setPhoneNumberModalVisible] =
    useState(false);
  const [isAddressModalVisible, setAddressModalVisible] = useState(false);
  const [updatedEmail, setUpdatedEmail] = useState(userData.email);
  const [updatedPassword, setUpdatedPassword] = useState(userData.password);
  const [updatedFirstName, setUpdatedFirstName] = useState(userData.name);
  const [updatedLastName, setUpdatedLastName] = useState(userData.last_name);
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState(
    userData.phone_number
  );
  const [updatedAddress, setUpdatedAddress] = useState(userData.address);
  const { i18n } = useTranslation();
  const renderMaskedPassword = () => {
    return "*".repeat(userData.password.length);
  };

  const updateField = async (field, value, setVisible) => {
    try {
      const currentUser = auth().currentUser;

      if (currentUser) {
        const userId = currentUser.uid;

        // Update Firestore
        await firestore()
          .collection("SignUpData")
          .doc(userId)
          .update({
            [field]: value,
          });

        // Update local state
        setUserData((prevUserData) => ({
          ...prevUserData,
          [field]: value,
        }));

        // Notify parent component (ProfileScreen) about the update
        onUpdateUserData({
          ...userData,
          [field]: value,
        });

        // Close the modal or perform any other necessary actions
        setVisible(false);
      } else {
        console.error("No user is signed in.");
      }
    } catch (error) {
      console.error("Error updating field:", error.message);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await auth().sendPasswordResetEmail(userData.email);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      Toast.show({
        type: "error",
        text1: "❌Error sending reset email❌",
        visibilityTime: 4000,
        autoHide: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.map}>
        <Icon
          type="material-community"
          name="map-marker"
          color={colors.darkColor}
          size={25}
          iconStyle={{ marginLeft: -5, marginTop: -3 }}
        />
        <View style={styles.maptext}>
          <Text style={styles.maptext1}>{userData.address}</Text>
        </View>
        <Icon
          name="pencil"
          type="material-community"
          color={colors.darkColor}
          size={18}
          iconStyle={{ marginLeft: 10, marginTop: 15 }}
          onPress={() => setAddressModalVisible(true)}
        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isAddressModalVisible}
        onRequestClose={() => setAddressModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.editemail}>{i18n.t("EDIT_ADDRESS")}</Text>
            <View style={styles.field}>
              <TextInput
                style={styles.input}
                placeholder={i18n.t("ENTER_NEW_ADDRESS")}
                value={updatedAddress}
                onChangeText={(text) => setUpdatedAddress(text)}
              />
            </View>
            <View style={styles.buttons}>
              <Button
                title={i18n.t("UPDATE")}
                onPress={() =>
                  updateField("address", updatedAddress, setAddressModalVisible)
                }
                buttonStyle={styles.createButton1}
                titleStyle={styles.createButtonTitle}
              />
              <Button
                title={i18n.t("CANCEL")}
                onPress={() => setAddressModalVisible(false)}
                buttonStyle={styles.createButton1}
                titleStyle={styles.createButtonTitle}
              />
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.rowContainer}>
        <Icon
          name="email"
          type="material-community"
          color={colors.darkColor}
          size={22}
          iconStyle={{ marginLeft: 7 }}
        />
        <Text style={styles.emailText}>{i18n.t("EMAIL")}</Text>
      </View>

      <View style={styles.rowContainer}>
        <Text style={styles.useremail}>{userData.email}</Text>
      </View>
      <View style={styles.button}></View>

      <View style={{ marginTop: 45 }}>
        <View style={styles.rowContainer}>
          <Icon
            name="lock"
            type="material-community"
            color={colors.darkColor}
            size={22}
            iconStyle={{ marginLeft: 7 }}
          />
          <Text style={styles.emailText}>{i18n.t("PASSWORD")}</Text>
        </View>

        <View style={styles.rowContainer}>
          <Text style={styles.useremail}>**********</Text>
        </View>
        <View style={styles.button}>
          <Button
            style={{ marginTop: 20 }}
            title={i18n.t("EDIT")}
            buttonStyle={styles.createButton}
            titleStyle={styles.createButtonTitle}
            icon={
              <Icon
                name="pencil"
                type="material-community"
                color="white"
                size={15}
              />
            }
            onPress={() => {
              setPasswordModalVisible(true);
              handleForgotPassword();
            }}
            iconRight
          />
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={isPasswordModalVisible}
          onRequestClose={() => setPasswordModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.editemail1}>
                {i18n.t("PASSWORD_RESET_SEND")}
              </Text>

              <Button
                title={i18n.t("CANCEL")}
                onPress={() => setPasswordModalVisible(false)}
                buttonStyle={styles.createButton2}
                titleStyle={styles.createButtonTitle}
              />
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.rowContainer}>
        <Icon
          name="account"
          type="material-community"
          color={colors.darkColor}
          size={22}
          iconStyle={{ marginLeft: 7 }}
        />
        <Text style={styles.emailText}>{i18n.t("FIRST_NAME")}</Text>
      </View>

      <View style={styles.rowContainer}>
        <Text style={styles.useremail}>{userData.name}</Text>
      </View>
      <View style={styles.button}>
        <Button
          style={{ marginTop: 20 }}
          title={i18n.t("EDIT")}
          buttonStyle={styles.createButton}
          titleStyle={styles.createButtonTitle}
          icon={
            <Icon
              name="pencil"
              type="material-community"
              color="white"
              size={15}
            />
          }
          onPress={() => setFirstNameModalVisible(true)}
          iconRight
        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isFirstNameModalVisible}
        onRequestClose={() => setFirstNameModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.editemail}>{i18n.t("EDIT_FIRST_NAME")}</Text>
            <View style={styles.field}>
              <TextInput
                style={styles.input}
                placeholder={i18n.t("ENTER_FIRST_NAME")}
                value={updatedFirstName}
                onChangeText={(text) => setUpdatedFirstName(text)}
              />
            </View>
            <View style={styles.buttons}>
              <Button
                title={i18n.t("UPDATE")}
                onPress={() =>
                  updateField(
                    "name",
                    updatedFirstName,
                    setFirstNameModalVisible
                  )
                }
                buttonStyle={styles.createButton1}
                titleStyle={styles.createButtonTitle}
              />
              <Button
                title={i18n.t("CANCEL")}
                onPress={() => setFirstNameModalVisible(false)}
                buttonStyle={styles.createButton1}
                titleStyle={styles.createButtonTitle}
              />
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.rowContainer}>
        <Icon
          name="account-tie"
          type="material-community"
          color={colors.darkColor}
          size={22}
          iconStyle={{ marginLeft: 7 }}
        />
        <Text style={styles.emailText}>{i18n.t("LAST_NAME")}</Text>
      </View>

      <View style={styles.rowContainer}>
        <Text style={styles.useremail}>{userData.last_name}</Text>
      </View>
      <View style={styles.button}>
        <Button
          style={{ marginTop: 20 }}
          title={i18n.t("EDIT")}
          buttonStyle={styles.createButton}
          titleStyle={styles.createButtonTitle}
          icon={
            <Icon
              name="pencil"
              type="material-community"
              color="white"
              size={15}
            />
          }
          onPress={() => setLastNameModalVisible(true)}
          iconRight
        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isLastNameModalVisible}
        onRequestClose={() => setLastNameModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.editemail}>{i18n.t("ENTER_LAST_NAME")}</Text>
            <View style={styles.field}>
              <TextInput
                style={styles.input}
                placeholder={i18n.t("EDIT_LAST_NAME")}
                value={updatedLastName}
                onChangeText={(text) => setUpdatedLastName(text)}
              />
            </View>
            <View style={styles.buttons}>
              <Button
                title={i18n.t("UPDATE")}
                onPress={() =>
                  updateField(
                    "last_name",
                    updatedLastName,
                    setLastNameModalVisible
                  )
                }
                buttonStyle={styles.createButton1}
                titleStyle={styles.createButtonTitle}
              />
              <Button
                title={i18n.t("CANCEL")}
                onPress={() => setLastNameModalVisible(false)}
                buttonStyle={styles.createButton1}
                titleStyle={styles.createButtonTitle}
              />
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.rowContainer}>
        <Icon
          name="phone"
          type="material-community"
          color={colors.darkColor}
          size={22}
          iconStyle={{ marginLeft: 7 }}
        />
        <Text style={styles.emailText}>{i18n.t("PHONE_NUMBER")}</Text>
      </View>

      <View style={styles.rowContainer}>
        <Text style={styles.useremail}>{userData.phone_number}</Text>
      </View>
      <View style={styles.button}>
        <Button
          style={{ marginTop: 20 }}
          title={i18n.t("EDIT")}
          buttonStyle={styles.createButton}
          titleStyle={styles.createButtonTitle}
          icon={
            <Icon
              name="pencil"
              type="material-community"
              color="white"
              size={15}
            />
          }
          onPress={() => setPhoneNumberModalVisible(true)}
          iconRight
        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isPhoneNumberModalVisible}
        onRequestClose={() => setPhoneNumberModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.editemail}>{i18n.t("EDIT_PHONE_NUMBER")}</Text>
            <View style={styles.field}>
              <TextInput
                style={styles.input}
                placeholder={i18n.t("ENTER_NEW_PHONE_NUMBER")}
                value={updatedPhoneNumber}
                onChangeText={(text) => setUpdatedPhoneNumber(text)}
              />
            </View>
            <View style={styles.buttons}>
              <Button
                title={i18n.t("UPDATE")}
                onPress={() =>
                  updateField(
                    "phone_number",
                    updatedPhoneNumber,
                    setPhoneNumberModalVisible
                  )
                }
                buttonStyle={styles.createButton1}
                titleStyle={styles.createButtonTitle}
              />
              <Button
                title={i18n.t("CANCEL")}
                onPress={() => setPhoneNumberModalVisible(false)}
                buttonStyle={styles.createButton1}
                titleStyle={styles.createButtonTitle}
              />
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("UseLanguageSelection");
        }}
      >
        <View style={styles.rowContainer}>
          <Icon
            name="language-outline"
            type="ionicon"
            color={colors.darkColor}
            size={22}
            iconStyle={{ marginLeft: 7 }}
          />
          <Text style={styles.emailText}>{i18n.t("LANGUAGE")}</Text>
        </View>
      </TouchableOpacity>

      <View style={{ marginTop: 5 }}>
        <View style={styles.rowContainer}>
          <Icon
            name="share"
            type="material-community"
            color={colors.darkColor}
            size={22}
            iconStyle={{ marginLeft: 7 }}
          />
          <Text style={styles.emailText}>{i18n.t("SHARE")}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  map: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 0,
  },
  maptext: {
    marginLeft: 0,
    marginTop: 2,
  },
  maptext1: {
    fontSize: 13,
    color: colors.text,
    fontWeight: "bold",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
  },
  emailText: {
    marginLeft: 10,
    fontSize: 15,
    color: colors.darkColor,
    fontWeight: "bold",
  },
  useremail: {
    marginTop: -15,
    marginLeft: 65,
    color: colors.text,
    fontSize: 14,
  },
  button: {
    marginTop: -35,
    marginLeft: "78%",
  },
  createButton: {
    width: 70,
    height: 45,
    borderRadius: 15,
    backgroundColor: colors.darkColor,
  },

  editemail: {
    marginLeft: 10,
    fontSize: 17,
    color: colors.darkColor,
    fontWeight: "bold",
    marginTop: -5,
  },
  editemail1: {
    fontSize: 14,
    color: colors.darkColor,
    fontWeight: "bold",
    marginTop: -5,
    marginLeft: 25,
  },
  field: {
    marginTop: 20,
    borderColor: colors.darkColor,
    borderWidth: 2,
    borderRadius: 25,
  },

  input: {
    marginLeft: 15,
    color: colors.text,
    fontSize: 12,
  },

  createButtonTitle: {
    color: "white",
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 40,
    borderRadius: 25,
    elevation: 5,
    width: "80%", // Adjust the width as needed
    alignSelf: "center",
    opacity: 1, // Set opacity as needed
  },

  buttons: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: -5,
    justifyContent: "space-around",
  },

  createButton1: {
    width: 80,
    height: 45,
    borderRadius: 15,
    backgroundColor: colors.darkColor,
  },
  createButton2: {
    width: 70,
    height: 45,
    borderRadius: 15,
    backgroundColor: colors.darkColor,
    marginLeft: "33%",
    marginTop: 20,
  },
});

export default ProfileFieldScreen;
