import React from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';

const NodeComponent: React.FC<NodeProps> = ({ data }) => {
  return (
    <div className="p-2 bg-white border-2 rounded-md shadow-md">
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-2 h-2 bg-blue-500" 
      />
      <div className="text-center">{data.label}</div>
      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-2 h-2 bg-green-500" 
      />
    </div>
  );
};

export default NodeComponent;