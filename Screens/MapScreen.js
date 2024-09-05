// screens/MapScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const MapScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Map Screen: Here you can see your progress.</Text>
      <Button title="Find Treasure" onPress={() => navigation.navigate('Treasure')} />
    </View>
  );
};

export default MapScreen;
