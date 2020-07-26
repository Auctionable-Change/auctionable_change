import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { cloudinaryPost } from "./apiCalls";
import { useStore } from "../store";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Image, View } from "react-native";
import { Button, Text } from "native-base";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const Camera = ({ cameraType, user, prompt, title }) => {
  const [image, uploadImage] = useState(null);
  const [imageObj, setImageObj] = useState(null);
  const { dispatch } = useStore();
  const navigation = useNavigation();

  useEffect(() => {
    getPermissionAsync();
  });

  const submitHandler = async () => {
    if (imageObj) {
      await cloudinaryPost(imageObj, updatePhotoInStore);
    }
  };

  const updatePhotoInStore = (photoData) => {
    if (user === "seller") {
      dispatch({
        type: "ADD_TO_LISTING",
        listingToPost: { image: photoData },
      });
      navigation.navigate("Choose Charity");
    }
    if (user === "buyer") {
      dispatch({
        type: "ADD_BUYER_DETAILS",
        buyerDetails: { receipt: photoData },
      });
      navigation.navigate("Email");
    }
  };

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const _pickImage = async () => {
    try {
      let result = await ImagePicker[cameraType]({
        mediaTypes: ImagePicker.MediaTypeOptions.Image,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      if (!result.cancelled) {
        uploadImage(result.uri);
        setImageObj(result);
      }
    } catch (E) {
      console.log(E);
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.container}>
        <Text accessibilityLabel={prompt} color="#2cb833" onPress={_pickImage}>
          {prompt}
        </Text>
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
        <Button block success onPress={() => submitHandler()}>
          <Text>Continue</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  container: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default Camera;
