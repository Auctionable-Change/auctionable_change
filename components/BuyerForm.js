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

const BuyerForm = ({ navigation }) => {
  const [buyerObj, setBuyerObj] = useState({
    bidder_name: null,
    bidder_email: null,
    street_address: null,
    city: null,
    state: null,
    zip_code: null,
    receipt: null,
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
      console.log("navigate");
    } else {
      console.log("denied");
    }
  };

  return (
    <Container>
      <Header />
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Your Name</Label>
            <Input onChange={(event) => handleChange(event, "bidder")} />
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
          <Button block onPress={() => validateForm()}>
            <Text>Confirm Purchase</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default BuyerForm;
