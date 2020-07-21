import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, StyleSheet, ScrollView } from "react-native";
import mockListings from '../mockData/mockListings';
import { Picker } from '@react-native-community/picker';
import { useStore } from "../store"

const CurrentListings = ({ navigation }) => {
  const { dispatch } = useStore()
  const [listings, setListings] = useState(mockListings);
  const [filterCategory, setFilterCategory] = useState('');

  const filterListings = (filterCriteria) => {
    if(filterCriteria === 'all') {
      setListings(mockListings)
      setFilterCategory(filterCriteria)
    } else {
        const filteredListings = mockListings.filter(listing => listing.category === filterCriteria)
        setListings(filteredListings)
        setFilterCategory(filterCriteria)
    }
  }

  const pressHandler = (name) => {
    navigation.navigate("Details");
    let currentListing = listings.filter(listing => listing.name === name)[0]
    console.log(currentListing);
    dispatch({ type: "ADD_CURRENT_LISTING", currentListing: currentListing })
  }

  return (
    <View style={{ flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
      {/* <Text style={styles.pageTitle}>Browse Listings:</Text> */}
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Picker
            style={styles.picker}
            selectedValue={filterCategory}
            onValueChange={(itemValue) => {
              filterListings(itemValue)
            }
            }>
          <Picker.Item label='All' value="all" />
          <Picker.Item label='Home' value="home" />
          <Picker.Item label='Furniture' value="furniture" />
          <Picker.Item label='Baby/Kids' value="baby" />

        </Picker>
      </View>
      <ScrollView style={styles.scrollView}>
        { 
          listings.map((listing) => {
            return (
              <View key={listing.name} style={styles.container}>
                <Text style={styles.pageTitle}>{listing.name}</Text>
                <Image source={ require('./grill.jpg') } 
                      style={ styles.image }
                />
                <Text>{`Current Price: $${listing.price}`}</Text>
                <Button
                  title="Listing Details"
                  onPress={() => pressHandler(listing.name)}
                />
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'stretch'
  },
  pageTitle: {
    marginBottom: 5,
    fontSize: 25,
    justifyContent: "center"
  },
  listing: {
    marginTop: 5,
    padding: 20
  },
  picker: {
    height: 20, 
    width: 100, 
    marginTop: 0
  },
  scrollView: {
    width: 400, 
    marginTop: 200
  }
})

export default CurrentListings;
