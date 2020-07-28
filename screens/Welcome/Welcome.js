import * as React from "react";
import { View, Image } from "react-native";
import NavBar from "../../components/NavBar/NavBar";
import { StyleSheet } from "react-native";
import { Text } from "native-base";

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/stacked_logo.png")}
        style={styles.logo}
      />
      <View
        style={{
          padding: 20,
          width: "80%",
          alignSelf: "center",
        }}
      >
        <View
          style={{
            marginBottom: 30,
            alignItems: "center",
          }}
        >
          <Image
            accessibilityRole="button"
            id="add"
            source={require("../../assets/icons/browse.png")}
            style={styles.icons}
          />
          <Text style={{ width: "80%" }}>
            <Text style={styles.iconText}>Browse </Text>
            <Text style={styles.pageText}>
              and buy items to get cool stuff while supporting a good cause
            </Text>
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Image
            accessibilityRole="button"
            id="add"
            source={require("../../assets/icons/package.png")}
            style={styles.icons}
          />
          <Text style={{ width: "80%" }}>
            <Text style={styles.iconText}>Post </Text>
            <Text style={styles.pageText}>
              items for sale to donate proceeds to your favorite charities
            </Text>
          </Text>
          <Text
            style={{ fontFamily: "quicksand", fontSize: 15, marginTop: 25 }}
          >
            Together we can make <Text style={styles.iconText}>A.change</Text>!
          </Text>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 50,
          flexDirection: "row",
          justifyContent: "space-between",
          width: "95%",
        }}
      >
        <Text style={styles.iconText}>Browse</Text>
        <Text style={styles.iconText}>Post</Text>
        <Text style={styles.iconText}>Home</Text>
      </View>
      <NavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  logo: {
    width: 400,
    height: 140,
    resizeMode: "contain",
  },
  icons: {
    width: 50,
    marginBottom: 10,
    height: 50,
  },
  iconText: {
    fontFamily: "quicksand-bold",
    color: "#2cb833",
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    marginBottom: 2.5,
  },
  pageText: {
    fontFamily: "quicksand",
    fontSize: 18,
  },
});

export default Welcome;
