import React, { useState, useEffect, useCallback } from 'react';

function App() {
  const [randomString, setRandomString] = useState('');
  const [length, setLength] = useState(10);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [intervalTime, setIntervalTime] = useState(5); // seconds
  const [copySuccess, setCopySuccess] = useState('');

  // ✅ Random String Generator
  const generateRandomString = useCallback(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }, [length]);

  // ✅ Generate on mount + when length changes
  useEffect(() => {
    setRandomString(generateRandomString());
  }, [generateRandomString]);

  // ✅ Auto-refresh logic
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setRandomString(generateRandomString());
    }, intervalTime * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, intervalTime, generateRandomString]);

  // ✅ Copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(randomString);
      setCopySuccess('✅ Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      setCopySuccess('❌ Failed to copy');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">🔐 Random String Generator</h1>

        <div className="mb-4">
          <label className="block font-medium mb-1">🔢 String Length</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            min={1}
            max={100}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">⏱️ Auto Refresh (seconds)</label>
          <input
            type="number"
            value={intervalTime}
            onChange={(e) => setIntervalTime(Number(e.target.value))}
            min={1}
            className="w-full p-2 border rounded"
            disabled={!autoRefresh}
          />
          <label className="flex items-center mt-2 space-x-2">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={() => setAutoRefresh(!autoRefresh)}
              className="accent-blue-500"
            />
            <span>Enable Auto Refresh</span>
          </label>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">🧾 Generated String</label>
          <div className="bg-gray-100 p-3 rounded font-mono break-words text-center text-lg">
            {randomString}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setRandomString(generateRandomString())}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            🔄 Generate New
          </button>
          <button
            onClick={copyToClipboard}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            📋 Copy
          </button>
        </div>

        {copySuccess && (
          <p className="text-center text-sm text-green-600 mt-2">{copySuccess}</p>
        )}
      </div>
    </div>
  );
}

export default App;
