import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const BOMB_EMOJI = '💣';

const GameScreen = ({ route, navigation }) => {
  const { gridSize } = route.params; 
  const [grid, setGrid] = useState([]);
  const [revealedGrid, setRevealedGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

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

    const cell = grid[rowIndex][colIndex];
    const newRevealedGrid = [...revealedGrid];
    newRevealedGrid[rowIndex][colIndex] = true;
    setRevealedGrid(newRevealedGrid);

    if (cell === BOMB_EMOJI) {
      setGameOver(true);
      Alert.alert('Game Over!', `You hit a bomb! Your final score is ${score}`, [
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
          <TouchableOpacity
            key={`${rowIndex}-${colIndex}`}
            style={[
              styles.cell,
              revealedGrid[rowIndex][colIndex] ? styles.revealedCell : styles.hiddenCell,
            ]}
            onPress={() => handlePress(rowIndex, colIndex)}
          >
            {revealedGrid[rowIndex][colIndex] && (
              <Text style={styles.cellText}>
                {cell === BOMB_EMOJI ? BOMB_EMOJI : cell}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Score: {score}</Text>
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
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 60,
    height: 60,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  hiddenCell: {
    backgroundColor: '#ccc',
  },
  revealedCell: {
    backgroundColor: '#fff',
  },
  cellText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameScreen;
