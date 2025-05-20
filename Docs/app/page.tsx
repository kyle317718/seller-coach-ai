import Link from 'next/link';
import AnalysisCard from '../components/AnalysisCard';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">AI가 3분 만에 끝내주는 제품 분석</h1>
      <p className="mb-8">데이터 기반의 확실한 결정을 지원합니다</p>

      <div className="mb-10">
        <button className="bg-orange-500 text-white px-6 py-3 rounded-lg">
          지금 바로 분석하기
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnalysisCard 
          title="시장 분석" 
          description="1조 원 규모 시장에서 당신의 위치"
          link="/market-analysis"
        />
        <AnalysisCard
          title="가격 분석"
          description="최적 가격대 도출"
          link="/price-analysis"
        />
        <AnalysisCard
          title="경쟁사 분석"
          description="5개사 가격/리뷰 비교"
          link="/competitor-analysis"
        />
        <AnalysisCard
          title="트렌드 분석"
          description="실시간 시장 트렌드"
          link="/trend-analysis"
        />
        <AnalysisCard
          title="타겟 분석"
          description="구매자 페르소나"
          link="/target-analysis"
        />
        <AnalysisCard
          title="리스크 분석"
          description="시장 진입 위험도"
          link="/risk-analysis"
        />
      </div>

      <div className="mt-10 text-sm text-gray-500">
        <p>🔒 안전한 분석 | 📌 2024년 최신 데이터 | 🤖 AI 정확도 89%</p>
      </div>
    </main>
  );
}
