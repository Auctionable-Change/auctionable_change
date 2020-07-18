import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import Welcome from "./screens/Welcome";
import CurrentListings from "./screens/CurrentListings";
import ListingDetails from "./screens/ListingDetails";
import PurchaseItem from "./screens/PurchaseItem";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome Friend" component={Welcome} />
        <Stack.Screen name="Current Listings" component={CurrentListings} />
        <Stack.Screen name="Listing Details" component={ListingDetails} />
        <Stack.Screen name="Purchase Item" component={PurchaseItem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
