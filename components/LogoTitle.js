import React from 'react'
import { Image } from 'react-native'

 const LogoTitle = () => {
  return (
    <Image
      style={{ width: 250, resizeMode: "contain" }}
      source={require("../assets/a_change.png")}
    />
  );
 }

export default LogoTitle;
