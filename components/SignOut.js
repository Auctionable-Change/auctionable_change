import React from "react";
import { Text } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";


const SignOut = () => {
  const navigation = useNavigation()
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("Home")}>
      <Text
        style={{
          fontFamily: "quicksand-bold",
          color: "#ffffff",
          marginRight: 5,
        }}
      >
        Sign Out
      </Text>
    </TouchableWithoutFeedback>
  );
}


export default SignOut

