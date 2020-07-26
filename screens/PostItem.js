import React from "react";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SellerForm from "../components/SellerForm";

const PostItem = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
    <KeyboardAwareScrollView>
      <Text style={styles.title}>Post an Item</Text>
      <SellerForm navigation={navigation} />
    </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 10,
  },
});

export default PostItem;
