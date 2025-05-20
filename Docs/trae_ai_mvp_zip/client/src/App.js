
import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    setResult(data.result);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>셀러코치.AI</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="자연어로 질문하세요"
          style={{ width: '300px', marginRight: '10px' }}
        />
        <button type="submit">분석 요청</button>
      </form>
      {result && (
        <div style={{ marginTop: '20px' }}>
          <strong>분석 결과:</strong>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default App;
