import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "native-base";
import { useStore } from "../../store";
import * as Linking from "expo-linking";
import Camera from "../Camera/Camera";
import { ScrollView } from "react-native-gesture-handler";

const BidConfirmation = () => {
  return(
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: "center", width: "100%" }}>
        <Text>Hello World</Text>
      </ScrollView>
    </SafeAreaView>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: "#FFFFFF",
  display: "flex",
},
subtitle: {
  fontSize: 20,
  fontFamily: "quicksand",
  margin: 5,
},
title: {
  fontSize: 25,
  textAlign: "center",
  margin: 5,
  fontFamily: "quicksand-bold",
},
listItem: {
  fontSize: 15,
  marginLeft: 20,
  marginRight: 20,
  marginTop: 5,
  marginBottom: 5,
  fontFamily: "quicksand",
},
stepOne: {
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 5,
},
});

export default BidConfirmation;