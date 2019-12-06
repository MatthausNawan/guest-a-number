import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Card = props => {
  return (
    <View style={{ ...style.card, ...props.style }}>{props.children}</View>
  );
};

const style = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: "white",
    elevation: 5,
    padding: 20,
    borderRadius: 6
  }
});

export default Card;
