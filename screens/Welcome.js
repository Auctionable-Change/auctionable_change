import * as React from "react";
import { View, Button } from "react-native";

const Welcome = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Current Listings"
        onPress={() => navigation.navigate("Current Listings")}
      />
    </View>
  );
};

export default Welcome;
