import { useState } from 'react';
import { useDeepSeek } from '@/hooks/useDeepSeek';

export default function PriceStep({ onComplete }: { onComplete: (data: any) => void }) {
  const [priceRange, setPriceRange] = useState('1~3만원');
  const { analyze, isLoading } = useDeepSeek();

  const analyzePrice = async () => {
    const prompt = `
      ${priceRange} 가격대의 온라인 판매 최적 가격을 추천해주세요.
      출력 형식: { recommendedPrice: string, competitors: string[] }
    `;
    const result = await analyze(prompt);
    onComplete(result);
  };

  return (
    <div className="space-y-4">
      <select
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
        className="w-full p-2 border rounded"
      >
        {['1~3만원', '3~5만원', '5~10만원'].map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <button
        onClick={analyzePrice}
        disabled={isLoading}
        className="bg-indigo-600 text-white px-4 py-2 rounded disabled:bg-indigo-300"
      >
        {isLoading ? '분석 중...' : '가격 분석 실행'}
      </button>
    </div>
  );
}
