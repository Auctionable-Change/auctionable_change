import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../components/NavBar/NavBar";

const ThankYou = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text style={styles.text}>Thank you for contributing to A.change!</Text>
        <Text style={styles.text}>Please check your email for updates.</Text>
      </View>
      <NavBar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: { fontSize: 20, margin: 5 },
});

export default ThankYou;
