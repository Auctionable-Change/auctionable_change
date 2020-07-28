import React from "react";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as MailComposer from "expo-mail-composer";
import { useStore } from "../../store";
import BuyerForm from "../../components/BuyerForm/BuyerForm";

const EmailForm = ({ navigation }) => {
  const { state } = useStore();

  const sendEmail = (buyerObj) => {
    MailComposer.composeAsync({
      recipients: [`${state.currentListing.donor_email}`],
      subject: "Time to ship your item from Auctionable Change",
      body: `Hello ${state.currentListing.donor}, 

      I just made my donation to ${state.currentListing.charity}. Excited to have made A.change with you. Find my info below for shipping.

    Thank you,
    ${buyerObj.bidder_name}

    Email: ${buyerObj.bidder_email}
    Address: ${buyerObj.street_address}, ${buyerObj.city}, ${buyerObj.state} ${buyerObj.zip_code}
    Donation Receipt URL: ${state.buyerDetails.receipt} 
      `,
    });
    navigation.navigate("Thank You");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <KeyboardAwareScrollView>
        <Text style={{ fontFamily: "quicksand", fontSize: 20, margin: 5 }}>
          Please enter your contact and shipping information to email the
          seller.
        </Text>
        <BuyerForm navigation={navigation} sendEmail={sendEmail} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default EmailForm;
