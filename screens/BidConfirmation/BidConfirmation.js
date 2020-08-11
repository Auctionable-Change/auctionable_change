import React, { useState } from "react";
import { StyleSheet, View, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Button, Body, CardItem, Card } from "native-base";
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

  const confirmBid = async () => {
    const response = await postBid(bidObj)
    if(response.status === 200) {
      Alert.alert("Bid Placed!", "Congratulations! Your Bid Was Succesfully Placed");
      navigation.navigate('Profile')
    }
  }

  return(
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flex: 1, alignItems: "center", width: "100%", marginBottom: 25 }}>
      <View>
        <Text style={styles.title}>Please Confirm Your Bid:</Text>
        <Text style={styles.subtitle}>Item: {state.currentListing.title}</Text>
        <Text style={styles.subtitle}>Description: {state.currentListing.description}</Text>
        <Text style={styles.subtitle}>Your bid: ${state.currentBid}</Text>
      </View>
      <Image
          style={styles.image}
          source={
            state.currentListing.image
              ? { uri: state.currentListing.image }
              : require("../../assets/noimage.png")
          }
        />
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
  margin: 10,
  textAlign: "center",
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
  alignSelf: "center",
  margin: 10,
  borderColor: 'black',
  borderWidth: 5,
},
});

export default BidConfirmation;