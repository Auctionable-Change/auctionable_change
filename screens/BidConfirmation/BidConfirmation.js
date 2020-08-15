import React, { useState } from "react";
import { StyleSheet, View, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Button } from "native-base";
import { useStore } from "../../store";
import { ScrollView } from "react-native-gesture-handler";
import NavBar from "../../components/NavBar/NavBar";
import { postBid } from "../apiCalls";

const BidConfirmation = ({ navigation }) => {
  const { state } = useStore();
  const [bidObj, setBidObj] = useState({
    item_id: state.currentListing.id, 
    user_id: state.userInfo.id,
    amount: state.currentBid
  })

  const confirmBid = async () => {
    const response = await postBid(bidObj)
    
    if(response.status === 200) {
      Alert.alert("Bid Placed!", "Congratulations! Your Bid Was Succesfully Placed");
      navigation.navigate('Profile')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ width: "100%" }}>
        <View>
          <Text style={styles.title}>Please Confirm Your Bid:</Text>
          <Text style={styles.subtitle}>{state.currentListing.title}</Text>
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
          rounded
          success
          style={{
            backgroundColor: "#2cb833",
            marginBottom: 80,
            alignSelf: "center",
            marginTop: 20,
          }}
          onPress={() => confirmBid()}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "quicksand-bold",
              fontSize: 15,
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
    textAlign: "center",
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    margin: 5,
    fontFamily: "quicksand-bold",
  },
  image: {
    width: "100%",
    height: 350,
    resizeMode: "cover",
    alignSelf: "center",
    margin: 10,
  },
});

export default BidConfirmation;