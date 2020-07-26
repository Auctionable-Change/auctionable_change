import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Linking, ActivityIndicator } from "react-native";
import {
  FlatList,
} from "react-native-gesture-handler";
import { useStore } from "../../store";
import { fetchCharities } from "../apiCalls";
import {
  Icon,
  CardItem,
  Card,
  CheckBox,
  Item,
  Input,
  Button,
  ListItem,
  Text
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
            placeholder="Search Charities"
            onChange={(event) => handleChange(event)}
          ></Input>
        </Item>
        <Button success onPress={() => returnCharities()}>
          <Text>Go!</Text>
        </Button>
      </View>
      {!charities && (
        <Card style={{ width: "90%", height: 150, marginTop: 50 }}>
          <Text style={{ alignSelf: "center", paddingTop: 30 }}>
            Search For Your Favorite Charity Above
          </Text>
          <Text style={{ alignSelf: "center", margin: 5, fontStyle: "italic" }}>
            - or -
          </Text>
          <Button
            bordered success
            style={{ alignSelf: "center" }}
            onPress={() => returnCharities()}
          >
            <Text>
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
            <CardItem
              header
              bordered
              style={{ alignSelf: "center", flexDirection: "row" }}
            >
              <Button
                small
                transparent
                onPress={() => Linking.openURL(item.url)}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#065EFE",
                  color: "#065EFE",
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    flexDirection: "row",
                    color: "#065EFE",
                  }}
                  numberOfLines={2}
                >
                  {item.name}
                </Text>
              </Button>
            </CardItem>
            <Card bordered style={{ backgroundColor: "#f8f8ff" }}>
              <ListItem
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text>Select Charity</Text>
                </View>
                <CheckBox
                  color="#2CB833"
                  onPress={() => charitySelect(item.name)}
                  checked={item.name == charitySelected.name ? true : false}
                />
              </ListItem>
            </Card>
          </Card>
        )}
      />

      {charitySelected && (
        <Button block onPress={() => confirmCharity()}>
          <Text style={{ color: "white" }}>Confirm Charity & Continue</Text>
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
    flex: 1,
    backgroundColor: "#FFF",
    padding: 15,
    width: "98%",
    marginTop: 15,
  },
  charityActive: {
    flex: 1,
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "black",
    padding: 15,
    width: "98%",
    marginTop: 15,
  },
});

export default ChooseCharity;
