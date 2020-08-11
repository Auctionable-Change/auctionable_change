console.disableYellowBox = true;

import React, { useEffect, useState } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StoreProvider } from "./store";
import { Image } from "react-native";
import LogoTitle from "./components/LogoTitle";
import SignOut from "./components/SignOut";
import Welcome from "./screens/Welcome/Welcome";
import CurrentListings from "./screens/CurrentListings/CurrentListings";
import ListingDetails from "./screens/ListingDetails/ListingDetails";
import PostItem from "./screens/PostItem/PostItem";
import Login from "./screens/Login/Login";
import PaymentInstructions from "./screens/PaymentInstructions/PaymentInstructions";
import ChooseCharity from "./screens/ChooseCharity/ChooseCharity";
import PostConfirmation from "./screens/PostConfirmation/PostConfirmation";
import EmailForm from "./screens/EmailForm/EmailForm";
import Camera from "./screens/Camera/Camera";
import Profile from "./screens/Profile/Profile";
import ThankYou from "./screens/ThankYou/ThankYou";
import BidConfirmation from "./screens/BidConfirmation/BidConfirmation";


const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, updateFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        quicksand: require("./assets/fonts/Quicksand-Regular.ttf"),
        "quicksand-light": require("./assets/fonts/Quicksand-Light.ttf"),
        "quicksand-medium": require("./assets/fonts/Quicksand-Medium.ttf"),
        "quicksand-bold": require("./assets/fonts/Quicksand-SemiBold.ttf"),
        ...Ionicons.font,
      });
      await updateFontsLoaded(true);
    };
    loadFonts();
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <StoreProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerTitle: false,
              headerStyle: {
                backgroundColor: "#2cb833",
              },
            }}
          />
          <Stack.Screen
            name="Home"
            component={Welcome}
            options={{
              headerTitle: false,
              headerLeft: null,
              headerStyle: {
                backgroundColor: "#2cb833",
              },
            }}
          />
           <Stack.Screen
            name="Bid Confirmation"
            component={BidConfirmation}
            options={{
              headerTitle: false,
              headerBackTitleVisible: false,
              ...backButtonStyle,
              headerStyle: {
                backgroundColor: "#2cb833",
              },
            }}
          />
          <Stack.Screen
            name="Listings"
            component={CurrentListings}
            options={{
              headerTitle: () => <LogoTitle />,
              headerBackTitleVisible: false,
              ...backButtonStyle,
              headerStyle: {
                backgroundColor: "#2cb833",
              },
            }}
          />
          <Stack.Screen
            name="Details"
            component={ListingDetails}
            options={{
              headerTitle: () => <LogoTitle />,
              headerBackTitleVisible: false,
              ...backButtonStyle,
              headerStyle: {
                backgroundColor: "#2cb833",
              },
            }}
          />
          <Stack.Screen
            name="Purchase"
            component={PaymentInstructions}
            options={{
              headerTitle: () => <LogoTitle />,
              headerBackTitleVisible: false,
              ...backButtonStyle,
              headerStyle: {
                backgroundColor: "#2cb833",
              },
            }}
          />
          <Stack.Screen
            name="Email"
            component={EmailForm}
            options={{
              headerTitle: () => <LogoTitle />,
              headerBackTitleVisible: false,
              ...backButtonStyle,
              headerStyle: {
                backgroundColor: "#2cb833",
              },
            }}
          />
          <Stack.Screen
            name="Post Item"
            component={PostItem}
            options={{
              headerTitle: () => <LogoTitle />,
              headerBackTitleVisible: false,
              ...backButtonStyle,
              headerStyle: {
                backgroundColor: "#2cb833",
              },
            }}
          />
          <Stack.Screen
            name="Choose Charity"
            component={ChooseCharity}
            options={{
              headerTitle: () => <LogoTitle />,
              headerBackTitleVisible: false,
              ...backButtonStyle,
              headerStyle: {
                backgroundColor: "#2cb833",
              },
            }}
          />
          <Stack.Screen
            name="Confirmation"
            component={PostConfirmation}
            options={{
              headerTitle: () => <LogoTitle />,
              headerBackTitleVisible: false,
              ...backButtonStyle,
              headerStyle: {
                backgroundColor: "#2cb833",
              },
            }}
          />
          <Stack.Screen
            name="Thank You"
            component={ThankYou}
            options={{
              headerTitle: () => <LogoTitle />,
              headerBackTitleVisible: false,
              headerLeft: null,
              headerStyle: {
                backgroundColor: "#2cb833",
              },
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerTitle: () => <LogoTitle />,
              headerBackTitleVisible: false,
              headerLeft: null,
              headerRight: () => <SignOut />,
              headerStyle: {
                backgroundColor: "#2cb833",
              },
            }}
          />
          <Stack.Screen
            name="Camera"
            options={{
              headerTitle: () => <LogoTitle />,
              headerBackTitleVisible: false,
              ...backButtonStyle,
              headerStyle: {
                backgroundColor: "#2cb833",
              },
            }}
          >
            {() => (
              <Camera
                cameraType="launchCameraAsync"
                user="seller"
                prompt="Press camera to take a photo of your item to donate!"
                title="Upload a Photo"
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}

const backButtonStyle = {
  headerBackImage: () => (
    <Image
      accessibilityRole="button"
      id="add"
      source={require("./assets/icons/back.png")}
      style={{ width: 30, height: 30, marginLeft: 10 }}
    />
  ),
};
