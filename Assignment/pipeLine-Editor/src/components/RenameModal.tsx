// src/components/RenameModal.tsx
import React, { useState, useEffect } from 'react';

interface RenameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRename: (newLabel: string) => void;
  currentLabel: string;
}

const RenameModal: React.FC<RenameModalProps> = ({
  isOpen,
  onClose,
  onRename,
  currentLabel,
}) => {
  const [newLabel, setNewLabel] = useState(currentLabel);

  useEffect(() => {
    setNewLabel(currentLabel);
  }, [currentLabel]);

  if (!isOpen) return null;

  const handleRename = () => {
    if (newLabel.trim()) {
      onRename(newLabel.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#1e293b] text-white p-6 rounded-lg w-96 shadow-xl">
        <h2 className="text-lg font-bold mb-4 text-white">✏️ Rename Node</h2>
        <input
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          className="w-full px-4 py-2 rounded bg-[#0f172a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter new node label"
        />
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleRename}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenameModal;
