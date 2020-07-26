import React from "react";
import { Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as MailComposer from "expo-mail-composer";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStore } from "../../store";
import BuyerForm from "../../components/BuyerForm/BuyerForm";

const EmailForm = ({ navigation }) => {
  const { state } = useStore();

  const sendEmail = (photoData) => {
    MailComposer.composeAsync({
      recipients: [
        // `${state.currentListing.donor_email}`,
        "foxymeatball@aol.com",
      ],
      subject: "Time to ship your item from Auctionable Change",
      body: `Hello ${state.currentListing.donor}, 

      I just made my donation to ${state.currentListing.charity}. Excited to have made A.change with you. Find my info below for shipping.

    Thank you,
    ${state.buyerDetails.bidder_name}

    Email: ${state.buyerDetails.bidder_email}
    Address: ${state.buyerDetails.street_address}, ${state.buyerDetails.city}, ${state.buyerDetails.state} ${state.buyerDetails.zip_code}
    Donation Receipt: ${photoData} 
      `,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Text>
          Please enter your contact and shipping information to send an email to
          the seller.
        </Text>
        <BuyerForm navigation={navigation} sendEmail={sendEmail} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmailForm;
