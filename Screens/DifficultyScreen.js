// /screens/DifficultyScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DifficultyScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Difficulty</Text>
      <Button title="Easy" onPress={() => navigation.navigate('Game', { difficulty: 'easy' })} />
      <Button title="Medium" onPress={() => navigation.navigate('Game', { difficulty: 'medium' })} />
      <Button title="Hard" onPress={() => navigation.navigate('Game', { difficulty: 'hard' })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default DifficultyScreen;
