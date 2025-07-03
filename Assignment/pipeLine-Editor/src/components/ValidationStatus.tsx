// src/components/ValidationStatus.tsx
import React from 'react';

interface ValidationStatusProps {
  status: string;
}

const ValidationStatus: React.FC<ValidationStatusProps> = ({ status }) => {
  const isValid = status.startsWith('Valid');

  return (
    <div
      className={`absolute top-4 right-4 px-4 py-2 rounded text-sm font-medium ${
        isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}
    >
      {status}
    </div>
  );
};

export default ValidationStatus;
