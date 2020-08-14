import React, { useState } from "react";
import {
  Button,
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Picker,
  Icon,
  Text,
} from "native-base";
import { Alert } from "react-native";
import { useStore } from "../../store";
import { StyleSheet } from "react-native";

const SellerForm = ({ navigation }) => {
  const { dispatch } = useStore();
  const [listingObj, setListingObj] = useState({
    donor: null,
    donor_email: null,
    title: null,
    category: null,
    description: null,
    price: null,
  });

  const handleChange = (event, name) => {
    setListingObj({ ...listingObj, [name]: event.nativeEvent.text });
  };

  const validateForm = () => {
    let keys = Object.keys(listingObj);
    let result = [];
    keys.forEach((key) => {
      if (listingObj[key] === null || listingObj[key] === "") {
        result.push(key);
      }
    });
    if (result.length === 0) {
      setListingObj({...listingObj, 'price': Number(listingObj.price)})
      dispatch({
        type: "ADD_TO_LISTING",
        listingToPost: listingObj,
      });
      navigation.navigate("Camera");
    } else {
      Alert.alert("Missing Input", "Please fill out all fields to continue");
    }
  };

  const verifyPrice =  (event, name) => {
    let numberString = event.nativeEvent.text.replace(/[^\d.]/g, '')
    setListingObj({ ...listingObj, [name]: numberString });
  } 
  

  return (
    <Container>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label style={styles.label}>Your Name</Label>
            <Input accessibilityLabel={'name'} onChange={(event) => handleChange(event, "donor")} />
          </Item>
          <Item floatingLabel>
            <Label style={styles.label}>Email</Label>
            <Input accessibilityLabel={'email'} onChange={(event) => handleChange(event, "donor_email")} />
          </Item>
          <Item floatingLabel>
            <Label style={styles.label}>Item Name</Label>
            <Input accessibilityLabel={'item-name'} onChange={(event) => handleChange(event, "title")} />
          </Item>
          <Item floatingLabel>
            <Label style={styles.label}>Item Description</Label>
            <Input accessibilityLabel={'description'} onChange={(event) => handleChange(event, "description")} />
          </Item>
          <Item floatingLabel>
            <Label style={styles.label}>Minimum Bid</Label>
            <Input value={listingObj.price} accessibilityLabel={'bid'} onChange={(event) => verifyPrice(event, "price")} />  
          </Item>
          <Item picker last>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{
                width: 300,
                alignSelf: "center",
                margin: 10,
                width: 300,
              }}
              textStyle={{ fontFamily: "quicksand", fontSize: 15 }}
              placeholder="Select a Category"
              selectedValue={listingObj.category}
              accessibilityLabel={'category'}
              onValueChange={(event) =>
                setListingObj({
                  ...listingObj,
                  category: event,
                })
              }
            >
              <Picker.Item label="Apparel" value="apparel" />
              <Picker.Item label="Baby/Kids" value="baby" />
              <Picker.Item label="Electronics" value="electronics" />
              <Picker.Item label="Furniture" value="furniture" />
              <Picker.Item label="Home" value="home" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </Item>
          <Button
            rounded
            success
            style={{
              alignSelf: "center",
              backgroundColor: "#2cb833",
              margin: 10,
            }}
            onPress={() => validateForm()}
          >
            <Text style={{ fontFamily: "quicksand-bold", fontSize: 15 }}>
              Continue
            </Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: "quicksand",
    fontSize: 15,
  },
});

export default SellerForm;
