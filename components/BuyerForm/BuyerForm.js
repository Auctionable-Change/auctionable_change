import React, { useState } from "react";
import {
  Button,
  Container,
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
import { StyleSheet } from "react-native";

const BuyerForm = ({ sendEmail }) => {
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
      dispatch({ type: "ADD_BUYER_DETAILS", buyerDetails: buyerObj });
      sendEmail(buyerObj);
      submitPurchase(buyerObj);
    } else {
      Alert.alert("Missing Input", "Please fill out all fields to continue");
    }
  };

  return (
    <Container>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label style={styles.label}>Your Name</Label>
            <Input
              accessibilityLabel={"name"}
              onChange={(event) => handleChange(event, "bidder_name")}
            />
          </Item>
          <Item floatingLabel>
            <Label style={styles.label}>Your Email</Label>
            <Input
              accessibilityLabel={"email"}
              onChange={(event) => handleChange(event, "bidder_email")}
            />
          </Item>
          <Item floatingLabel>
            <Label style={styles.label}>Street Address</Label>
            <Input
              onChange={(event) => handleChange(event, "street_address")}
              accessibilityLabel={"address"}
            />
          </Item>
          <Item floatingLabel>
            <Label style={styles.label}>City</Label>
            <Input
              accessibilityLabel={"city"}
              onChange={(event) => handleChange(event, "city")}
            />
          </Item>
          <Item floatingLabel>
            <Label style={styles.label}>State</Label>
            <Input
              accessibilityLabel={"state"}
              onChange={(event) => handleChange(event, "state")}
            />
          </Item>
          <Item floatingLabel last>
            <Label style={styles.label}>Zipcode</Label>
            <Input
              accessibilityLabel={"zip"}
              onChange={(event) => handleChange(event, "zip_code")}
            />
          </Item>
          <Button
            rounded
            success
            onPress={() => validateForm()}
            style={{
              alignSelf: "center",
              backgroundColor: "#2cb833",
              margin: 10,
            }}
          >
            <Text style={{ fontFamily: "quicksand-bold", fontSize: 15 }}>
              Complete Purchase
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

export default BuyerForm;
