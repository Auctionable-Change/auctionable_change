import React from 'react'
import { Image } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";


const LogoTitle = () => {
  return (
    <TouchableWithoutFeedback>
      <Image
        style={{ width: 150, resizeMode: "contain" }}
        source={require("../assets/a_change.png")}
      />
    </TouchableWithoutFeedback>
  );
 }

export default LogoTitle;
