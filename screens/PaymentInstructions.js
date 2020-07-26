import React, { useState, useEffect } from "react";
import { Text, StyleSheet, TextInput, Button, Image, View } from "react-native";
import {
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import * as MailComposer from "expo-mail-composer";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { SafeAreaView } from "react-native-safe-area-context";
import { cloudinaryPost } from "./apiCalls";
import { useStore } from "../store";
import * as Linking from "expo-linking";


const PaymentInstructions = () => {
  const [emailObject, updateEmailObject] = useState({});
  const [image, uploadImage] = useState(null);
  const [imageObj, setImageObj] = useState(null);
  const [receiptUrl, setReceiptUrl] = useState(null);
  const { state } = useStore()

  useEffect(() => {
    getPermissionAsync();
  });

  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Image,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      if (!result.cancelled) {
        await uploadImage(result.uri);
        await setImageObj(result);
      }
    } catch (E) {
      console.log(E);
    }
  };

  const submitHandler = async () => {
    await cloudinaryPost(imageObj, sendEmail)
   
    updateEmailObject({});
  };

  const sendEmail = (photoData) => {
    MailComposer.composeAsync({
      recipients: [
        // `${state.currentListing.donor_email}`,
        "allyjarjour@gmail.com",
      ],
      subject: "Time to ship your item from Auctionable Change",
      body: `Hello ${state.currentListing.donor}, 

      I just made my donation to ${state.currentListing.charity}. Excited to have made A.change with you. Find my info below for shipping.

    Thank you,
    ${emailObject.name}

    Email: ${emailObject.email}
    Address: ${emailObject.streetAddress}, ${emailObject.cityState}, ${emailObject.zipCode}
    Donation Receipt: ${photoData} 
      `
      ,
    });
  }

  const handleChange = (event, name) => {
    updateEmailObject({ ...emailObject, [name]: event.nativeEvent.text });
  };

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Thank you for your contribution!</Text>
        <Text style={styles.subheader}>Instructions to complete order:</Text>
        <View style={styles.stepOne}>
          <Text>1. Follow this </Text>
          <Text
            style={{fontWeight: "bold"}}
            onPress={() => Linking.openURL(state.currentListing.charity_url)}
          >
            link
          </Text>
          <Text> to donate at least ${state.currentListing.price}</Text>
        </View>
        <Text style={styles.listItem}>
          2. Screenshot your receipt to confirm with seller
        </Text>
        <Button
          title="Pick an image from camera roll"
          color="#2cb833"
          onPress={_pickImage}
        />
        {image ? (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        ) : (
          <TouchableWithoutFeedback onPress={_pickImage}>
            <Image
              source={require("../assets/icons/camera.png")}
              style={{ width: 150, height: 150 }}
            />
          </TouchableWithoutFeedback>
        )}
        <Text style={styles.listItem}>
          3. Please provide name and mailing address:
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Your Name"
          autoCapitalize="words"
          value={emailObject.name}
          onChange={(event) => handleChange(event, "name")}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Your Email"
          value={emailObject.email}
          onChange={(event) => handleChange(event, "email")}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Street Address"
          value={emailObject.streetAddress}
          onChange={(event) => handleChange(event, "streetAddress")}
        />
        <TextInput
          style={styles.textInput}
          placeholder="City, State"
          value={emailObject.cityState}
          onChange={(event) => handleChange(event, "cityState")}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Zipcode"
          value={emailObject.zipCode}
          onChange={(event) => handleChange(event, "zipCode")}
        />
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => submitHandler()}
          style={styles.button}
        >
          <Text>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  subheader: {
    fontSize: 15,
    marginBottom: 20,
  },
  scroll: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
  },
  listItem: {
    fontSize: 15,
    margin: 5,
  },
  textInput: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    padding: 5,
    width: 250,
  },
  button: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: 200,
    padding: 10,
    margin: 15,
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  stepOne: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
});

export default PaymentInstructions;
