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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Thank you for your contribution!</Text>
        <Text style={styles.subtitle}>Instructions to complete order:</Text>
        <Text style={styles.listItem}>1. Follow this </Text>
        <Text
          style={{ fontWeight: "bold", textDecorationLine: "underline" }}
          onPress={() => Linking.openURL(state.currentListing.charity_url)}
        >
          link
        </Text>
        <Text style={styles.listItem}>
          to donate at least ${state.currentListing.price}.
        </Text>
        <Text>Screenshot and upload your receipt to send to seller.</Text>
        <Camera
          cameraType="launchImageLibraryAsync"
          user="buyer"
          prompt="Press camera to upload screenshot of donation receipt from your camera roll."
          title="2. Upload a Photo"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    fontSize: 20,
    margin: 5,
    flexDirection: "row",
    flexWrap: "wrap",
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
});

export default PaymentInstructions;
