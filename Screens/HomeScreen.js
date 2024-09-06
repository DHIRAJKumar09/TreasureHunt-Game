import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';


const backgroundImage = { uri: 'https://i.pinimg.com/1200x/8f/15/c4/8f15c44604dbbca20b425b8d5dedf150.jpg' }; // You can replace this with a local image or online image URL

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Treasure Hunt</Text>
        <Text style={styles.subtitle}>Find the treasure, avoid the bombs!</Text>
        <Button
          title="Start Game"
          onPress={() => navigation.navigate('Difficulty')}
          color="#f4511e"
        />
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
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    borderRadius: 10,
  },
  title: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
  },
});

export default HomeScreen;
