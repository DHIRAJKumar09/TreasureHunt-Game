import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Animated } from 'react-native';

const BOMB_EMOJI = '💣';

const GameScreen = ({ route, navigation }) => {
  const { gridSize } = route.params;
  const [grid, setGrid] = useState([]);
  const [revealedGrid, setRevealedGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [pressedAnimation] = useState(new Animated.Value(1));

  useEffect(() => {
    initializeGrid();
  }, []);

  const initializeGrid = () => {
    const newGrid = [];
    const revealed = [];
    for (let i = 0; i < gridSize; i++) {
      const row = [];
      const revealedRow = [];
      for (let j = 0; j < gridSize; j++) {
        const isBomb = Math.random() < 0.2;
        row.push(isBomb ? BOMB_EMOJI : Math.floor(Math.random() * 100) + 1);
        revealedRow.push(false);
      }
      newGrid.push(row);
      revealed.push(revealedRow);
    }
    setGrid(newGrid);
    setRevealedGrid(revealed);
  };

  const handlePress = (rowIndex, colIndex) => {
    if (gameOver || revealedGrid[rowIndex][colIndex]) return;

    Animated.sequence([
      Animated.timing(pressedAnimation, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(pressedAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    const cell = grid[rowIndex][colIndex];
    const newRevealedGrid = [...revealedGrid];
    newRevealedGrid[rowIndex][colIndex] = true;
    setRevealedGrid(newRevealedGrid);

    if (cell === BOMB_EMOJI) {
      setGameOver(true);
      Alert.alert('💥 Game Over!', `You hit a bomb! Your final score is ${score}`, [
        { text: 'Play Again', onPress: () => navigation.navigate('Difficulty') },
      ]);
    } else {
      setScore(score + cell);
    }
  };

  const renderGrid = () => {
    return grid.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((cell, colIndex) => (
          <Animated.View
            key={`${rowIndex}-${colIndex}`}
            style={[
              styles.cell,
              revealedGrid[rowIndex][colIndex] ? styles.revealedCell : styles.hiddenCell,
              { transform: [{ scale: pressedAnimation }] },
            ]}
          >
            <TouchableOpacity onPress={() => handlePress(rowIndex, colIndex)}>
              {revealedGrid[rowIndex][colIndex] && (
                <Text style={styles.cellText}>
                  {cell === BOMB_EMOJI ? BOMB_EMOJI : cell}
                </Text>
              )}
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>💰 Score: {score}</Text>
      <View style={styles.gridContainer}>{renderGrid()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
  },
  scoreText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFA500',
    textShadowColor: '#FF4500',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
    fontFamily: 'Avenir',
  },
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 70,
    height: 70,
    margin: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 35, // circular cells
    borderColor: '#32CD32',
    elevation: 5,
    shadowColor: '#333',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  hiddenCell: {
    backgroundColor: '#FFD700', // vibrant yellow
  },
  revealedCell: {
    backgroundColor: '#FF6347', // soft red
  },
  cellText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    fontFamily: 'Avenir',
  },
});

export default GameScreen;
