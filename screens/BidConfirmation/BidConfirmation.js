import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Button } from "native-base";
import { useStore } from "../../store";
import * as Linking from "expo-linking";
import Camera from "../Camera/Camera";
import { ScrollView } from "react-native-gesture-handler";
import NavBar from "../../components/NavBar/NavBar";
import { postBid } from "../apiCalls";

const BidConfirmation = ({ navigation }) => {
  const { state } = useStore();
  const [bidObj, setBidObj] = useState({
    item_id: state.currentListing.id, 
    user_id: state.currentListing.user_id,
    amount: state.currentBid
  })

  const confirmBid = () => {
    console.log('bidObj', bidObj)
    postBid(bidObj)
  }

  return(
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: "center", width: "100%" }}>
        <Text style={styles.title}></Text>
        <Button
          block
          success
          style={{ backgroundColor: "#2cb833", margin: 5 }}
          onPress={() => confirmBid()}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "quicksand-bold",
              fontSize: 20,
            }}
          >
            Place Bid
          </Text>
        </Button>
      </ScrollView>
      <NavBar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: "#FFFFFF",
  display: "flex",
},
subtitle: {
  fontSize: 20,
  fontFamily: "quicksand",
  margin: 5,
},
title: {
  fontSize: 25,
  textAlign: "center",
  margin: 5,
  fontFamily: "quicksand-bold",
},
listItem: {
  fontSize: 15,
  marginLeft: 20,
  marginRight: 20,
  marginTop: 5,
  marginBottom: 5,
  fontFamily: "quicksand",
},
stepOne: {
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 5,
},
});

export default BidConfirmation;