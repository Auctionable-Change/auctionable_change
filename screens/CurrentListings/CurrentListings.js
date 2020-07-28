import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStore } from "../../store";
import { fetchItems } from "../apiCalls";
import { Picker, Icon, CardItem, Card, Left, Body, Button } from "native-base";
import NavBar from "../../components/NavBar/NavBar";

const CurrentListings = ({ navigation }) => {
  const { dispatch } = useStore();
  const [listings, setListings] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [allListings, setAllListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const filterListings = (filterCriteria) => {
    if (filterCriteria === "all") {
      setListings(allListings);
      setFilterCategory(filterCriteria);
    } else {
      const filteredListings = allListings.filter(
        (listing) => listing.category === filterCriteria
      );
      setListings(filteredListings);
      setFilterCategory(filterCriteria);
    }
  };

  const pressHandler = (name) => {
    let currentListing = listings.filter(
      (listing) => listing.title === name
    )[0];
    dispatch({ type: "ADD_CURRENT_LISTING", currentListing: currentListing });
    navigation.navigate("Details");
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const items = await fetchItems();
      setAllListings(items.items);
      setListings(items.items);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Picker
        mode="dropdown"
        iosIcon={<Icon name="arrow-down" />}
        style={{ alignSelf: "center", width: 300 }}
        placeholder="Filter by Category"
        selectedValue={filterCategory}
        onValueChange={(event) => filterListings(event)}
        textStyle={{ fontFamily: "quicksand-bold", fontSize: 15 }}
      >
        <Picker.Item label="All" value="all" />
        <Picker.Item label="Apparel" value="apparel" />
        <Picker.Item label="Baby/Kids" value="baby" />
        <Picker.Item label="Electronics" value="electronics" />
        <Picker.Item label="Furniture" value="furniture" />
        <Picker.Item label="Home" value="home" />
        <Picker.Item label="Other" value="other" />
      </Picker>

      {isLoading && (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#2CB833" />
        </View>
      )}

      <FlatList
        data={listings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 15 }}>
            <CardItem style={styles.cardItem}>
              <Left>
                <Body>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image
                source={
                  item.image
                    ? { uri: item.image }
                    : require("../../assets/icons/no-photo-selected.png")
                }
                style={styles.image}
              />
            </CardItem>
            <CardItem style={{ justifyContent: "space-between" }}>
              <Text
                style={{ fontSize: 15, fontFamily: "quicksand" }}
              >{`Minimum Donation: $${item.price}`}</Text>
              <Button
                transparent
                title="Listing Details"
                onPress={() => pressHandler(item.title)}
              >
                <Text style={styles.button}>Listing Details</Text>
              </Button>
            </CardItem>
          </Card>
        )}
      />
      <NavBar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
    alignSelf: "center",
  },
  cardTitle: {
    margin: 5,
    fontSize: 25,
    alignSelf: "center",
    fontFamily: "quicksand-bold",
    textAlign: "center",
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
  button: {
    color: "#065EFE",
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "quicksand-bold",
  },
});

export default CurrentListings;
