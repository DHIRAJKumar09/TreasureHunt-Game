import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';

const backgroundImage = { uri: 'https://img.freepik.com/free-vector/hand-drawn-flat-design-treasure-hunt_23-2149318677.jpg?w=740&t=st=1725592525~exp=1725593125~hmac=b7d59807c4ef034dd2fcd59bebc58e85e425458846422d915b7857ae1f6ebb37' };

const DifficultyScreen = ({ navigation }) => {
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Select Difficulty</Text>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Easy"
            onPress={() => navigation.navigate('Game', { gridSize: 4 })}
            color="#4CAF50" // Green for Easy
          />
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Medium"
            onPress={() => navigation.navigate('Game', { gridSize: 5 })}
            color="#FFEB3B" 
          />
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Hard"
            onPress={() => navigation.navigate('Game', { gridSize: 6 })}
            color="#F44336" 
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  buttonContainer: {
    marginVertical: 10, 
    width: 200, 
  },
});

export default DifficultyScreen;
