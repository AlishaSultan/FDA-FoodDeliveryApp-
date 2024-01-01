import * as React from "react";
import { Text } from "react-native-elements";
import { createDrawerNavigator } from "@react-navigation/drawer";
import RootClientTab from "./ClientTab";
import { colors } from "../Global/styles";
import { Icon } from "react-native-elements";
import BusinessConsole from "../Screens/BusinessConsole";
import DrawerContent from "../Components/DrawerContent";
import CustomButtons from "../Screens/CustomButtons";
import ProfileScreen from "../Screens/ProfileScreen";
import HelpScreen from "../Screens/HelpScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { i18n } = useTranslation();
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="RootClientTab"
        component={RootClientTab}
        options={{
          drawerLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? "#E11584" : colors.buttons,
                fontSize: 14,
              }}
            >
              {i18n.t("CLIENT")}
            </Text>
          ),
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Icon
              type="material-community"
              name="home"
              color={focused ? "#E11584" : colors.buttons}
              size={22}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="BusinessConsole"
        component={BusinessConsole}
        options={{
          drawerLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? "#E11584" : colors.buttons,
                fontSize: 14,
              }}
            >
              {i18n.t("BUSINESS_CONSOLE")}
            </Text>
          ),
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Icon
              type="material"
              name="business"
              color={focused ? "#E11584" : colors.buttons}
              size={22}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="HelpScreen"
        component={HelpScreen}
        options={{
          drawerLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? "#E11584" : colors.buttons,
                fontSize: 14,
              }}
            >
              {i18n.t("HELP")}
            </Text>
          ),
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Icon
              type="material-community"
              name="lifebuoy"
              color={focused ? "#E11584" : colors.buttons}
              size={22}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          drawerLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? "#E11584" : colors.buttons,
                fontSize: 14,
              }}
            >
              {i18n.t("SETTINGS")}
            </Text>
          ),
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Icon
              type="material-community"
              name="cog-outline"
              color={focused ? "#E11584" : colors.buttons}
              size={22}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
