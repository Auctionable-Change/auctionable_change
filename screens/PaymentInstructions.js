import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "native-base";
import { useStore } from "../store";
import * as Linking from "expo-linking";
import Camera from "./Camera";

const PaymentInstructions = ({ navigation }) => {
  const { state } = useStore();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Text style={styles.title}>Thank you for your contribution!</Text>
        <Text style={styles.subheader}>Instructions to complete order:</Text>
        <Text>1. Follow this </Text>
        <Text
          style={{ fontWeight: "bold", textDecorationLine: "underline" }}
          onPress={() => Linking.openURL(state.currentListing.charity_url)}
        >
          link
        </Text>
        <Text> to donate at least ${state.currentListing.price}</Text>
        <Text>Screenshot and upload your receipt.</Text>
        <Camera
          cameraType="launchImageLibraryAsync"
          user="buyer"
          prompt="Click the camera to upload a screenshot of donation receipt from your camera roll."
          title="Upload a Photo"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  subheader: {
    fontSize: 15,
    marginBottom: 20,
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
    margin: 5,
  },
  textInput: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    padding: 5,
    width: 250,
  },
  button: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: 200,
    padding: 10,
    margin: 15,
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  stepOne: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
});

export default PaymentInstructions;
