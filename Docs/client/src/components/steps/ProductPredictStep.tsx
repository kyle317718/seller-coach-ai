import React, { useState } from 'react';

export default function ProductPredictStep() {
  const [keywords, setKeywords] = useState('');

  // 추후 useDeepSeek 훅 연결 필요
  const predictTrend = async () => {
    // 임시: 실제 분석 로직 연결 필요
    alert(`"${keywords}" 관련 2024년 하반기 유망 상품 TOP5를 예측합니다.`);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl">
      <h2 className="text-3xl font-bold mb-4">🔥 지금 폭발하는 상품 찾기</h2>
      <input
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        placeholder="관심 키워드 입력 (예: 여름, 휴가)"
        className="w-full p-4 border-2 border-purple-200 rounded-xl mb-4"
      />
      <button 
        onClick={predictTrend}
        className="bg-purple-600 text-white px-8 py-3 rounded-xl hover:bg-purple-700 transition-all"
      >
        AI가 진입 시기까지 계산해줄게
      </button>
    </div>
  );
}
