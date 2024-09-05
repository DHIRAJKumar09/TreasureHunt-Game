// screens/ClueScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const ClueScreen = ({ navigation }) => {
  const [answer, setAnswer] = useState('');
  const correctAnswer = 'treasure';

  const checkAnswer = () => {
    if (answer.toLowerCase() === correctAnswer) {
      navigation.navigate('Map');
    } else {
      alert('Wrong answer! Try again.');
    }
  };

  return (
    <View>
      <Text>Clue: What is the ultimate goal of this game?</Text>
      <TextInput value={answer} onChangeText={setAnswer} />
      <Button title="Submit" onPress={checkAnswer} />
    </View>
  );
};

export default ClueScreen;
