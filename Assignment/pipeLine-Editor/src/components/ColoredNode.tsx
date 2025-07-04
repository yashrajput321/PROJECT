// src/components/ColoredNode.tsx
import React from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';

const ColoredNode: React.FC<NodeProps> = ({ data }) => {
  const { label, nodeType } = data;

  const typeColors: Record<string, string> = {
    A: 'bg-blue-600',
    B: 'bg-green-600',
    C: 'bg-purple-600',
  };

  const nodeColor = typeColors[nodeType] || 'bg-gray-600';

  return (
    <div className={`relative text-white px-4 py-2 rounded shadow-md ${nodeColor} border border-gray-400  hover:border-white`}>
      {/* Target handle on the left */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-red-500"
      />

      <div className="text-sm font-bold">{label}</div>
      <div className="text-xs opacity-75">Type: {nodeType}</div>

      {/* Source handle on the right */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-green-400"
      />
    </div>
  );
};

export default ColoredNode;
