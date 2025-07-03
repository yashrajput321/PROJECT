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
        {/* Optional: edge label, you can remove this */}
        {/* <div style={{ position: 'absolute', transform: `translate(${sourceX}px, ${sourceY}px)`, color }}>
          Edge
        </div> */}
      </EdgeLabelRenderer>
    </>
  );
};

export default ColoredEdge;
