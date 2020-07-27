import * as React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../components/NavBar/NavBar";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useStore } from "../../store";
import * as Linking from "expo-linking";
import { Button } from "native-base";

const ListingDetails = ({ navigation }) => {
  const { state } = useStore();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>{state.currentListing.title}</Text>
        <Image
          style={styles.image}
          source={
            state.currentListing.image
              ? { uri: state.currentListing.image }
              : require("../../assets/icons/no-photo-selected.png")
          }
        />
        <Text style={styles.description}>
          {state.currentListing.description}
        </Text>
        <Text style={styles.description}>
          This item supports {state.currentListing.charity}
        </Text>
        <Text style={styles.description}>
          Minimum Donation: ${state.currentListing.price}
        </Text>
        <Text style={styles.description}>
          Charity Score: {state.currentListing.charity_score}
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Text style={{ fontSize: 15 }}>Read more about their mission </Text>
          <Text
            style={{ fontWeight: "bold", textDecorationLine: "underline" }}
            onPress={() => Linking.openURL(state.currentListing.charity_url)}
          >
            here
          </Text>
          <Text style={styles.description}>
            Charity Score: {state.currentListing.charity_score}
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Text style={{ fontSize: 15, marginLeft: 5, fontFamily: "quicksand" }}>
              Read more about their mission{" "}
            </Text>
            <Text
              style={{ textDecorationLine: "underline", fontFamily: "quicksand-bold" }}
              onPress={() => Linking.openURL(state.currentListing.charity_url)}
            >
              here
            </Text>
          </View>
        </View>
        <Button block success style={{ margin: 5 }} onPress={() => navigation.navigate("Purchase")}>
          <Text style={{ color: "white", fontSize: 15, fontFamily: "quicksand-bold" }}>Donate For Item</Text>
        </Button>
        <View style={styles.charityContainer}>
          <Text style={styles.charityAttribution}>
            Charity information provided by
          </Text>
          <Image
            source={require("../../assets/charity_navigator.jpg")}
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
    backgroundColor: "#FFFFFF",
  },
  title: {
    marginBottom: 5,
    fontSize: 25,
    textAlign: "center",
    fontFamily: "quicksand-bold"
  },
  scroll: {
    margin: 0,
    display: "flex",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    alignSelf: "center",
    margin: 5,
  },
  description: {
    margin: 5,
    fontSize: 15,
    fontFamily: "quicksand"
  },
  charityAttribution: {
    width: 140,
    textAlign: "center",
    color: "#336799",
    margin: 5,
    fontFamily: "quicksand"
  },
  charityContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 15,
    height: 120,
  },
});

export default ListingDetails;
