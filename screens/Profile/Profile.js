import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList } from "react-native";
import { Button, Text, Card, View } from 'native-base'
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../components/NavBar/NavBar";
import { fetchUserInfo, fetchBid} from "../apiCalls";
import { useStore } from "../../store";
import moment from 'moment';

const Profile = ({ navigation }) => {
  const { state } = useStore();
  const [bidHistory, setBidHistory] = useState([])

  const getBidData = async (userId) => {
    fetchUserInfo(userId)
    .then(data => {
      const promises = data.bids.map(bid => {
        return fetchBid(bid.item_id)
        .then(info => {
          return {
            itemName: info.title,
            auctionEnd: info.auction_end,
            charity: info.charity,
            bidAmount: bid.amount,
            status: info.status,
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
  
  const payment = () => {
    navigation.navigate('PaymentInstructions')
  }
 
  useEffect( () => {
    console.log(state)
    getBidData(state.loginDetails.user_id)
  }, [])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* {console.log(state)} */}
      <Text style={styles.title}>Hello, {state.userInfo.first_name}</Text>
      <Text style={styles.title}>Your Bidding History:</Text>
      <FlatList
        data={bidHistory}
        style={styles.scrollView}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.cardDefault}>
            {console.log("item", item)}
            <View style={{ alignContents: "center" }}>
              <Text style={styles.normal}>Item Title: {item.itemName}</Text>
              <Text style={styles.normal}>
                Auction End: {timeConvert(item.auctionEnd)}
              </Text>
              <Text style={styles.normal}>Charity: {item.charity}</Text>
              <Text style={styles.normal}>Your Bid: ${item.bidAmount}</Text>
              {item.winner && (
                <View>
                  {item.status === "pending" && (
                    <Button transparent onPress={() => payment()}>
                      <Text style={styles.normal}>
                        Status: Won Auction! -- Pay Now
                      </Text>
                    </Button>
                  )}
                  {item.status != "pending" && (
                    <Text style={styles.normal}>
                      Status: Won Auction! -- Paid
                    </Text>
                  )}
                </View>
              )}
              {!item.winner && (
                <View>
                  {item.status === "available" && (
                    <>
                      <Text style={styles.normal}>
                        Result: Auction Ongoing.{" "}
                      </Text>
                      <Text style={styles.normal}>
                        Ends: {timeConvert(item.auctionEnd)}
                      </Text>
                    </>
                  )}
                  {item.status === "sold" && (
                    <Text style={styles.normal}>Result: Lost Auction</Text>
                  )}
                </View>
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
    width: "100%",
    padding: 10,
    marginBottom: 50,
    marginTop: 15
  },
  cardDefault: {
    backgroundColor: "#FFF",
    padding: 15,
    width: "98%",
    marginTop: 15,
    marginBottom: 15,
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

