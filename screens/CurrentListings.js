import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { Picker } from '@react-native-community/picker';
import { useStore } from "../store";
import { fetchItems } from './apiCalls';
import { TouchableOpacity } from "react-native-gesture-handler";

const CurrentListings = ({ navigation }) => {
  const { dispatch } = useStore()
  const [listings, setListings] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [allListings, setAllListings] = useState([])

  const filterListings = (filterCriteria) => {
    
    if(filterCriteria === 'all') {
      setListings(allListings)
      setFilterCategory(filterCriteria)
    } else {
        const filteredListings = allListings.filter(listing => listing.category === filterCriteria)
        setListings(filteredListings)
        setFilterCategory(filterCriteria)
    }
  }

  const pressHandler = (name) => {
    let currentListing = listings.filter(listing => listing.title === name)[0]
    dispatch({ type: "ADD_CURRENT_LISTING", currentListing: currentListing })
    navigation.navigate("Details");
  }

  useEffect(() => {
    const fetchData = async () => {
      const items = await fetchItems()
      setAllListings(items.items)
      setListings(items.items)
    }
    fetchData()
  }, [])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* <Text style={styles.pageTitle}>Browse Listings:</Text> */}
      <Picker
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
      </Picker>
      <FlatList
        data={listings}
        style={styles.scrollView}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.pageTitle}>{item.title}</Text>
            <Image
              source={
                item.image
                  ? { uri: item.image }
                  : require("../assets/icons/no-photo-selected.png")
              }
              style={styles.image}
            />
            <Text
              style={{ marginTop: 10 }}
            >{`Current Price: $${item.price}`}</Text>
            <TouchableOpacity
              title="Listing Details"
              onPress={() => pressHandler(item.title)}
              style={styles.button}
            >
              <Text>Listing Details:</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 225,
    height: 200,
    resizeMode: "cover"
  },
  pageTitle: {
    marginBottom: 10,
    fontSize: 25,
    justifyContent: "center",
  },
  listing: {
    marginTop: 5,
    padding: 20
  },
  picker: {
    height: 15, 
    width: '50%', 
  },
  scrollView: {
    width: '90%', 
    marginTop: 140
  },
  pickerItem: {
    height: 150
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    marginTop: 10,
    borderColor:  '#2cb833',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10
  },
  button: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    width: 200,
    margin: 10,
    padding: 10,
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 1,
    }
  }
})

export default CurrentListings;
