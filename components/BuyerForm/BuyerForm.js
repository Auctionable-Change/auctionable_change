import React, { useState } from "react";
import {
  Button,
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Text,
} from "native-base";
import { useStore } from "../../store";
import { Alert } from "react-native";
import { submitPurchase } from "../../screens/apiCalls";

const BuyerForm = ({ navigation, sendEmail }) => {
  const { dispatch, state } = useStore();
  const [buyerObj, setBuyerObj] = useState({
    bidder_name: null,
    bidder_email: null,
    street_address: null,
    city: null,
    state: null,
    zip_code: null,
    amount: state.currentListing.price,
    item_id: state.currentListing.id,
    receipt: state.buyerDetails.receipt,
  });

  const handleChange = (event, name) => {
    setBuyerObj({ ...buyerObj, [name]: event.nativeEvent.text });
  };

  const validateForm = () => {
    let keys = Object.keys(buyerObj);
    let result = [];
    keys.forEach((key) => {
      if (buyerObj[key] === null || buyerObj[key] === "") {
        result.push(key);
      }
    });
    if (result.length === 0) {
      console.log('buyerObj', buyerObj);
      dispatch({ type: "ADD_BUYER_DETAILS", buyerDetails: buyerObj });
      // posting to BE
      // PUT request is not working for status but will update name
      sendEmail(buyerObj);
      submitPurchase(buyerObj);
    } else {
      Alert.alert("Missing Input", "Please fill out all fields to continue");
    }
  };

  return (
    <Container>
      <Header />
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Your Name</Label>
            <Input onChange={(event) => handleChange(event, "bidder_name")} />
          </Item>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input onChange={(event) => handleChange(event, "bidder_email")} />
          </Item>
          <Item floatingLabel>
            <Label>Street Address</Label>
            <Input
              onChange={(event) => handleChange(event, "street_address")}
            />
          </Item>
          <Item floatingLabel>
            <Label>City</Label>
            <Input onChange={(event) => handleChange(event, "city")} />
          </Item>
          <Item floatingLabel>
            <Label>State</Label>
            <Input onChange={(event) => handleChange(event, "state")} />
          </Item>
          <Item floatingLabel last>
            <Label>Zipcode</Label>
            <Input onChange={(event) => handleChange(event, "zip_code")} />
          </Item>
          <Button block success onPress={() => validateForm()}>
            <Text>Complete Purchase</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default BuyerForm;
