import React, { useState, useEffect, useContext } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore"; // Import Firestore
import {
  View,
  Text,
  Linking,
  Pressable,
  Alert,
  Switch,
  StyleSheet,
} from "react-native";

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Avatar, Button, Icon } from "react-native-elements";
import { colors } from "../Global/styles";
import { SignInContext } from "../contexts/authContext";
import Countdown from "react-native-countdown-component";
import { TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

export default function DrawerContent(props, { navigation }) {
  const { dispatchSignedIn } = useContext(SignInContext);
  const { i18n } = useTranslation();
  const [userData, setUserData] = useState(null);
  const [profileImageUri, setProfileImageUri] = useState(null);

  const getCurrentUserUid = () => {
    const user = auth().currentUser;
    return user ? user.uid : null;
  };

  const getUserDataFromFirestore = async (uid) => {
    try {
      const userDocRef = firestore().collection("SignUpData").doc(uid);
      const userDoc = await userDocRef.get();

      if (userDoc.exists) {
        const userData = userDoc.data();
        setUserData(userData);
        setProfileImageUri(userData.profileImage);
      } else {
        console.log("User document does not exist");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  useEffect(() => {
    const uid = getCurrentUserUid();

    if (uid) {
      const fetchUserData = async () => {
        try {
          await getUserDataFromFirestore(uid);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    } else {
      setUserData(null);
    }
  }, []);

  const onUpdateProfileImage = (newImageUri) => {
    setProfileImageUri(newImageUri);
  };

  useEffect(() => {
    const uid = getCurrentUserUid();

    if (uid) {
      const unsubscribe = firestore()
        .collection("SignUpData")
        .doc(uid)
        .onSnapshot(
          (documentSnapshot) => {
            if (documentSnapshot.exists) {
              const userData = documentSnapshot.data();
              setUserData(userData);
              setProfileImageUri(userData.profileImage);
            } else {
              console.log("User document does not exist");
              setUserData(null);
              setProfileImageUri(null);
            }
          },
          (error) => {
            console.error("Error listening to user data:", error);
          }
        );

      // Clean up the listener when the component unmounts
      return () => unsubscribe();
    }
  }, []);

  const [count, setCount] = useState(null);

  const getCountFromFirestore = async (uid) => {
    try {
      const addressSnapshot = await firestore()
        .collection("cartCount")
        .doc(uid);
      addressSnapshot.onSnapshot((doc) => {
        if (doc.exists) {
          const countData = doc.data();
          const userCount = countData.count;
          setCount(userCount);
        } else {
          console.log("Document does not exist");
          setCount(null);
        }
      });
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  useEffect(() => {
    const uid = getCurrentUserUid();
    if (uid) {
      getCountFromFirestore(uid);
    }
  }, []);

  const updateCartCount = async () => {
    const uid = getCurrentUserUid();
    if (uid) {
      try {
        const fetchedCount = await getCountFromFirestore(uid);
        setCount(fetchedCount);
      } catch (error) {
        console.error("Error updating cart count:", error);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={{ backgroundColor: colors.buttons }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 15,
              paddingVertical: 15,
            }}
          >
            {profileImageUri ? (
              <Avatar
                rounded
                avatarStyle={styles.avatar}
                size={75}
                source={{ uri: profileImageUri }}
              />
            ) : (
              <Avatar
                rounded
                avatarStyle={styles.avatar}
                size={75}
                title={userData ? userData.name.charAt(0).toUpperCase() : ""}
                containerStyle={styles.avatarContainer}
                titleStyle={styles.avatarTitle}
              />
            )}
            <View style={{ paddingLeft: 8 }}>
              {userData ? (
                <>
                  <Text
                    style={{ fontWeight: "bold", color: "white", fontSize: 15 }}
                  >
                    {userData.name} {userData.last_name}
                  </Text>
                  <Text style={{ color: "white", fontSize: 13 }}>
                    {userData.email}
                  </Text>
                </>
              ) : (
                <Text>{i18n.t("DELIVERY")}...</Text>
              )}
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              paddingBottom: 5,
            }}
          >
            <View style={{ flexDirection: "row", marginTop: 0 }}>
              <View
                style={{
                  marginLeft: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontWeight: "bold", color: "white", fontSize: 15 }}
                >
                  1
                </Text>
                <Text style={{ color: "white", fontSize: 13 }}>
                  {i18n.t("MY_FAVOURITES")}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", marginTop: 0 }}>
              <View
                style={{
                  marginLeft: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontWeight: "bold", color: "white", fontSize: 15 }}
                >
                  {count}
                </Text>
                <Text style={{ color: "white", fontSize: 13 }}>
                  {i18n.t("MY_CART")}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <DrawerItemList {...props} />

        <DrawerItem
          label={() => (
            <Text style={{ color: colors.buttons, fontSize: 14 }}>
              {i18n.t("PAYMENT")}
            </Text>
          )}
          icon={({ color, size }) => (
            <Icon
              type="material-community"
              name="credit-card-outline"
              color={colors.buttons}
              size={22}
            />
          )}
        />

        <DrawerItem
          label={() => (
            <Text style={{ color: colors.buttons, fontSize: 14 }}>
              {i18n.t("NOTIFICATIONS")}
            </Text>
          )}
          icon={({ color, size }) => (
            <Icon
              type="ionicon"
              name="notifications-outline"
              color={colors.buttons}
              size={22}
            />
          )}
        />

        <DrawerItem
          label={() => (
            <Text style={{ color: colors.buttons, fontSize: 14 }}>
              {i18n.t("PROMOTIONS")}
            </Text>
          )}
          icon={({ color, size }) => (
            <Icon
              type="material-community"
              name="tag-heart"
              color={colors.buttons}
              size={22}
            />
          )}
        />

        {/* <DrawerItem 
label={() => (
<Text style={{ color: colors.buttons, fontSize: 16 }}>
Settings
</Text>
)}
icon = {({color , size})=>(
<Icon
type = "material-community"
name = "cog-outline"
color = {colors.buttons}
size = {size}
/>
)}
/> */}
        {/* <TouchableOpacity onPress={() => {
              navigation.navigate('CustomButtons')
  }}>
<DrawerItem 
label={() => (
<Text style={{ color: colors.buttons, fontSize: 16 }}>
Help
</Text>
)}
icon = {({color , size})=>(
<Icon
type = "material-community"
name = "lifebuoy"
color = {colors.buttons}
size = {size}
/>
)}
/>
</TouchableOpacity> */}

        <View style={{ borderTopWidth: 0.4, borderTopColor: colors.buttons }}>
          <Text style={styles.preferences}>{i18n.t("PREFERENCES")}</Text>

          <View style={styles.switchText}>
            <Text style={styles.darkthemetext}>{i18n.t("DARK_THEME")}</Text>
            <View style={{ paddingRight: 10, paddingTop: 18 }}>
              <Switch
                trackColor={{ false: colors.buttons, true: "#E11584" }}
                thumbColor="#E11584"
              />
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
      <DrawerItem
        label={() => (
          <Text style={{ color: colors.buttons, fontSize: 14 }}>
            {i18n.t("SIGN_OUT")}
          </Text>
        )}
        icon={({ color, size }) => (
          <Icon
            type="material-community"
            name="logout-variant"
            color={colors.buttons}
            size={22}
            onPress={() => {
              signOut();
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  avatar: {
    borderWidth: 4,
    borderColor: "yellow",
  },

  avatarContainer: {
    borderWidth: 4,
    borderColor: "#E11584",
  },

  preferences: {
    fontSize: 15,
    color: colors.buttons,
    paddingTop: 20,
    paddingLeft: 20,
  },

  switchText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingVertical: 5,
    paddingRight: 10,
  },

  darkthemetext: {
    fontSize: 14,
    color: colors.buttons,
    paddingTop: 10,
    paddingLeft: 0,
    fontWeight: "bold",
  },
  avatarTitle: {
    color: "white",
  },
});
