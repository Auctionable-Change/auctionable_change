import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import Welcome from "./screens/Welcome";
import CurrentListings from "./screens/CurrentListings";
import ListingDetails from "./screens/ListingDetails";
import LogoTitle from "./components/LogoTitle"
import PostItem from "./screens/PostItem"
import PaymentInstructions from "./screens/PaymentInstructions"
import { StoreProvider } from "./store"

const Stack = createStackNavigator();


export default function App() {
  return (
    <StoreProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Welcome} />
          <Stack.Screen
            name="Listings"
            component={CurrentListings}
            options={{ headerTitle: () => <LogoTitle /> }}
          />
          <Stack.Screen
            name="Details"
            component={ListingDetails}
            options={{ headerTitle: () => <LogoTitle /> }}
          />
          <Stack.Screen
            name="Post Item"
            component={PostItem}
            options={{ headerTitle: () => <LogoTitle /> }}
          />
          <Stack.Screen
            name="Purchase"
            component={PaymentInstructions}
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
