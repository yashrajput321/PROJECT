// src/components/ContextMenu.tsx
import React from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  onDelete: () => void;
  onRename: () => void;
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  onDelete,
  onRename,
  onClose,
}) => {
  return (
    <div
      className="absolute bg-gray-800 text-white p-2 rounded shadow-lg z-50"
      style={{ top: y, left: x }}
      onMouseLeave={onClose}
    >
      <button
        onClick={onRename}
        className="hover:bg-yellow-600 px-4 py-2 w-full text-left rounded"
      >
        ✏️ Rename Node
      </button>
      <button
        onClick={onDelete}
        className="hover:bg-red-600 px-4 py-2 w-full text-left rounded mt-1"
      >
        🗑 Delete Node
      </button>
    </div>
  );
};

export default ContextMenu;
