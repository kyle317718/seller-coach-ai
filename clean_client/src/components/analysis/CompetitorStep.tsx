import { useState } from 'react';
// import { useDeepSeek } from '@/hooks/useDeepSeek';

export default function CompetitorStep({ onComplete }: { onComplete: (data: any) => void }) {
  const [productName, setProductName] = useState('');
  // const { analyze, isLoading } = useDeepSeek();
  const analyze = async () => {};
  const isLoading = false;

  const analyzeCompetitors = async () => {
    const prompt = `
      "${productName}"의 주요 경쟁사 5개를 분석하고 차별화 전략을 추천해주세요.\n
      출력 형식: {
        competitors: { name: string, price: string, strength: string }[],
        differentiation: string[]
      }
    `;
    // const result = await analyze(prompt);
    // onComplete(result);
    onComplete({ competitors: [], strategy: '' });
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder="상품명을 입력하세요"
        className="w-full p-2 border rounded"
      />
      <button
        onClick={analyzeCompetitors}
        disabled={isLoading}
        className="bg-indigo-600 text-white px-4 py-2 rounded disabled:bg-indigo-300"
      >
        {isLoading ? '분석 중...' : '경쟁사 분석 실행'}
      </button>
    </div>
  );
}
