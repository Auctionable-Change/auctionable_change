import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, Linking, ActivityIndicator } from "react-native";
import { TouchableOpacity, ScrollView, FlatList} from "react-native-gesture-handler";
import { useStore } from "../store";
import { fetchCharities } from "./apiCalls"
import { Icon, CardItem, Card, Body, CheckBox, Item, Input, Label, Button, ListItem } from 'native-base';

const ChooseCharity = ({ navigation }) => {
  const { dispatch } = useStore();
  const [search, setSearch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [charitySelected, setCharitySelected] = useState(false)
  const [charities, setCharities] = useState([])
  

  const handleChange = (event) => {
    setSearch(event.nativeEvent.text)
  }

  const returnCharities = async () => {
    setCharities([])
    setIsLoading(true)
    const data = await fetchCharities(search)
    setIsLoading(false)
    setCharities(data.charities)
  }

  const charitySelect = (name) => {
    let charity = charities.find(charity => charity.name === name)
    setCharitySelected(charity)
  }

  const confirmCharity = () => {
    navigation.navigate("Confirmation")
    dispatch({ type: "ADD_SELECTED_CHARITY", selectedCharity: charitySelected })
  }

  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center' }}>
      <Item>
        <Input placeholder="Search Charities" onChange={(event) => handleChange(event)}></Input>
        </Item>
      <Button block onPress={() => returnCharities()}>
        <Text style={{color: 'white'}}>Search</Text>
      </Button>
          {isLoading && (
            <View style={{flex: 1, justifyContent: 'center'}}>
              <ActivityIndicator size="large" color="#00ff00"/>
            </View>
          )}
        <FlatList
          data={charities}
          style={styles.scrollView}
          keyExtractor={item => item.name}
          renderItem={( {item} ) => (
            <Card style={(item.name == charitySelected.name) ? styles.charityActive : styles.charityDefault}>
              <CardItem header bordered style={{alignSelf: 'center', flexDirection: 'row'}}>
                <Button small transparent onPress={() => Linking.openURL(item.url)} style={{borderBottomWidth: 1, borderBottomColor: '#065EFE', color: '#065EFE'}}>
                  <Text style={{alignSelf: 'center', flexDirection: 'row', color: '#065EFE'}} numberOfLines={2}>{item.name}</Text>
                </Button>
              </CardItem>
              <Card bordered >
                <ListItem style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <View>
                    <Text>Select Charity</Text>
                  </View>
                  <CheckBox onPress={() => charitySelect(item.name)} checked={(item.name == charitySelected.name) ? true : false} />
                </ListItem>
              </Card> 
            </Card>
          )}
        />
      
        {charitySelected && (
          <Button block onPress={() => confirmCharity()}>
            <Text style={{color: 'white'}}>Comfirm Charity</Text>
          </Button>
        )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    alignItems: "center",
    justifyContent: "center",
  },
  search: {
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginTop: 10,
    borderRadius: 10
  },
  button: {
    backgroundColor: "lightgrey",
    borderRadius: 10,
    height: 40, 
    width: 150,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    alignSelf: 'center'
  },
  confirmButton: {
    backgroundColor: "purple",
    borderRadius: 10,
    height: 40, 
    width: 150,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    alignSelf: 'center'
  },
  textInput: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    padding: 5,
    width: '90%',
    fontSize: 30
  },
  charityButton: {
    backgroundColor: "lightgrey",
    borderRadius: 10,
    height: 40, 
    width: 125,
    padding: 10,
    margin: 5,
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  scrollView: {
    flex: 1,
    width: '90%', 
  },
  itemContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginTop: 10,
    borderRadius: 10
  },
  charityDefault: { 
    flex: 1, 
    backgroundColor: '#FFF', 
    padding: 15, 
    width: '98%', 
    marginTop: 15 
  },
  charityActive: { 
    flex: 1, 
    backgroundColor: '#FFF', 
    borderWidth: 2,
    borderColor: 'black',
    padding: 15, 
    width: '98%', 
    marginTop: 15 
  }

});

export default ChooseCharity;
