// AnotherScreen.js

import React from "react";
import CustomButtons from "./CustomButtons";

const HelpScreen = ({ navigation }) => {
  const handleCustomFourthPageButtonPress = () => {
    // Custom behavior for the "Get Started" button on the 4th page in AnotherScreen
    navigation.navigate("Home");
  };

  return (
    <CustomButtons
      navigation={navigation}
      onFourthPageButtonPress={handleCustomFourthPageButtonPress}
    />
  );
};

export default HelpScreen;
