// src/utils/graphValidation.ts
import type { Node, Edge } from 'reactflow';


export function isValidDAG(nodes: Node[], edges: Edge[]): string {
  if (nodes.length < 2) return 'Invalid: Not enough nodes';

  const adjList: { [key: string]: string[] } = {};
  const inDegree: { [key: string]: number } = {};

  // Init adjacency list
  nodes.forEach((node) => {
    adjList[node.id] = [];
    inDegree[node.id] = 0;
  });

  for (const edge of edges) {
    if (edge.source === edge.target) {
      return 'Invalid: Self-loop detected';
    }

    if (!adjList[edge.source]) adjList[edge.source] = [];

    adjList[edge.source].push(edge.target);
    inDegree[edge.target] += 1;
  }

  // Check for connectivity: All nodes must be part of at least one edge
  const nodeInEdges = new Set(edges.map(e => e.source).concat(edges.map(e => e.target)));
  if (nodes.some(node => !nodeInEdges.has(node.id))) {
    return 'Invalid: Some nodes are not connected';
  }

  // Cycle Detection (Kahn’s Algorithm)
  const queue = Object.keys(inDegree).filter(id => inDegree[id] === 0);
  let visitedCount = 0;

  while (queue.length > 0) {
    const current = queue.shift()!;
    visitedCount++;

    for (const neighbor of adjList[current]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  if (visitedCount !== nodes.length) {
    return 'Invalid: Cycle detected';
  }

  return 'Valid DAG';
}
