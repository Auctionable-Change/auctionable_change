import React from "react";
import { View, Text, Button, Image, StyleSheet, ScrollView } from "react-native";
import mockListings from '../mockData/mockListings'

const CurrentListings = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <ScrollView>
      { 
        mockListings.map((listing) => {
          return (
            <View key={listing.name} style={styles.container}>
              <Text style={styles.pageTitle}>{listing.name}</Text>
              
              <Image source={ require('./grill.jpg') } 
                     style={ styles.image }
              />
              <Text>{`Current Price: ${listing.price}`}</Text>
              <Button
                title="Listing Details"
                onPress={() => navigation.navigate("Listing Details")}
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
  }
})

export default CurrentListings;
