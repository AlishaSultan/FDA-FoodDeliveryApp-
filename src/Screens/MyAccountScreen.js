import React from 'react';
import { View, Text, Button } from 'react-native';
import ProfileScreen from './ProfileScreen'; // Make sure to provide the correct path

export default function MyAccountScreen({ navigation }) {
  return (
    <View style={{ flex: 1}}>
      <Text>My Account</Text>
      <ProfileScreen navigation={navigation} />
    </View>
  );
}
