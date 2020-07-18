import React from "react";
import { View, Text, Button } from "react-native";

const CurrentListings = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Current Listings</Text>
      <Button
        title="Listing Details"
        onPress={() => navigation.navigate("Listing Details")}
      />
    </View>
  );
};

export default CurrentListings;
