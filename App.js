import React, { useEffect } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StoreProvider } from "./store";
import { StyleSheet } from "react-native";
import LogoTitle from "./components/LogoTitle";
import Welcome from "./screens/Welcome";
import CurrentListings from "./screens/CurrentListings";
import ListingDetails from "./screens/ListingDetails";
import PostItem from "./screens/PostItem";
import PaymentInstructions from "./screens/PaymentInstructions";
import ChooseCharity from "./screens/ChooseCharity";
import PostConfirmation from "./screens/PostConfirmation";
import EmailForm from "./screens/EmailForm";
import Camera from "./screens/Camera";

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        ...Ionicons.font,
      });
    };
    loadFonts();
  });

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
            name="Purchase"
            component={PaymentInstructions}
            options={{ headerTitle: () => <LogoTitle /> }}
          />
          <Stack.Screen
            name="Email"
            component={EmailForm}
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
          <Stack.Screen
            name="Camera"
            options={{ headerTitle: () => <LogoTitle /> }}
          >
            {() => <Camera cameraType="launchCameraAsync"
              user="seller"
              prompt="Press camera to take a photo of your item to donate!"
              title="Upload a Photo"/>}
          </Stack.Screen>
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
