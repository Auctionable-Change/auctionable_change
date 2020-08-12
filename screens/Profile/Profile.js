import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList } from "react-native";
import { Button, Text, Segment, Card, View } from 'native-base'
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../components/NavBar/NavBar";
import { fetchUserInfo, fetchBid} from "../apiCalls";
import { useStore } from "../../store";


const Profile = ({ navigation }) => {
  const { state } = useStore();
  const [bidHistory, setBidHistory] = useState([])
  const [activePage, setActivePage] = useState(1)

  const getBidData = async (userId) => {
    fetchUserInfo(userId)
    .then(data => {
      const promises = data.map(bid => {
        return fetchBid(bid.item_id)
        .then(info => {
          return {
            itemName: info.title,
            auctionEnd: info.auction_end,
            charity: info.charity,
            bidAmount: bid.amount,
            id: bid.id,
            winner: bid.winner,
          }
        })
      })
    Promise.all(promises).then(bidsInfo => setBidHistory(bidsInfo))
  })
  }

  const segmentHandler = async (page) => {
    setActivePage(page)
    await getBidData(1)

    if(page === 1) {
      let timestampNow = Math.floor(new Date().getTime()/1000.0)
      // console.log('bidauctionend', bid.auctionEnd)
      console.log('timestampNow', timestampNow)

      let filteredBids = bidHistory.filter(bid => {
        console.log('bidauctionend', bid.auctionEnd)
        (bid.auctionEnd - timestampNow) > 0
      })
      setBidHistory(filteredBids)
    }

    if(page === 2) {
      setBidHistory(bidHistory)
    }
  }

  useEffect( () => {
    segmentHandler(1)
  }, [])

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
        <FlatList data={bidHistory}
                    style={styles.scrollView}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <Card style={styles.cardDefault}>
                        <View>
                          <Text>Item Title: {item.itemName}</Text>
                        </View>
                      </Card>
                    )}
          />
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
  scrollView: {
    flex: 1,
    width: "90%",
  },
  cardDefault: {
    backgroundColor: "#FFF",
    padding: 15,
    width: "98%",
    marginTop: 15,
    height: 130,
    flexDirection: "row",
  },
});

export default Profile

