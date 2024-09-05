// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../TreasureHuntGame/Screens/HomeScreen';
import ClueScreen from '../TreasureHuntGame/Screens/ClueScreen';
import MapScreen from '../TreasureHuntGame/Screens/MapScreen';
import TreasureScreen from '../TreasureHuntGame/Screens/TreasureScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Clue" component={ClueScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Treasure" component={TreasureScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default App;
