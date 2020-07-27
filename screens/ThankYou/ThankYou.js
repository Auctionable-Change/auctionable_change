import * as React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../components/NavBar/NavBar";

const ThankYou = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>Thank you for contributing to A.Change!</Text>
      </View>
      <NavBar navigation={navigation} />
    </SafeAreaView>
  );
};

export default ThankYou;
