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
<<<<<<< HEAD
  text: { fontSize: 20, margin: 15 },
=======
  text: {
    fontSize: 20,
    margin: 10,
    textAlign: "center",
    fontFamily: "quicksand",
    marginTop: 20
  },
>>>>>>> b6751359646ff63db57637c857331c158a511815
});

export default ThankYou;
