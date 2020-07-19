import React from 'react'
import { View, Image } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";



const NavBar = ({ navigation }) => {

  return (
    <View style={styles.navBar}>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("Current Listings")}
      >
        <Image
          accessibilityRole="button"
          id="search"
          source={require("../assets/icons/search.png")}
          style={styles.icons}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("Post Item")}
      >
        <Image
          accessibilityRole="button"
          id="add"
          source={require("../assets/icons/add.png")}
          style={styles.icons}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <Image
          accessibilityRole="button"
          id="profile"
          source={require("../assets/icons/profile.png")}
          style={styles.icons}
        />
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    bottom: "0%",
    height: "11%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  icons: {
    width: 45,
    height: 45,
  },
});

export default NavBar;
