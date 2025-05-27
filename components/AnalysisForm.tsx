import { useState } from 'react';
import { validateInput } from './validateInput';
import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';

export default function AnalysisForm({ onSubmit }: { onSubmit: (value: string) => void }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateInput(input);
    if (validation) {
      setError(validation);
      return;
    }
    setError(null);
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1200)); // 예시: 실제 API 연동 시 제거
    setLoading(false);
    onSubmit(input);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <input
        type="text"
        className="border rounded px-4 py-2 w-full"
        placeholder="분석할 제품/키워드를 입력하세요"
        value={input}
        onChange={e => setInput(e.target.value)}
        disabled={loading}
      />
      {error && <ErrorMessage message={error} />}
      <button
        type="submit"
        className="bg-orange-500 text-white px-6 py-2 rounded-lg w-full"
        disabled={loading}
      >
        분석 요청
      </button>
      {loading && <LoadingSpinner />}
    </form>
  );
}
