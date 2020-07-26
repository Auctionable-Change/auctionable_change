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
import { useStore } from "../store";
import { fetchItems } from './apiCalls';
import { Picker, Icon, CardItem, Card, Left, Body, Button } from 'native-base'
import NavBar from "../components/NavBar"

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
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Picker
        mode="dropdown"
        iosIcon={<Icon name="arrow-down" />}
        style={{ width: 300 }}
        placeholder="Item Category"
        selectedValue={filterCategory}
        onValueChange={(event) => filterListings(event)}
      >
        <Picker.Item label="All" value="all" />
        <Picker.Item label="Electronics" value="electronics" />
        <Picker.Item label="Home" value="home" />
        <Picker.Item label="Furniture" value="furniture" />
        <Picker.Item label="Baby/Kids" value="baby" />
        <Picker.Item label="Other" value="other" />
      </Picker>

      {isLoading && (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#2CB833" />
        </View>
      )}

      <FlatList
        data={listings}
        style={styles.scrollView}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card>
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
                    : require("../assets/icons/no-photo-selected.png")
                }
                style={styles.image}
              />
            </CardItem>
            <CardItem style={{ justifyContent: "space-between" }}>
              <Text>{`Current Price: $${item.price}`}</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  cardTitle: {
    marginBottom: 10,
    fontSize: 25,
    alignSelf: "center",
  },
  listing: {
    marginTop: 5,
    padding: 20,
  },
  picker: {
    height: 15,
    width: "50%",
  },
  scrollView: {
    width: "90%",
    // marginTop: 140
  },
  pickerItem: {
    height: 150,
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
  itemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
    marginTop: 10,
    borderColor: "#2cb833",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  button: {
    color: "blue",
  },
});

export default CurrentListings;

{
  /* <Text style={styles.pageTitle}>Browse Listings:</Text> */
}
{
  /* <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={filterCategory}
        onValueChange={(itemValue) => {
          filterListings(itemValue);
        }}
      >
        <Picker.Item label="All" value="all" />
        <Picker.Item label="Electronics" value="electronics" />
        <Picker.Item label="Home" value="home" />
        <Picker.Item label="Furniture" value="furniture" />
        <Picker.Item label="Baby/Kids" value="baby" />
      </Picker> */
}
