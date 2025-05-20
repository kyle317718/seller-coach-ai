import React, { useState } from 'react';

interface AnalysisFormProps {
  onAnalyze: (productName: string) => void;
}

const AnalysisForm: React.FC<AnalysisFormProps> = ({ onAnalyze }) => {
  const [productName, setProductName] = useState('');
  const [error, setError] = useState('');

  const handleAnalyze = () => {
    if (!productName.trim()) {
      setError('상품명을 입력해 주세요!');
      return;
    }
    setError('');
    onAnalyze(productName.trim());
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/90 rounded-2xl shadow-xl p-8 border border-orange-100 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-orange-600 mb-4 drop-shadow">AI 분석 시작하기</h2>
      <input
        type="text"
        value={productName}
        onChange={e => setProductName(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') handleAnalyze(); }}
        placeholder="분석할 상품명을 입력하세요"
        className="w-full p-3 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-400 outline-none text-lg mb-2"
      />
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      <button
        onClick={handleAnalyze}
        className="w-full py-3 mt-2 rounded-lg bg-gradient-to-r from-orange-400 to-pink-400 text-white font-bold text-lg shadow hover:from-orange-500 hover:to-pink-500 transition"
      >
        AI 분석 바로 해볼래
      </button>
    </div>
  );
};

export default AnalysisForm; 