import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "native-base";
import { useStore } from "../../store";
import * as Linking from "expo-linking";
import Camera from "../Camera/Camera";
import { ScrollView } from "react-native-gesture-handler";


const PaymentInstructions = () => {
  const { state } = useStore();
  // had to add scroll view because when i changed font the button was below screen

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ alignItems: "center", margin: 0 }}
      >
        <Text style={styles.title}>Thank you for your contribution!</Text>
        <Text style={styles.subtitle}>Instructions to complete order:</Text>
        <View style={styles.stepOne}>
          <Text style={{ fontFamily: "quicksand", fontSize: 15 }}>
            First, follow this{" "}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "quicksand-bold",
              textDecorationLine: "underline",
            }}
            onPress={() => Linking.openURL(state.currentListing.charity_url)}
          >
            link{" "}
          </Text>
          <Text style={{ fontFamily: "quicksand", fontSize: 15 }}>
            to donate at least ${state.currentListing.price}.
          </Text>
        </View>
        <Text style={styles.listItem}>
          Then, take a screenshot that includes your name, charity name and
          donation amount.
        </Text>
        <Text style={styles.listItem}>
          Do not include other personal information.
        </Text>
        <Camera
          cameraType="launchImageLibraryAsync"
          user="buyer"
          prompt="Press camera to upload screenshot of donation receipt from your camera roll."
          title="Upload Receipt"
        />
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
    margin: 10,
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
    fontFamily: "quicksand-bold",
  },
  listItem: {
    fontSize: 15,
    margin: 20,
    fontFamily: "quicksand",
  },
  stepOne: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
});

export default PaymentInstructions;
