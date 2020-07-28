import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../components/NavBar/NavBar";

const ThankYou = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Thank you for contributing to A.change!</Text>
      <Text style={styles.text}>Please check your email for updates.</Text>
      <NavBar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  text: {
    fontSize: 20,
    margin: 10,
    textAlign: "center",
    fontFamily: "quicksand",
    marginTop: 20,
  },
});

export default ThankYou;
