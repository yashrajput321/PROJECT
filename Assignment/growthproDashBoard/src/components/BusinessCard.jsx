import React from 'react';

const BusinessCard = ({ name, location, rating, reviews, headline, onRegenerate }) => {
  return (
    <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-1">{name} – {location}</h2>
      <p className="text-yellow-500 text-lg">⭐ {rating} ({reviews} reviews)</p>
      <p className="italic mt-3 mb-4">{headline}</p>
      <button
        onClick={onRegenerate}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        🔁 Regenerate SEO Headline
      </button>
    </div>
  );
};

export default BusinessCard;
