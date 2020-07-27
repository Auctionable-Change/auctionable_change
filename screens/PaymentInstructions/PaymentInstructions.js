import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "native-base";
import { useStore } from "../../store";
import * as Linking from "expo-linking";
import Camera from "../Camera/Camera";

const PaymentInstructions = ({ navigation }) => {
  const { state } = useStore();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Thank you for your contribution!</Text>
      <Text style={styles.subtitle}>Instructions to complete order:</Text>
      <View style={styles.stepOne}>
        <Text>First, follow this </Text>
        <Text
          style={{ fontWeight: "bold", textDecorationLine: "underline" }}
          onPress={() => Linking.openURL(state.currentListing.charity_url)}
        >
          link
          {" "}
        </Text>
        <Text>to donate at least ${state.currentListing.price}.</Text>
      </View>
      <Text style={{margin: 10}}>
        Then, take a screenshot that includes your name, charity name and donation
        amount.
      </Text>
      <Text>
      Do not include other personal information.
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
    margin: 5,
  },
  scroll: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    margin: 5,
  },
  stepOne: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
});

export default PaymentInstructions;
