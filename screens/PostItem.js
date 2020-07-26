import React from "react";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SellerForm from "../components/SellerForm";
import NavBar from "../components/NavBar/NavBar";


const PostItem = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Text style={styles.title}>Post an Item</Text>
      <SellerForm style={styles.form} navigation={navigation} />
      <NavBar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default PostItem;
