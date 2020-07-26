import * as React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../components/NavBar/NavBar";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useStore } from "../store";
import * as Linking from "expo-linking";
import { Button } from "native-base";

const ListingDetails = ({ navigation }) => {
  const { state } = useStore();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>{state.currentListing.title}</Text>
          <Image
            style={styles.image}
            source={
              state.currentListing.image
                ? { uri: state.currentListing.image }
                : require("../assets/icons/no-photo-selected.png")
            }
          />
          <Text style={styles.description}>
            {state.currentListing.description}
          </Text>
          <Text style={{ fontSize: 20 }}>
            Listed Price: ${state.currentListing.price}
          </Text>
          <Text style={styles.charityDescription}>
            Purchase of this item supports {state.currentListing.charity}
          </Text>
          <Text>Charity Score: {state.currentListing.charity_score}</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Text>Read more about their mission </Text>
            <Text
              style={{ fontWeight: "bold" }}
              onPress={() => Linking.openURL(state.currentListing.charity_url)}
            >
              here.
            </Text>
          </View>
        </View>
        <Button block success onPress={() => navigation.navigate("Purchase")}>
          <Text style={{ color: "white", fontSize: 15 }}>Donate For Item</Text>
        </Button>
        <View style={styles.charityContainer}>
          <Text style={styles.charityAttribution}>
            Charity information provided by
          </Text>
          <Image
            source={require("../assets/charity_navigator.jpg")}
            style={{ width: 90, height: 45 }}
          />
        </View>
      </ScrollView>
      <NavBar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  itemContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  title: {
    margin: 10,
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  scroll: {
    display: "flex",
    alignItems: "center",
    padding: 15,
  },
  image: {
    width: 225,
    height: 225,
    resizeMode: "cover",
    alignSelf: "center",
  },
  description: {
    marginTop: 15,
    marginBottom: 15,
  },
  charityDescription: {
    marginTop: 15,
  },
  charityAttribution: {
    fontStyle: "italic",
    width: 140,
    textAlign: "center",
    color: "#336799",
    marginTop: 5,
    marginBottom: 30,
  },
  charityContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 15,
    height: 120,
  },
});

export default ListingDetails;
