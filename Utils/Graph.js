// /utils/Graph.js
export class Graph {
  constructor(size) {
    this.size = size;
    this.adjacencyList = new Map();
    this.treasures = new Set();
    this.obstacles = new Set();
  }

  addNode(node) {
    this.adjacencyList.set(node, []);
  }

  addEdge(node1, node2) {
    if (!this.adjacencyList.has(node1)) {
      this.addNode(node1);
    }
    if (!this.adjacencyList.has(node2)) {
      this.addNode(node2);
    }
    this.adjacencyList.get(node1).push(node2);
    this.adjacencyList.get(node2).push(node1);
  }

  addTreasure(node) {
    this.treasures.add(node);
  }

  addObstacle(node) {
    this.obstacles.add(node);
  }

  getNeighbors(node) {
    return this.adjacencyList.get(node);
  }

  hasTreasure(node) {
    return this.treasures.has(node);
  }

  hasObstacle(node) {
    return this.obstacles.has(node);
  }
}
