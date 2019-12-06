import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = props => {
  return <TextInput {...props} style={{ ...style.input, ...props.style }} />;
};

const style = StyleSheet.create({
  input: {
    height: 35,
    borderBottomColor: "grey",
    borderBottomWidth: 2,
    marginVertical: 15
  }
});

export default Input;
