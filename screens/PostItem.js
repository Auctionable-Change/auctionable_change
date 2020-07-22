import * as React from "react";
import { SafeAreaView, Text, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { useStore } from "../store";

const PostItem = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text>Post an Item</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          placeholder="Your Name"
        />
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          placeholder="Your Email"
        />
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          placeholder="Name of Item"
        />
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          placeholder="Item Description"
        />
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          placeholder="Minimum Donation for Item"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Choose Charity")}
          style={styles.button}
        >
          <Text>Choose Charity</Text>
        </TouchableOpacity>
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

export default PostItem;
