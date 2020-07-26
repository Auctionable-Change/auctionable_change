import * as React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../components/NavBar/NavBar";
import { StyleSheet } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { useStore } from "../store";
import * as Linking from "expo-linking";

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
          <Text style={styles.description}>
            Minimum Donation: ${state.currentListing.price}
          </Text>
          <Text style={styles.description}>
            This item supports {state.currentListing.charity}
          </Text>
          <Text style={styles.description}>
            Charity Score: {state.currentListing.charity_score}
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Text style={{ fontSize: 15, marginLeft: 5 }}>
              Read more about their mission{" "}
            </Text>
            <Text
              style={{ fontWeight: "bold", textDecorationLine: "underline" }}
              onPress={() => Linking.openURL(state.currentListing.charity_url)}
            >
              here
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Purchase")}
          style={styles.button}
        >
          <Text>Donate For Item</Text>
        </TouchableOpacity>
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
    backgroundColor: "#FFFFFF",
    margin: 10,
    padding: 10,
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
    fontSize: 25,
    textAlign: "center",
  },
  scroll: {
    display: "flex",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "cover",
    alignSelf: "center",
  },
  description: {
    margin: 5,
    fontSize: 15,
  },
  // need to consolidate button styles
  button: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: 200,
    padding: 10,
    marginTop: 5,
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  charityAttribution: {
    fontStyle: "italic",
    width: 140,
    textAlign: "center",
    color: "#336799",
    margin: 5,
  },
  charityContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    margin: 10,
    height: 120,
  },
});

export default ListingDetails;
