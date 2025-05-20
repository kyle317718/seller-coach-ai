import { useState } from 'react';
import { analyzeTrends } from '@/api/deepseek/trendAnalysis';

export default function TrendStep({ onComplete }: { onComplete: (data: any) => void }) {
  const [category, setCategory] = useState('패션');

  const handleAnalyze = async () => {
    const result = await analyzeTrends(category);
    onComplete(result);
  };

  return (
    <div className="space-y-4">
      <select 
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="패션">패션</option>
        <option value="가전">가전</option>
      </select>
      <button 
        onClick={handleAnalyze}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        트렌드 분석 실행
      </button>
    </div>
  );
}
