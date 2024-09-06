import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const GameOverScreen = ({ route, navigation }) => {
  const { score } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.gameOverText}>Game Over!</Text>
      <Text style={styles.scoreText}>Your Final Score: {score}</Text>
      
      <Button 
        title="Play Again"
        onPress={() => navigation.navigate('Difficulty')} 
      />
      <Button 
        title="Go to Home"
        onPress={() => navigation.navigate('Home')} 
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 24,
    marginBottom: 40,
  },
  button: {
    marginTop: 10,
  },
});

export default GameOverScreen;
