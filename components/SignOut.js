import React from "react";
import { Text } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "../store";

const SignOut = () => {
  const { dispatch } = useStore()
  const navigation = useNavigation();
  const logOut = () => {
    dispatch({
      type: "SET_USER",
      userInfo: {}
    })
    navigation.navigate("Login")
  }
  return (
    <TouchableWithoutFeedback onPress={() => logOut()}>
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

