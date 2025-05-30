import { useState } from 'react';
import { useDeepSeek } from '@/hooks/useDeepSeek';

export default function TargetStep({ onComplete }: { onComplete: (data: any) => void }) {
  const [keywords, setKeywords] = useState('');
  const { analyze, isLoading } = useDeepSeek();

  const analyzeTarget = async () => {
    const prompt = `
      키워드 "${keywords}"를 기반으로 타겟 고객 페르소나를 생성해주세요.\n
      출력 형식: {
        persona: { age: string, gender: string, interest: string[] },
        needs: string[]
      }
    `;
    const result = await analyze(prompt);
    onComplete(result);
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        placeholder="관련 키워드를 입력하세요 (예: 20대, 패션, SNS)"
        className="w-full p-2 border rounded"
      />
      <button
        onClick={analyzeTarget}
        disabled={isLoading}
        className="bg-indigo-600 text-white px-4 py-2 rounded disabled:bg-indigo-300"
      >
        {isLoading ? '분석 중...' : '타겟 분석 실행'}
      </button>
    </div>
  );
}
