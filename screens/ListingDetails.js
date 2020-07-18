import React from "react";
import { View, Text, Button } from "react-native";

const ListingDetails = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Listing Details</Text>
      <Button
        title="Purchase Item"
        onPress={() => navigation.navigate("Purchase Item")}
      />
    </View>
  );
};

export default ListingDetails;
