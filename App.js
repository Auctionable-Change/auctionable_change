import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StoreProvider } from "./store";
import { StyleSheet } from "react-native";
import LogoTitle from "./components/LogoTitle";
import Welcome from "./screens/Welcome";
import CurrentListings from "./screens/CurrentListings";
import ListingDetails from "./screens/ListingDetails";
import PurchaseItem from "./screens/PurchaseItem";
import PostItem from "./screens/PostItem";
import ChooseCharity from "./screens/ChooseCharity";
import PostConfirmation from "./screens/PostConfirmation";

const Stack = createStackNavigator();

export default function App() {
  return (
    <StoreProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Welcome} />
          <Stack.Screen
            name="Current Listings"
            component={CurrentListings}
            options={{ headerTitle: () => <LogoTitle /> }}
          />
          <Stack.Screen
            name="Listing Details"
            component={ListingDetails}
            options={{ headerTitle: () => <LogoTitle /> }}
          />
          <Stack.Screen
            name="Purchase Item"
            component={PurchaseItem}
            options={{ headerTitle: () => <LogoTitle /> }}
          />
          <Stack.Screen
            name="Post Item"
            component={PostItem}
            options={{ headerTitle: () => <LogoTitle /> }}
          />
          <Stack.Screen
            name="Choose Charity"
            component={ChooseCharity}
            options={{ headerTitle: () => <LogoTitle /> }}
          />
          <Stack.Screen
            name="Confirmation"
            component={PostConfirmation}
            options={{ headerTitle: () => <LogoTitle /> }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
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
