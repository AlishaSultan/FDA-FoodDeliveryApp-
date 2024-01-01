import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar, Icon, Button } from "react-native-elements";
import { colors, parameters } from "../Global/styles";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import Modal from "react-native-modal";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import Toast from "react-native-toast-message";
import ProfileFieldScreen from "./ProfileFieldScreen";
const { width, height } = Dimensions.get("window");
const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const onUpdateUserData = (updatedUserData) => {
    setUserData(updatedUserData);
  };

  const getCurrentUserUid = () => {
    const user = auth().currentUser;
    return user ? user.uid : null;
  };

  const getUserDataFromFirestore = async (uid) => {
    try {
      const userDocRef = firestore().collection("SignUpData").doc(uid);
      const userDoc = await userDocRef.get();

      if (userDoc.exists) {
        const fetchedUserData = userDoc.data();
        setUserData(fetchedUserData);
        fetchImageFromStorage(uid);
      } else {
        console.log("User document does not exist");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchImageFromStorage = async (uid) => {
    try {
      const storageRef = storage().ref(`/userImages/${uid}/profileImage.jpg`);
      const downloadURL = await storageRef.getDownloadURL();
      setSelectedImage(downloadURL);
    } catch (error) {
      //console.error('Error fetching image from Firebase Storage:', error);
    }
  };

  useEffect(() => {
    const uid = getCurrentUserUid();

    const fetchUserData = async () => {
      if (uid) {
        await getUserDataFromFirestore(uid);
      } else {
        setUserData(null);
        setSelectedImage(null);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const getFirstLetter = () => {
    const firstLetter =
      userData && userData.name ? userData.name.charAt(0).toUpperCase() : "";
    return firstLetter;
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const openCamera = () => {
    const options = {
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled camera");
      } else if (response.error) {
        console.log("Camera Error: ", response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        Toast.show({
          type: "success",
          text1: "   🤵🏻 Profile Update Successfully 🤵🏻",
          visibilityTime: 4000,
          autoHide: true,
        });
        uploadImageToFirebase(imageUri);
      }
    });

    toggleModal();
  };

  const openGallery = () => {
    const options = {
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("Image picker error: ", response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        Toast.show({
          type: "success",
          text1: "    🤵🏻 Profile Update Successfully 🤵🏻",
          visibilityTime: 4000,
          autoHide: true,
        });
        uploadImageToFirebase(imageUri);
      }
    });

    toggleModal();
  };

  const uploadImageToFirebase = async (imageUri) => {
    const currentUserUid = getCurrentUserUid();

    if (currentUserUid) {
      try {
        const storageRef = storage().ref(
          `/userImages/${currentUserUid}/profileImage.jpg`
        );
        await storageRef.putFile(imageUri);
        const downloadURL = await storageRef.getDownloadURL();

        await firestore().collection("SignUpData").doc(currentUserUid).update({
          profileImage: downloadURL,
        });

        setUserData((prevUserData) => ({
          ...prevUserData,
          profileImage: downloadURL,
        }));
      } catch (error) {
        console.error("Error uploading image to Firebase Storage:", error);
      }
    }
  };

  const deleteImageFromFirebase = async () => {
    const currentUserUid = getCurrentUserUid();

    if (currentUserUid) {
      try {
        const storageRef = storage().ref(
          `/userImages/${currentUserUid}/profileImage.jpg`
        );
        await storageRef.delete();

        await firestore().collection("SignUpData").doc(currentUserUid).update({
          profileImage: null,
        });

        setUserData((prevUserData) => ({
          ...prevUserData,
          profileImage: null,
        }));
        setSelectedImage(null);
        Toast.show({
          type: "success",
          text1: "   🤵🏻 Profile Delete Successfully 🤵🏻",
          visibilityTime: 4000,
          autoHide: true,
        });
      } catch (error) {
        console.error("Error deleting image from Firebase Storage:", error);
      }
    }
  };

  const updateProfileImage = async (newImageUri) => {
    setProfileImage(newImageUri);
    // Call the callback function to update the DrawerContent
    onUpdateProfileImage(newImageUri);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.view14}>
          <View style={styles.arrow}>
            <Icon
              name="arrow-left"
              type="material-community"
              color="white"
              size={width * 0.08}
              iconStyle={{ marginLeft: width * 0.02 }}
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>

        <View>
          <View style={styles.avatarStyle}>
            {selectedImage ? (
              <Avatar
                rounded
                avatarStyle={styles.avatar}
                size={width * 0.3}
                source={{ uri: selectedImage }}
              />
            ) : (
              <Avatar
                rounded
                avatarStyle={styles.avatar}
                size={width * 0.3}
                title={getFirstLetter()}
                containerStyle={styles.avatarContainer}
                titleStyle={styles.avatarTitle}
              />
            )}

            <TouchableOpacity style={styles.pencil} onPress={toggleModal}>
              <Icon
                name="plus"
                type="material-community"
                color="white"
                size={width * 0.06}
                iconStyle={{
                  marginLeft: width * 0.001,
                  marginTop: height * 0.003,
                }}
              />
            </TouchableOpacity>

            <Text style={styles.text1}>
              {userData.name} {userData.last_name}
            </Text>
          </View>
        </View>

        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={toggleModal}>
              <Icon
                reverse
                name="backspace-outline"
                type="ionicon"
                color={colors.darkColor}
                size={15}
              />
            </TouchableOpacity>
            <View style={styles.uploadtext}>
              <Text style={styles.text2}>Upload Photo</Text>
            </View>
            <View>
              <Button
                title="Upload From Camera"
                icon={
                  <Icon
                    reverse
                    name="camera"
                    type="ionicon"
                    color={colors.darkColor}
                    size={16}
                  />
                }
                buttonStyle={styles.createButton}
                titleStyle={styles.createButtonTitle}
                onPress={openCamera}
              />

              <View>
                <Button
                  title="Upload From Gallery"
                  icon={
                    <Icon
                      reverse
                      name="images-outline"
                      type="ionicon"
                      color={colors.darkColor}
                      size={16}
                    />
                  }
                  buttonStyle={styles.createButton}
                  titleStyle={styles.createButtonTitle}
                  onPress={openGallery}
                />
              </View>
              {selectedImage && (
                <Button
                  title="Delete Profile Picture"
                  icon={
                    <Icon
                      reverse
                      name="person-circle"
                      type="ionicon"
                      color={colors.darkColor}
                      size={16}
                    />
                  }
                  buttonStyle={styles.createButton}
                  titleStyle={styles.createButtonTitle}
                  onPress={deleteImageFromFirebase}
                />
              )}
            </View>
          </View>
        </Modal>
        <ProfileFieldScreen
          navigation={navigation}
          route={{ params: { userData: userData } }}
          onUpdateUserData={onUpdateUserData}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  arrow: {
    position: "absolute",
  },
  view14: {
    flexDirection: "row",
    alignItems: "center",
    padding: width * 0.02,
    backgroundColor: colors.buttons,
    top: 0,
    left: 0,
    right: 0,
    paddingTop: height * 0.27,
    borderColor: colors.darkColor,
    borderWidth: 5,
    borderBottomEndRadius: width * 0.12,
    borderBottomLeftRadius: width * 0.12,
  },
  avatar: {
    borderWidth: width * 0.01,
    borderColor: "yellow",
  },
  avatarContainer: {
    borderWidth: width * 0.01,
    borderColor: "#E11584",
  },
  avatarTitle: {
    color: "white",
  },
  avatarStyle: {
    marginTop: -height * 0.22,
    marginLeft: width * 0.33,
  },
  pencil: {
    position: "absolute",
    top: height * 0.1,
    right: width * 0.37,
    backgroundColor: colors.darkColor,
    height: height * 0.04,
    width: height * 0.04,
    borderRadius: height * 0.04,
  },

  delete: {
    position: "absolute",
    top: 85,
    right: 110,
  },
  modalContent: {
    backgroundColor: colors.buttons,
    position: "absolute",
    bottom: -height * 0.05, // Adjust the distance from the bottom as needed
    height: height * 0.5, // Adjust the height as needed
    width: width * 1, // Adjust the width as needed
    marginLeft: -width * 0.05, // Adjust the margin as needed
    borderTopLeftRadius: width * 0.1, // Adjust the border radius as needed
    borderTopRightRadius: width * 0.1, // Adjust the border radius as needed
  },
  uploadtext: {
    marginTop: -30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text2: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },

  text1: {
    marginTop: 5,
    color: "white",
    fontWeight: "bold",
    marginLeft: "6%",
    fontSize: 18,
  },

  createButton: {
    backgroundColor: "white",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 3,
    borderColor: colors.darkColor,
    height: 55,
    marginTop: 30,
    marginHorizontal: 55,
  },

  createButtonTitle: {
    color: "#F9629F",
    fontSize: 14,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "-3",
    marginLeft: 5,
  },
});

export default ProfileScreen;
