import {Graph} from './Graph'
// /utils/generateMap.js
export const generateMap = (size) => {
  const graph = new Graph(size);

  // Add nodes (cells) to the graph
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      graph.addNode([i, j]);
    }
  }

  // Add edges (paths) between nodes
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (i > 0) graph.addEdge([i, j], [i - 1, j]); // Up
      if (i < size - 1) graph.addEdge([i, j], [i + 1, j]); // Down
      if (j > 0) graph.addEdge([i, j], [i, j - 1]); // Left
      if (j < size - 1) graph.addEdge([i, j], [i, j + 1]); // Right
    }
  }

  // Randomly place treasures and obstacles
  const totalCells = size * size;
  const numberOfTreasures = Math.floor(totalCells / 10); // 10% of the map cells
  const numberOfObstacles = Math.floor(totalCells / 5); // 20% of the map cells

  const getRandomNode = () => [Math.floor(Math.random() * size), Math.floor(Math.random() * size)];

  for (let i = 0; i < numberOfTreasures; i++) {
    let node;
    do {
      node = getRandomNode();
    } while (graph.hasTreasure(node) || graph.hasObstacle(node));
    graph.addTreasure(node);
  }

  for (let i = 0; i < numberOfObstacles; i++) {
    let node;
    do {
      node = getRandomNode();
    } while (graph.hasTreasure(node) || graph.hasObstacle(node));
    graph.addObstacle(node);
  }

  return graph;
};
