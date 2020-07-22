import * as React from "react";
import { SafeAreaView, Image, Text } from "react-native";
import NavBar from "../components/NavBar";
import { StyleSheet } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { useStore } from "../store";


const ListingDetails = ({ navigation }) => {
  const { state } = useStore()
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Item Name</Text>
        <Image
          source={require("../assets/compact_logo.png")}
          style={styles.image}
        />
        <Text>Item Description</Text>
        <Text>Your purchase of this item supports:</Text>
        <Text>Charity Name</Text>
        <Text>Charity Score</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Purchase")}
          style={styles.button}
        >
          <Text>Donate For Item</Text>
        </TouchableOpacity>
      </ScrollView>
      <NavBar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    margin: 10,
  },
  image: {
    width: "95%",
    height: 200,
    resizeMode: "contain",
  },
  button: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: 200,
    padding: 10,
    margin: 10,
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
