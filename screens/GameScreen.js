import React, { useState, useRef, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  console.log(min, max);
  const rdNum = Math.floor(Math.random() * (max - min)) + min;
  if (rdNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rdNum;
  }
};

const GameScreen = props => {
  const [currrentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.useChoice)
  );
  const [rounds, setRounds] = useState(0);
  const { userChoice, onGameOver } = props;
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currrentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currrentGuess, userChoice, onGameOver]);

  const nextGuessHandles = direction => {
    console.log(props.userChoice);
    if (
      (direction === "lower" && currrentGuess < props.userChoice) ||
      (direction === "greater" && currrentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie! ", "You know tha this is wrong...", [
        { text: "Sorry", style: "cancel" }
      ]);
    }
    if (direction === "lower") {
      currentHigh.current = currrentGuess;
    } else {
      currentLow.current = currrentGuess;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currrentGuess
    );

    setCurrentGuess(nextNumber);
    setRounds(curRounds => curRounds + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Oppontens's Guest</Text>
      <NumberContainer>{currrentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={nextGuessHandles.bind(this, "lower")} />
        <Button
          title="GREATER"
          onPress={nextGuessHandles.bind(this, "greater")}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: "80%"
  }
});

export default GameScreen;
