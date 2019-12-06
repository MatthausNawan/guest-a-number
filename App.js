import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const LoadFonts = () => {
  return Font.loadAsync({
    almelo: require("./assets/fonts/fv_almelo.ttf")
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [GuestRounds, setGuestRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => setDataLoaded(true)}
        onError={err => console.log(err)}
      />
    );
  }
  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
  };

  const onConfigureNewGameHandles = () => {
    setGuestRounds(0);
    setUserNumber(null);
  };
  const gameOverHandler = numbOfRounds => {
    setGuestRounds(numbOfRounds);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && GuestRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (GuestRounds > 0) {
    content = (
      <GameOverScreen
        roundsNumber={GuestRounds}
        userNumber={userNumber}
        onRestart={onConfigureNewGameHandles}
      />
    );
  }
  return (
    <View style={styles.screen}>
      <Header title={"Guest a Number"} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
