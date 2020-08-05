import React from 'react'
import { StyleSheet } from "react-native";
import { Button, Text, Segment } from 'native-base'
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../components/NavBar/NavBar";


const Profile = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Text style={styles.title}>Hello, [name]!</Text>
      <Segment style={{ backgroundColor: "#FFFFFF", marginTop: 20 }}>
        <Button first active>
          <Text>Bids Won</Text>
        </Button>
        <Button>
          <Text>Current Bids</Text>
        </Button>
        <Button last>
          <Text>Past Bids</Text>
        </Button>
      </Segment>
      <NavBar navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: "quicksand",
    color: "#4a4a4a",
  },
  title: {
    fontSize: 25,
    fontFamily: "quicksand",
    color: "#4a4a4a",
    textAlign: "center"
  },
});

export default Profile

