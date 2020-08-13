import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList } from "react-native";
import { Button, Text, Segment, Card, View } from 'native-base'
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../components/NavBar/NavBar";
import { fetchUserInfo, fetchBid} from "../apiCalls";
import { useStore } from "../../store";
import moment from 'moment';

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

  const timeConvert = (timestamp) => {
    let date = moment.unix(timestamp).format('dddd, MMMM Do, YYYY h:mm:ss A')
    return date
  }
 
  useEffect( () => {
    getBidData(1)
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF", alignItems: "center", }}>
      <Text style={styles.title}>Hello, [name]!</Text>
      <Text style={styles.title}>Your Bidding History:</Text>
        <FlatList data={bidHistory}
                    style={styles.scrollView}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <Card style={styles.cardDefault}>
                        <View style={{ alignContents:'center'}}>
                          <Text style={styles.normal}>Item Title: {item.itemName}</Text>
                          <Text style={styles.normal}>Auction End: {timeConvert(item.auctionEnd)}</Text>
                          <Text style={styles.normal}>Charity: {item.charity}</Text>
                          <Text style={styles.normal}>Your Bid: ${item.bidAmount}</Text>
                          {item.winner && (
                            <Text style={styles.normal}>Result: Won Auction!</Text>
                          )}
                          {!item.winner && (
                            <Text style={styles.normal}>Result: Lost Auction</Text>
                          )}
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
    height: 200,
    flexDirection: "row",
  },
  normal: {
    alignContent: "center",
    justifyContent: 'center',
    fontSize: 15,
    fontFamily: "quicksand",
    margin: 5
  }
});

export default Profile

