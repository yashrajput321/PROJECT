// src/components/NodeModal.tsx
import React, { useState } from 'react';

interface NodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (label: string) => void;
}

const NodeModal: React.FC<NodeModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [label, setLabel] = useState('');
  console.log("isOpen", isOpen);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (label.trim()) {
      onSubmit(label.trim());
      setLabel('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center  z-50">
      <div className="bg-slate-800 text-white p-6 rounded shadow-lg w-80">
        <h2 className="text-lg font-bold mb-2">Add New Node</h2>
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="border-black p-2 w-full mb-4 rounded text-white"
          placeholder="Enter node label"
        />
        <div className="flex justify-end space-x-2">
          <button className="bg-gray-300 text-white px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default NodeModal;
