import { useState } from 'react';
import { analyzeProduct } from '@/api/mockApi';
import AnalysisFlow from './AnalysisFlow';
import { AnalysisResult } from '@/types/analysis';
import { Loader } from 'lucide-react';

export const AnalysisPage = () => {
  const [textInput, setTextInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleStartAnalysis = async () => {
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res: any = await analyzeProduct({ text: textInput, image: imageFile });
      setResult(res.data);
    } catch (e: any) {
      setError(e.message || '분석 중 오류 발생');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 space-y-12 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen rounded-3xl shadow-2xl">
      <section className="bg-white/90 p-8 rounded-2xl shadow-xl border border-purple-100 flex flex-col items-center">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-400 to-blue-500 mb-6 drop-shadow">AI가 초보 셀러도<br/>매출 찍게 도와줄게!</h2>
<p className="text-lg text-gray-700 mb-8 font-semibold">상품 정보만 입력하면, 분석부터 실전까지 한 번에!<br/>진짜 성공하면 그때만 결제, 부담 없이 시작해봐 🚀</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <label htmlFor="text-input" className="block text-base font-bold text-purple-700 mb-2">상품명/설명</label>
            <textarea
              id="text-input"
              rows={4}
              placeholder="예시: 미니 가습기, 20대 여성, 감성 인테리어 소품 등"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              disabled={loading}
            ></textarea>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="image-upload" className="block text-base font-bold text-purple-700 mb-2">상품 이미지 (선택)</label>
              <div className="flex items-center space-x-2">
                <label htmlFor="image-upload" className={`flex-grow cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm p-2 rounded-lg border border-gray-300 text-center transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  {imageFile ? imageFile.name : '이미지 선택'}
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/jpeg, image/png"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={handleStartAnalysis}
            disabled={loading}
            className={`relative bg-gradient-to-r from-purple-500 via-pink-400 to-blue-500 bg-[length:200%_200%] animate-gradient-x text-white font-extrabold py-4 px-10 rounded-2xl text-xl transition-all shadow-2xl hover:scale-105 mt-4 overflow-hidden ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className="absolute inset-0 opacity-20 blur-xl bg-gradient-to-r from-purple-400 via-pink-300 to-blue-400 animate-pulse pointer-events-none" />
            {loading ? (
              <>
                <Loader size={20} className="inline-block mr-2 animate-spin" /> 분석 진행 중...
              </>
            ) : (
              'AI 분석 시작하기'
            )}
          </button>
        </div>
        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
      </section>
      <section className="mt-12">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 mb-6 drop-shadow">분석 결과 & 실전 가이드</h2>
        {result ? (
          <AnalysisFlow result={result} />
        ) : (
          <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg">
            <p>상품 정보를 입력하고 'AI 분석 시작하기' 버튼을 누르면 결과가 여기에 표시됩니다.</p>
          </div>
        )}
      </section>
    </div>
  );
};
