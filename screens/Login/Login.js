import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet, Alert } from "react-native";
import { Label, Form, Item, Button, Text, Input } from 'native-base'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { dispatch } from "../../store";

const Login = ({ navigation }) => {
  const [loginDetails, setLoginDetails] = useState({
    email: 'testemailtwo@example.com',
    password: 'password'
  })

  const handleChange = (event, name) => {
    setLoginDetails({ ...loginDetails, [name]: event.nativeEvent.text });
  }

  const login = () => {
    if (loginDetails.email && loginDetails.password) {
      navigation.navigate("Home");
      // dispatch({
      //   type: SET_USER,
      //   userInfo: loginDetails
      // })
    } else {
      Alert.alert(
        "Missing Input",
        "Please fill out your email and password"
      );
    }
  }

  const logoutReset = () => {
    setLoginDetails({
      password: 'password',
      email: 'testemailtwo@example.com'
    })
  }

  useEffect(() => {
    logoutReset()
  },[])

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <KeyboardAwareScrollView style={{width: "100%"}}>
        <Image
          source={require("../../assets/stacked_logo.png")}
          style={styles.logo}
        />
        <Form style={{ width: "95%", alignSelf: "center" }}>
          <Item floatingLabel>
            <Label style={styles.text}>Email</Label>
            <Input
              accessibilityLabel="email"
              value={loginDetails.email}
              onChange={(event) => handleChange(event, "email")}
            />
          </Item>
          <Item floatingLabel>
            <Label style={styles.text}>Password</Label>
            <Input
              accessibilityLabel="password"
              value={loginDetails.password}
              onChange={(event) => handleChange(event, "password")}
            />
          </Item>
          <Text style={styles.forgotPasswordAlert}>
            Forget Password?
          </Text>
          <Button success block style={styles.button} onPress={login}>
            <Text style={{ fontFamily: "quicksand-bold", fontSize: 15 }}>
              Log In
            </Text>
          </Button>
        </Form>
        <View style={styles.registerAlert}>
          <Text style={styles.text}>Don't have an account? Sign Up.</Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: "quicksand",
    color: "#4a4a4a",
  },
  registerAlert: {
    marginTop: 30,
    borderTopWidth: 1,
    width: "90%",
    paddingTop: 15,
    alignItems: "center",
    borderTopColor: "#cfcfcf",
  },
  button: {
    backgroundColor: "#2cb833",
    width: "90%",
    alignSelf: "center",
  },
  logo: {
    width: 400,
    height: 140,
    resizeMode: "contain",
  },
  forgotPasswordAlert: {
    margin: 20,
    alignSelf: "flex-end",
    fontFamily: "quicksand",
    color: "#4a4a4a",
  },
});

export default Login

