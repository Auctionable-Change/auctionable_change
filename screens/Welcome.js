import * as React from "react";
import { View, Button, Image, Text } from "react-native";
import NavBar from '../components/NavBar/NavBar';
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";


const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/stacked_logo.png')} style={styles.logo} />
      <TouchableOpacity
        onPress={() => navigation.navigate("Listings")}
        style={styles.button}
      >
        <Text>Current Listings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Post Item")}
        style={styles.button}
      >
        <Text>Post Item</Text>
      </TouchableOpacity>
      <NavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  logo: {
    width: "90%",
    height: 200,
    resizeMode: "contain",
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
  }
});

export default Welcome;
