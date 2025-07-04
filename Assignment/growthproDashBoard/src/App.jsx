import React, { useState } from 'react';
import BusinessCard from './components/BusinessCard';

function App() {
  const [formData, setFormData] = useState({ name: '', location: '' });
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch('http://localhost:5000/business-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    setBusinessData({ ...formData, ...data });
    setLoading(false);
  };

  const handleRegenerate = async () => {
    const { name, location } = formData;
    const response = await fetch(`http://localhost:5000/regenerate-headline?name=${name}&location=${location}`);
    const data = await response.json();
    setBusinessData(prev => ({ ...prev, headline: data.headline }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">📊 Local Business Dashboard</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded-xl w-full max-w-md"
      >
        <input
          type="text"
          name="name"
          placeholder="Business Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border mb-4 rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border mb-4 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>

      {businessData && (
        <BusinessCard
          {...businessData}
          onRegenerate={handleRegenerate}
        />
      )}
    </div>
  );
}

export default App;
