import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SellerForm from "../components/SellerForm";
import NavBar from "../components/NavBar/NavBar";


const PostItem = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Post an Item</Text>
        <SellerForm style={styles.form} navigation={navigation} />
      </View>
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
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
  },
});

export default PostItem;
