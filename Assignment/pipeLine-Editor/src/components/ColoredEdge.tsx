// src/components/ColoredEdge.tsx
import React from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from 'reactflow';
import type { EdgeProps } from 'reactflow';

const ColoredEdge: React.FC<EdgeProps> = ({ id, sourceX, sourceY, targetX, targetY, data }) => {
  const [edgePath] = getBezierPath({ sourceX, sourceY, targetX, targetY });

  const color = data?.color || '#ffffff'; // Default white

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd="url(#arrowhead)" style={{ stroke: color, strokeWidth: 2 }} />
      <EdgeLabelRenderer>
        <div
    style={{
      position: 'absolute',
      transform: `translate(-50%, -50%) translate(${(sourceX + targetX) / 2}px, ${(sourceY + targetY) / 2}px)`,
      fontSize: 12,
      background: 'white',
      padding: '2px 4px',
      borderRadius: 4,
      color: color,
    }}
  >
    {data?.label || 'Edge'}
  </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default ColoredEdge;
