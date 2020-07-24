import * as React from "react";
import { SafeAreaView, Text } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { useStore } from "../store";

const PostConfirmation = ({ navigation }) => {
  const { state } = useStore()
  console.log(state)
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text>{state.selectedCharity.name}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Confirmation")}
          style={styles.button}
        >
          <Text>View Listing</Text>
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

export default PostConfirmation;
