import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { useStore } from "../../store";
import { Button, Text } from "native-base";
import { submitListing } from "../apiCalls";

const PostConfirmation = ({ navigation }) => {
  const { state } = useStore();

  const handleSubmit = () => {
    submitListing(state.listingToPost);
    // navigate to thank you
    navigation.navigate("Thank You");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <Text
          style={{
            marginBottom: 20,
            fontSize: 25,
            textAlign: "center",
          }}
        >
          Please review your listing before confirming:
        </Text>
        <Image
          source={{ uri: state.listingToPost.image }}
          style={styles.image}
        />
        <View style={{ padding: 10, backgroundColor: "#FFFFFF" }}>
          <Text style={(styles.text, { fontWeight: "bold" })}>Details:</Text>
          <Text style={styles.text}>Title: {state.listingToPost.title}</Text>
          <Text style={styles.text}>Price: ${state.listingToPost.price}</Text>
          <Text style={styles.text}>
            Description: {state.listingToPost.description}
          </Text>
          <Text style={styles.text}>
            Category: {state.listingToPost.category}
          </Text>
          <Text style={styles.text}>
            Charity: {state.listingToPost.charity}
          </Text>
          <Text style={(styles.text, { fontWeight: "bold" })}>About you:</Text>
          <Text style={styles.text}>Name: {state.listingToPost.donor}</Text>
          <Text style={styles.text}>
            Email: {state.listingToPost.donor_email}
          </Text>
        </View>
        <Text style={styles.alert}>
          Navigate back to the previous screens to edit or confirm listing.
        </Text>
        <Button block onPress={() => handleSubmit()} style={{ marginTop: 10 }}>
          <Text>Confirm Listing</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardItem: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    borderRadius: 3,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  text: {
    marginBottom: 5,
    marginLeft: 10,
  },
  alert: {
    textAlign: "center",
    margin: 10,
    width: "80%",
    fontStyle: "italic",
    alignSelf: "center",
    color: "grey",
  },
});

export default PostConfirmation;
