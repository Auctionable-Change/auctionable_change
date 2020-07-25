import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { cloudinaryPost } from "./apiCalls";
import { useStore } from "../store";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Image, View } from "react-native";
import { Button, Text } from "native-base";

// for buyer, arguments will be cameraType=launchImageLibraryAsync, user="buyer", 
// prompt = "Upload photo screen shot from camera roll"

const Camera = ({cameraType, user, prompt}) => {
  const [image, uploadImage] = useState(null);
  const [imageObj, setImageObj] = useState(null);
  const { state, dispatch } = useStore();

  useEffect(() => {
    getPermissionAsync();
    console.log(state.listingToPost);
  });

  const submitHandler = async () => {
    console.log("img", imageObj);
    if (imageObj) {
      await cloudinaryPost(imageObj, updatePhotoInStore)
    }
    console.log(state.listingToPost);
  };

  const updatePhotoInStore = (photoData) => {
    // for seller route
    if (user === "seller") {
      dispatch({
        type: "ADD_TO_LISTING",
        listingToPost: { "image": photoData }
      });
    }
    // for buyer route , add in dispatch 
  }

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
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text
        accessibilityLabel="Pick an image from camera roll"
        color="#2cb833"
        onPress={_pickImage}
      >
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
  );
}

export default Camera
