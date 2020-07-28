import React from "react";
import { View, Image } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const NavBar = ({ navigation }) => {
  return (
    <View style={styles.navBar}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Listings")}>
        <Image
          accessibilityRole="button"
          id="search"
          source={require("../../assets/icons/search.png")}
          style={styles.icons}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("Post Item")}
      >
        <Image
          accessibilityRole="button"
          id="add"
          source={require("../../assets/icons/add.png")}
          style={styles.icons}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Home")}>
        <Image
          accessibilityRole="button"
          id="home"
          source={require("../../assets/icons/home.png")}
          style={styles.icons}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    width: "100%",
    backgroundColor: "#2cb833",
    position: "absolute",
    bottom: "0%",
    height: "8%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 8,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
  },
  icons: {
    width: 30,
    height: 30,
  },
});

export default NavBar;
