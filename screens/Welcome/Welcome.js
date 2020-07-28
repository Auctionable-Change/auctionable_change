import * as React from "react";
import { View, Image } from "react-native";
import NavBar from '../../components/NavBar/NavBar';
import { StyleSheet } from "react-native";
import { Button, Text } from "native-base";


const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/stacked_logo.png")}
        style={styles.logo}
      />
      <Text style={styles.motto}>
        Buy and sell with purpose because together we can make A.change
      </Text>
      <View style={{ flex: 1, padding: 10 }}>
        <Button block info onPress={() => navigation.navigate("Listings")}>
          <Text style={{ fontFamily: "quicksand-bold" }}>Current Listings</Text>
        </Button>
        <Button
          style={{ marginTop: 30 }}
          block
          info
          onPress={() => navigation.navigate("Post Item")}
        >
          <Text style={{ fontFamily: "quicksand-bold" }}>Post Item</Text>
        </Button>
      </View>
      <NavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: "95%",
    height: 200,
    resizeMode: "contain",
  },
  motto: {
    width: "70%",
    textAlign: "center",
    alignSelf: "center",
    color: "grey",
    marginBottom: 10,
    fontFamily: "quicksand",
  },
});

export default Welcome;
