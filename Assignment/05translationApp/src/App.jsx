import React, { useState } from 'react';

function App() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLang, setTargetLang] = useState('hi'); // Default to Hindi
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setTranslatedText('⚠️ Please enter some text to translate.');
      return;
    }

    const url = `https://free-google-translator.p.rapidapi.com/external-api/free-google-translator?from=en&to=${targetLang}&query=${encodeURIComponent(
      inputText
    )}`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'free-google-translator.p.rapidapi.com',
      },
      body: JSON.stringify({
        translate: 'rapidapi',
      }),
    };

    setIsLoading(true);
    setTranslatedText('');

    try {
      const res = await fetch(url, options);
      const data = await res.json();
      console.log('API Response:', data);

      if (data.translated_text) {
        setTranslatedText(data.translated_text);
      } else {
        setTranslatedText('⚠️ Translation not found.');
      }
    } catch (error) {
      console.error('Error during translation:', error);
      setTranslatedText('⚠️ Translation failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(translatedText);
    utterance.lang = targetLang;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">🌐 Text Translator</h1>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text in English"
        className="w-full max-w-md p-3 border rounded mb-4"
        rows={4}
      />

      <select
        value={targetLang}
        onChange={(e) => setTargetLang(e.target.value)}
        className="mb-4 p-2 border rounded w-full max-w-md"
      >
        <option value="hi">Hindi</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="ja">Japanese</option>
      </select>

      <button
        onClick={handleTranslate}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
      >
        Translate
      </button>

      {isLoading && (
        <p className="mt-6 text-blue-500 font-medium">⏳ Translating...</p>
      )}

      {!isLoading && translatedText && (
        <div className="mt-6 p-4 bg-white rounded shadow w-full max-w-md">
          <h2 className="font-semibold mb-2">Translated Text:</h2>
          <p className="text-gray-800">{translatedText}</p>
          <button
            onClick={handleSpeak}
            className="mt-2 text-sm text-blue-500 underline hover:text-blue-700"
          >
            🔊 Listen
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
