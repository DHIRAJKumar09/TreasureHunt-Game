// // /screens/HomeScreen.js
// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';

// const HomeScreen = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Treasure Hunt</Text>
//       <Button title="Start Game" onPress={() => navigation.navigate('Difficulty')} />
//       <Button title="Settings" onPress={() => alert('Settings')} />
//       <Button title="Load Game" onPress={() => alert('Load Game')} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
// });

// export default HomeScreen;


// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome to the Treasure Hunt Game!</Text>
      <Button title="Start Game" onPress={() => navigation.navigate('Clue')} />
    </View>
  );
};

export default HomeScreen;
