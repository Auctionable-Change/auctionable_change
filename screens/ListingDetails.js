import * as React from "react";
import { View, Button, Image, Text } from "react-native";
import NavBar from "../components/NavBar";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ListingDetails = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Listing Details</Text>
      <TouchableOpacity
        onPress=
        {() => navigation.navigate("Purchase Item")}
        style={styles.button}>
        <Text>Purchase Item</Text>
      </TouchableOpacity>
      <NavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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

export default ListingDetails;
