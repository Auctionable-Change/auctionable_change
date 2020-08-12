import React, { useState } from 'react'
import { StyleSheet, FlatList } from "react-native";
import { Button, Text, Segment } from 'native-base'
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../components/NavBar/NavBar";
import { fetchUserInfo, fetchBid} from "../apiCalls";
import { useStore } from "../../store";


const Profile = ({ navigation }) => {
  const { state } = useStore();
  const [bidHistory, setBidHistory] = useState([])
  const [activePage, setActivePage] = useState(1)

  const segmentHandler = async (page) => {
  
    setActivePage(page)
    if(activePage === 1) {
      fetchUserInfo(1)
        .then(data => {
          const promises = data.map(bid => {
            return fetchBid(bid.item_id)
            .then(info => {
              return {
                itemName: info.title,
                auctionEnd: info.auction_end,
                charity: info.charity,
                bidAmount: bid.amount,
              }
            })
          })
          Promise.all(promises).then(bidsInfo => setBidHistory(bidsInfo))
      })
      console.log('bidHistory', bidHistory)
    }
     
      return (
        <FlatList data={userBids}>
          
        </FlatList>
      )
     
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Text style={styles.title}>Hello, [name]!</Text>
      <Segment>
        <Button first active={activePage === 1} onPress={() => segmentHandler(1)}>
          <Text>Current Bids</Text>
        </Button>
        <Button last active={activePage === 2} onPress={() => segmentHandler(2)}>
          <Text>Bid History</Text>
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

