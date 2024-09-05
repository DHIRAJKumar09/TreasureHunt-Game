// /screens/GameScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { generateMap } from '../Utils/generateMap';

const GameScreen = ({ route, navigation }) => {
  const { difficulty } = route.params;
  const size = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 7 : 10;
  const graph = generateMap(size);

  const [playerPosition, setPlayerPosition] = useState([0, 0]);
  const [score, setScore] = useState(0);
  const [treasuresFound, setTreasuresFound] = useState(0);

  const movePlayer = (dx, dy) => {
    const [x, y] = playerPosition;
    const newX = x + dx;
    const newY = y + dy;

    const neighbors = graph.getNeighbors([x, y]) || [];

    if (neighbors.some((neighbor) => neighbor[0] === newX && neighbor[1] === newY)) {
      if (graph.hasObstacle([newX, newY])) {
        Alert.alert('Obstacle!', 'You hit an obstacle! -50 points');
        setScore(score - 50);
        return;
      }

      setPlayerPosition([newX, newY]);

      if (graph.hasTreasure([newX, newY])) {
        setScore(score + 100);
        setTreasuresFound(treasuresFound + 1);
        graph.treasures.delete([newX, newY]);

        if (treasuresFound + 1 === graph.treasures.size) {
          Alert.alert('You Win!', `Your final score is ${score + 100}`);
          navigation.navigate('GameOver', { score: score + 100 });
        }
      }
    }
  };

  const renderGrid = () => {
    const grid = [];
    for (let row = 0; row < size; row++) {
      const currentRow = [];
      for (let col = 0; col < size; col++) {
        const isPlayer = playerPosition[0] === row && playerPosition[1] === col;
        const hasTreasure = graph.hasTreasure([row, col]);
        const hasObstacle = graph.hasObstacle([row, col]);
  
        currentRow.push(
          <View
            key={`${row}-${col}`}
            style={[
              styles.cell,
              isPlayer && styles.player,
              hasTreasure && styles.treasure,
              hasObstacle && styles.obstacle,
            ]}
          />
        );
      }
      grid.push(
        <View key={row} style={styles.row}>
          {currentRow}
        </View>
      );
    }
    return grid;
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.difficultyText}>{difficulty.toUpperCase()} MODE</Text>
      <Text style={styles.statusText}>Score: {score}</Text>
      <Text style={styles.statusText}>Treasures Found: {treasuresFound}</Text>

      {/* Render the game grid */}
      <View style={styles.grid}>{renderGrid()}</View>

      {/* Movement Controls */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => movePlayer(-1, 0)} style={styles.button}>
          <Text>Up</Text>
        </TouchableOpacity>
        <View style={styles.rowControls}>
          <TouchableOpacity onPress={() => movePlayer(0, -1)} style={styles.button}>
            <Text>Left</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => movePlayer(0, 1)} style={styles.button}>
            <Text>Right</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => movePlayer(1, 0)} style={styles.button}>
          <Text>Down</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  difficultyText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  statusText: {
    fontSize: 18,
    marginVertical: 5,
  },
  grid: {
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 40,
    height: 40,
    margin: 2,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  player: {
    backgroundColor: '#007BFF',
  },
  treasure: {
    backgroundColor: '#FFD700',
  },
  obstacle: {
    backgroundColor: '#FF6347',
  },
  controls: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 15,
    backgroundColor: '#007BFF',
    margin: 5,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
  },
  rowControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GameScreen;
