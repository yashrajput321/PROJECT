// src/types/graph.ts

export interface CustomNodeData {
  label: string;
}

export interface DAGNode {
  id: string;
  data: CustomNodeData;
}

export interface DAGEdge {
  id: string;
  source: string;
  target: string;
}
