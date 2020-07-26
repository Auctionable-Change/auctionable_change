import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "native-base";
import { useStore } from "../store";
import * as Linking from "expo-linking";
import Camera from "./Camera";

const PaymentInstructions = ({ navigation }) => {
  const { state } = useStore();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Thank you for your contribution!</Text>
      <Text style={styles.subtitle}>Instructions to complete order:</Text>
      <View style={styles.stepOne}>
        <Text>1. Follow this </Text>
        <Text
          style={{ fontWeight: "bold", textDecorationLine: "underline" }}
          onPress={() => Linking.openURL(state.currentListing.charity_url)}
        >
          link
        </Text>
        <Text>to donate at least ${state.currentListing.price}.</Text>
      </View>
      <Text style={styles.listItem}>
        Take a screenshot that includes your name, charity name and donation
        amount. Do not include other personal information.
      </Text>
      <Camera
        cameraType="launchImageLibraryAsync"
        user="buyer"
        prompt="Press camera to upload screenshot of donation receipt from your camera roll."
        title="Upload Receipt"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 15,
    margin: 10,
  },
  scroll: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
  },
  listItem: {
    fontSize: 15,
    margin: 20,
  },
  stepOne: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
});

export default PaymentInstructions;
