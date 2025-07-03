// src/App.tsx
import { useState, useCallback, useEffect, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  ReactFlowProvider,
} from 'reactflow';
import type {
  Connection,
  Edge,
  Node,
  NodeChange,
  EdgeChange,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { v4 as uuidv4 } from 'uuid';
import NodeModal from './components/NodeModal';
import ValidationStatus from './components/ValidationStatus';
import { isValidDAG } from './utils/graphValidation';
import { getAutoLayoutedElements } from './utils/graphLayout';

const App = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [dagStatus, setDagStatus] = useState<string>('Invalid: Not enough nodes');

  const nodeTypes = useMemo(() => ({}), []);
  const edgeTypes = useMemo(() => ({}), []);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback((connection: Connection) => {
    if (!connection.source || !connection.target) return;

    const newEdge: Edge = {
      ...connection,
      id: uuidv4(),
      type: 'default',
      source: connection.source,
      target: connection.target,
      sourceHandle: connection.sourceHandle ?? null,
      targetHandle: connection.targetHandle ?? null,
    };

    setEdges((eds) => [...eds, newEdge]);
  }, []);

  const handleAddNode = (label: string) => {
    const newNode: Node = {
      id: uuidv4(),
      data: { label },
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      type: 'default',
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const handleAutoLayout = () => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getAutoLayoutedElements(nodes, edges);
    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  };

  useEffect(() => {
    const result = isValidDAG(nodes, edges);
    setDagStatus(result);
  }, [nodes, edges]);

  const dagJSON = useMemo(() => JSON.stringify({ nodes, edges }, null, 2), [nodes, edges]);

  return (
    <ReactFlowProvider>
      <div className="w-screen h-screen flex">
        <div className="flex-1 relative">
          <div className="absolute z-10 top-4 left-4 flex gap-2">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setShowModal(true)}
            >
              ➕ Add Node
            </button>
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded"
              onClick={handleAutoLayout}
            >
              🧠 Auto Layout
            </button>
          </div>

          <ValidationStatus status={dagStatus} />

          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>

          <NodeModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onSubmit={handleAddNode}
          />
        </div>

        <div className="w-1/3 bg-gray-900 text-white p-4 overflow-auto text-sm border-l border-gray-700">
          <h2 className="font-bold mb-2 text-white">🔍 DAG Structure (JSON)</h2>
          <pre className="whitespace-pre-wrap break-words text-xs">
            {dagJSON}
          </pre>
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default App;