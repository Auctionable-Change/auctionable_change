import React, { useState } from "react";
import { View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Linking, ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useStore } from "../../store";
import { fetchCharities } from "../apiCalls";
import {
  Icon,
  Card,
  CheckBox,
  Item,
  Input,
  Button,
  Text,
  Right,
} from "native-base";

const ChooseCharity = ({ navigation }) => {
  const { dispatch } = useStore();
  const [search, setSearch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [charitySelected, setCharitySelected] = useState(false);
  const [charities, setCharities] = useState(null);

  const handleChange = (event) => {
    setSearch(event.nativeEvent.text);
  };

  const returnCharities = async () => {
    setCharities([]);
    setIsLoading(true);
    const data = await fetchCharities(search);
    setIsLoading(false);
    setCharities(data.charities);
  };

  const charitySelect = (name) => {
    let charity = charities.find((charity) => charity.name === name);
    setCharitySelected(charity);
  };

  const confirmCharity = () => {
    navigation.navigate("Confirmation");
    dispatch({
      type: "ADD_SELECTED_CHARITY",
      selectedCharity: charitySelected,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <View style={{ flexDirection: "row" }}>
        <Item style={{ width: "75%" }}>
          <Icon name="ios-search" />
          <Input
            style={{ fontFamily: "quicksand", fontSize: 15 }}
            placeholder="Search Charities"
            onChange={(event) => handleChange(event)}
          ></Input>
        </Item>
        <Button success onPress={() => returnCharities()}>
          <Text style={{ fontFamily: "quicksand-bold", fontSize: 15 }}>
            Go!
          </Text>
        </Button>
      </View>
      {!charities && (
        <Card style={{ width: "90%", height: 150, marginTop: 50 }}>
          <Text
            style={{
              alignSelf: "center",
              paddingTop: 30,
              fontFamily: "quicksand",
              fontSize: 15,
            }}
          >
            Search For Your Favorite Charity Above
          </Text>
          <Text
            style={{
              alignSelf: "center",
              margin: 5,
              fontFamily: "quicksand",
              fontSize: 15,
            }}
          >
            - or -
          </Text>
          <Button
            bordered
            success
            style={{ alignSelf: "center" }}
            onPress={() => returnCharities()}
          >
            <Text style={{ fontFamily: "quicksand", fontSize: 15 }}>
              Browse Our Featured Charities
            </Text>
          </Button>
        </Card>
      )}
      {isLoading && (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#2CB833" />
        </View>
      )}

      <FlatList
        data={charities}
        style={styles.scrollView}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Card
            style={
              item.name == charitySelected.name
                ? styles.charityActive
                : styles.charityDefault
            }
          >
            <View>
              <Button
                transparent
                onPress={() => Linking.openURL(item.url)}
                style={{
                  height: "100%",
                  alignSelf: "center",
                  flex: 5,
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: 18,
                    color: "#439fd9",
                    fontFamily: "quicksand",
                  }}
                  numberOfLines={2}
                >
                  {item.name}
                </Text>
              </Button>
              <Image
                source={{ uri: item.rating_image }}
                style={{
                  width: 80,
                  height: 40,
                  resizeMode: "contain",
                  marginLeft: 15,
                }}
              />
            </View>
            <Right>
              <CheckBox
                color="#2CB833"
                onPress={() => charitySelect(item.name)}
                checked={item.name == charitySelected.name ? true : false}
                style={{ margin: 15 }}
              />
            </Right>
          </Card>
        )}
      />

      {charitySelected && (
        <Button block success onPress={() => confirmCharity()}>
          <Text
            style={{
              color: "white",
              fontFamily: "quicksand-bold",
              fontSize: 15,
            }}
          >
            Confirm Charity & Continue
          </Text>
        </Button>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  search: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  scrollView: {
    flex: 1,
    width: "90%",
  },
  charityDefault: {
    backgroundColor: "#FFF",
    padding: 15,
    width: "98%",
    marginTop: 15,
    height: 130,
    flexDirection: "row",
  },
  charityActive: {
    backgroundColor: "#FFF",
    borderWidth: 5,
    height: 130,
    borderColor: "blue",
    padding: 15,
    width: "98%",
    marginTop: 15,
    flexDirection: "row",
  },
});

export default ChooseCharity;
