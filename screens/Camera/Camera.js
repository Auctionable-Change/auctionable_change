import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { cloudinaryPost } from "../apiCalls";
import { useStore } from "../../store";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Alert, Image } from "react-native";
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
    } else {
      Alert.alert("Photo Required", "You must upload photo to continue");
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text
        accessibilityLabel={prompt}
        color="#2cb833"
        onPress={_pickImage}
        style={{
          fontFamily: "quicksand",
          fontSize: 15,
          margin: 10,
          textAlign: "center",
        }}
      >
        {prompt}
      </Text>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <TouchableWithoutFeedback onPress={_pickImage}>
          <Image
            source={require("../../assets/icons/ar-camera.png")}
            style={styles.camera}
          />
        </TouchableWithoutFeedback>
      )}
      <Button
        rounded
        success
        onPress={() => submitHandler()}
        style={styles.button}
      >
        <Text style={{ fontFamily: "quicksand-bold" }}>Continue</Text>
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "quicksand-bold",
  },
  image: { margin: 5, width: 300, height: 300 },
  camera: { width: 150, height: 150 },
  button: { alignSelf: "center", backgroundColor: "#2cb833", margin: 5 },
});

export default Camera;
