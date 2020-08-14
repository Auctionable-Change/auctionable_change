import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet, Alert } from "react-native";
import { Label, Form, Item, Button, Text, Input } from 'native-base'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useStore } from "../../store";
import { logIn, register, fetchUserInfo } from "../apiCalls";

const Login = ({ navigation }) => {
  const { dispatch } = useStore()
  const [loginDetails, setLoginDetails] = useState({
    'email': '',
    'password': ''
  })

  const [registerDetails, setRegisterDetails] = useState({
    'email': '',
    'password': '',
    'confirmPassword': '',
    'first_name': '',
    'last_name': ''
  })

  const [logInScreen, setLogInScreen] = useState(true)

  const handleChangeLogin = (event, name) => {
    setLoginDetails({ ...loginDetails, [name]: event.nativeEvent.text });
  }

  const handleChange = (event, name) => {
    setRegisterDetails({ ...registerDetails, [name]: event.nativeEvent.text });
  }

  const login = async () => {
    let userData = await logIn(loginDetails)
    
    let completeUserData = await fetchUserInfo(userData.user_id)
   
    if (userData.message === "Successfully logged in.") {
        navigation.navigate("Home");
        dispatch({
          type: "SET_USER",
          loginDetails: userData,
          userInfo: completeUserData
        })
    } 
    else {
      Alert.alert(
        "Login Failed",
        "Please verify your email and password are correct"
      );
    }
  }

  const registration = async () => {
    const postRegistration = await register(registerDetails)
    if (postRegistration) {
      dispatch({
        type: "SET_USER",
        registrationDetails: registerDetails,
      });
      navigation.navigate("Home");
    } else {
      Alert.alert("Registration Failed", postRegistration.message)
    }
    
  }

  const validateRegistrationLogin = () => {
    let keys = Object.keys(loginDetails);
    let result = [];
    keys.forEach((key) => {
      if (loginDetails[key] === null || loginDetails[key] === "") {
        result.push(key);
      }
    });
    if (result.length === 0) {
      login()
      dispatch({
        type: "SET_USER",
        loginDetails: loginDetails,
      });
    } else {
      Alert.alert("Missing Input", "Please fill out all fields to continue");
    }
  };

  const validateRegistrationRegister = () => {
    let keys = Object.keys(registerDetails);
    let result = [];
    keys.forEach((key) => {
      if (registerDetails[key] === null || registerDetails[key] === "") {
        result.push(key);
      }
    });
    if (result.length === 0) {
      registration()
      dispatch({
        type: "SET_USER",
        registrationDetails: registerDetails,
      });
      
    } else {
      Alert.alert("Missing Input", "Please fill out all fields to continue");
    }
  };

  const logoutReset = () => {
    dispatch({
      type: "SET_USER",
      loginDetails: null,
      userInfo: null
    });
    setLoginDetails({
      password: null,
      email: null
    })
    setRegisterDetails({
    'email': '',
    'password': '',
    'confirmPassword': '',
    'first_name': '',
    'last_name': ''
    })
  }
  
  const switchScreen = () => {
    if(logInScreen) {
      setLogInScreen(false)
    } else {
      setLogInScreen(true)
    }
    logoutReset()
  }

  useEffect(() => {
    // logoutReset()
  },[])

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <KeyboardAwareScrollView style={{width: "100%"}}>
        <Image
          source={require("../../assets/stacked_logo.png")}
          style={styles.logo}
        />
        {logInScreen && (
          <Form style={{ width: "95%", alignSelf: "center" }}>
          <Item floatingLabel>
            <Label style={styles.text}>Email</Label>
            <Input
              accessibilityLabel="email"
              value={loginDetails.email}
              onChange={(event) => handleChangeLogin(event, "email")}
            />
          </Item>
          <Item floatingLabel>
            <Label style={styles.text}>Password</Label>
            <Input
              accessibilityLabel="password"
              value={loginDetails.password}
              onChange={(event) => handleChangeLogin(event, "password")}
            />
          </Item>
          <Text style={styles.forgotPasswordAlert}>
            Forget Password?
          </Text>
          <Button success block style={styles.button} onPress={() => validateRegistrationLogin('login')}>
            <Text style={{ fontFamily: "quicksand-bold", fontSize: 15 }}>
              Log In
            </Text>
          </Button>
          <View style={styles.registerAlert}>
            <Button transparent onPress={() => setLogInScreen(false)}>
              <Text style={{ fontFamily: "quicksand-bold", fontSize: 15, }}>Don't Have an Account? Sign up Here!</Text>
            </Button>
          </View>
        </Form>
        )}
        {!logInScreen && (
          <Form style={{ width: "95%", alignSelf: "center" }}>
            <Item floatingLabel>
              <Label style={styles.text}>First Name</Label>
              <Input
                accessibilityLabel="first Name"
                value={registerDetails.first_name}
                onChange={(event) => handleChange(event, "first_name")}
              />
            </Item>
            <Item floatingLabel>
              <Label style={styles.text}>Last Name</Label>
              <Input
                accessibilityLabel="password"
                value={registerDetails.last_name}
                onChange={(event) => handleChange(event, "last_name")}
              />
            </Item>
            <Item floatingLabel>
              <Label style={styles.text}>Email</Label>
              <Input
                accessibilityLabel="email"
                value={registerDetails.email}
                onChange={(event) => handleChange(event, "email")}
              />
            </Item>
            <Item floatingLabel>
              <Label style={styles.text}>Password</Label>
              <Input
                accessibilityLabel="password"
                value={registerDetails.password}
                onChange={(event) => handleChange(event, "password")}
              />
            </Item>
            <Item floatingLabel>
              <Label style={styles.text}>Confirm Password</Label>
              <Input
                accessibilityLabel="password"
                value={registerDetails.confirmPassword}
                onChange={(event) => handleChange(event, "confirmPassword")}
              />
            </Item>
            <Button success block style={styles.button} onPress={() => validateRegistrationRegister('register')}>
              <Text style={{ fontFamily: "quicksand-bold", fontSize: 15 }}>
                Register
              </Text>
            </Button>
              <View style={styles.registerAlert}>
                <Button transparent onPress={() => switchScreen()}>
                  <Text style={{ fontFamily: "quicksand-bold", fontSize: 15, }}>Already Have an Account? Log in Here</Text>
                </Button>
              </View>
          </Form>
        )}
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
    justifyContent: 'center',
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

