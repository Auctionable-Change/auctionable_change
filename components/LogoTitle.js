import React from 'react'
import { Image } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";


const LogoTitle = () => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("Home")}>
      <Image
        style={{ width: 250, resizeMode: "contain" }}
        source={require("../assets/a_change.png")}
      />
    </TouchableWithoutFeedback>
  );
 }

export default LogoTitle;
