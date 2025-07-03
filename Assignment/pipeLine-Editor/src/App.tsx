// src/App.tsx
import { useState, useCallback, useEffect, useMemo } from 'react';
import CustomEdge from './components/CustomEdge';
import { MarkerType } from 'reactflow';
import RenameModal from './components/RenameModal';
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
  OnSelectionChangeParams,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { v4 as uuidv4 } from 'uuid';
import NodeModal from './components/NodeModal';
import ValidationStatus from './components/ValidationStatus';
import ContextMenu from './components/ContextMenu';
import ColoredNode from './components/ColoredNode';
import { isValidDAG } from './utils/graphValidation';
import { getAutoLayoutedElements } from './utils/graphLayout';

const App = () => {
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameTargetId, setRenameTargetId] = useState<string | null>(null);
  const [renameTargetLabel, setRenameTargetLabel] = useState<string>('');
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [dagStatus, setDagStatus] = useState<string>('Invalid: Not enough nodes');
  const [selectedElements, setSelectedElements] = useState<{ nodeIds: string[]; edgeIds: string[] }>({ nodeIds: [], edgeIds: [] });
  const [contextMenu, setContextMenu] = useState<{ visible: boolean; x: number; y: number; nodeId: string | null }>({ visible: false, x: 0, y: 0, nodeId: null });

  const nodeTypes = useMemo(() => ({ colored: ColoredNode }), []);
  const edgeTypes = useMemo(() => ({ custom: CustomEdge }), []);

  const handleRename = (newLabel: string) => {
  if (!renameTargetId) return;
  setNodes((nds) =>
    nds.map((node) =>
      node.id === renameTargetId
        ? { ...node, data: { ...node.data, label: newLabel } }
        : node
    )
  );
  setShowRenameModal(false);
};


  const handleRenameNodeFromContext = () => {
    const node = nodes.find((n) => n.id === contextMenu.nodeId);
    if (node) {
      setRenameTargetId(node.id);
      setRenameTargetLabel(node.data.label || '');
      setShowRenameModal(true);
    }
    setContextMenu({ visible: false, x: 0, y: 0, nodeId: null });
  };



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
    type: 'custom', // use our custom edge
    source: connection.source,
    target: connection.target,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: '#38bdf8',
    },
    style: {
      stroke: '#38bdf8', // optional: edge color
    },
  };

  setEdges((eds) => [...eds, newEdge]);
}, []);


  const getRandomType = () => ['A', 'B', 'C'][Math.floor(Math.random() * 3)];

  const handleAddNode = (label: string) => {
    const newNode: Node = {
      id: uuidv4(),
      data: { label, nodeType: getRandomType() },
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      type: 'colored',
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const handleAutoLayout = () => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getAutoLayoutedElements(nodes, edges);
    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  };

  const handleSelectionChange = useCallback((params: OnSelectionChangeParams) => {
    const nodeIds = params.nodes.map((n) => n.id);
    const edgeIds = params.edges.map((e) => e.id);
    setSelectedElements({ nodeIds, edgeIds });
  }, []);

  const handleNodeContextMenu = useCallback((event: React.MouseEvent, node: Node) => {
    event.preventDefault();
    setContextMenu({ visible: true, x: event.clientX, y: event.clientY, nodeId: node.id });
  }, []);

  const handleDeleteNodeFromContext = () => {
    if (!contextMenu.nodeId) return;
    setNodes((nds) => nds.filter((n) => n.id !== contextMenu.nodeId));
    setEdges((eds) => eds.filter((e) => e.source !== contextMenu.nodeId && e.target !== contextMenu.nodeId));
    setContextMenu({ visible: false, x: 0, y: 0, nodeId: null });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete') {
        setNodes((nds) => nds.filter((n) => !selectedElements.nodeIds.includes(n.id)));
        setEdges((eds) => eds.filter((e) => !selectedElements.edgeIds.includes(e.id)));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElements]);

  useEffect(() => {
    const result = isValidDAG(nodes, edges);
    setDagStatus(result);
  }, [nodes, edges]);

  const dagJSON = useMemo(() => JSON.stringify({ nodes, edges }, null, 2), [nodes, edges]);

  return (
    <ReactFlowProvider>
      <div className="w-screen h-screen flex">
        <div className="flex-1 relative bg-[#0f172a] text-white">
          <div className="absolute z-50 top-4 left-4 flex gap-2 bg-[#1e293b] p-3 rounded shadow-lg pointer-events-auto">
            <button
  className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
  onClick={() => {
    console.log("Add Node clicked");
    setShowModal(true);
  }}
>
  ➕ Add Node
</button>

            <button
              className="px-4 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-800"
              onClick={handleAutoLayout}
            >
              🧠 Auto Layout
            </button>
          </div>

          <ValidationStatus status={dagStatus} />

          <NodeModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onSubmit={handleAddNode}
          />

          <RenameModal
            isOpen={showRenameModal}
            currentLabel={renameTargetLabel}
            onClose={() => setShowRenameModal(false)}
            onRename={handleRename}
          />


          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onSelectionChange={handleSelectionChange}
            onNodeContextMenu={handleNodeContextMenu}
            fitView
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
          >
            {/* 🔽 Arrow marker definition */}
  <svg>
    <defs>
      <marker
        id="arrowhead"
        markerWidth="10"
        markerHeight="7"
        refX="10"
        refY="3.5"
        orient="auto"
        markerUnits="strokeWidth"
      >
        <path d="M0,0 L10,3.5 L0,7" fill="white" />
      </marker>
    </defs>
  </svg>

    {/* 📌 React Flow built-in components */}
            <MiniMap nodeStrokeColor={() => '#ffffff'} nodeColor={() => '#1e293b'} />
            <Controls />
            <Background />
          </ReactFlow>

          {contextMenu.visible && (
            <ContextMenu
              x={contextMenu.x}
              y={contextMenu.y}
              onDelete={handleDeleteNodeFromContext}
              onRename={handleRenameNodeFromContext}
              onClose={() => setContextMenu({ visible: false, x: 0, y: 0, nodeId: null })}
            />
          )}

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
