import React, { useState } from "react";
import { Image, Text, View, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Input, Label, Item } from "native-base";
import { useStore } from "../../store";
import NavBar from "../../components/NavBar/NavBar";
import * as Linking from "expo-linking";
import moment from 'moment';


const ListingDetails = ({ navigation }) => {
  const [currentBid, setCurrentBid] = useState(null)
  const { state, dispatch } = useStore();

  const timeConvert = (timestamp) => {
    let timestampNow = Math.floor(new Date().getTime()/1000.0)
    let timestampEnd = timestamp
    let secs = timestampEnd - timestampNow
    let hours = moment.utc(secs * 1000).format('HH')
    let minutes = moment.utc(secs * 1000).format('mm')
    let seconds = moment.utc(secs * 1000).format('ss')
    return hours + 'h '  + minutes.substr(-2) + 'm ' + seconds.substr(-2) + 's'
  }

  const verifyPrice =  (event) => {
    let numberString = event.nativeEvent.text.replace(/[^\d.]/g, '')
    let numberPrice = parseInt(numberString)
    setCurrentBid(numberPrice)
  }

  const postBid = () => {
    if (currentBid < state.currentListing.price) {
      Alert.alert("Incorrect Bid", "Please confirm your bid is greater than the minimum bid amount")
    } else {
      navigation.navigate("Bid Confirmation")    }
      dispatch({
        type: "POST_BID",
        bid: currentBid
      })
  }

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
          Charity Score:
        </Text>
        <Image
          source={{ uri: state.currentListing.charity_score_image }}
          style={{
            alignSelf: "center",
            height: 40,
            marginLeft: 15,
            resizeMode: "contain",
            width: 80,
          }}
        />
        <Text style={{fontFamily: "quicksand-bold", color: 'red'}}>
          Time Remaining: {timeConvert(state.currentListing.auction_end)}
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Text
            style={{
              fontFamily: "quicksand",
              fontSize: 15,
              marginLeft: 5,
            }}
          >
            Read more about their mission{" "}
          </Text>
          <Text
            style={{
              fontFamily: "quicksand-bold",
              textDecorationLine: "underline",
            }}
            onPress={() => Linking.openURL(state.currentListing.charity_url)}
          >
            here
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}></View>
        </View>
        <Item floatingLabel style={{marginTop: 25, alignSelf: 'center', }}>
          <Label style={styles.label}>Enter a bid greater than ${state.currentListing.price}</Label>
          <Input value={currentBid} onChange={(event) => verifyPrice(event)}/>
        </Item>
        <Button
          block
          success
          style={{ backgroundColor: "#2cb833", margin: 5 }}
          onPress={() => postBid()}
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
    fontFamily: "quicksand-bold",
  },
  scroll: {
    margin: 0,
    display: "flex",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 350,
    resizeMode: "cover",
    alignSelf: "center",
    margin: 5,
  },
  description: {
    margin: 5,
    fontSize: 15,
    fontFamily: "quicksand",
  },
  charityAttribution: {
    width: 140,
    textAlign: "center",
    color: "#336799",
    margin: 5,
    fontFamily: "quicksand",
  },
  charityContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 15,
    height: 120,
  },
  label: {
    paddingLeft: 10,
  }
  
});

export default ListingDetails;
