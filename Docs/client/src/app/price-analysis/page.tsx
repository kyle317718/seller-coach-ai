import ProgressBar from '../../components/ProgressBar';
import AnalysisSection from '../../components/AnalysisSection';

export default function PriceAnalysis() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">가격 분석</h1>
      <ProgressBar currentStep={2} totalSteps={6} />

      <div className="space-y-8 mt-8">
        <AnalysisSection
          title="시장 가격 분석"
          items={[
            "경쟁사 가격대: 주요 경쟁사들의 가격 전략과 포지셔닝을 분석합니다.",
            "소비자 지불 의사: 목표 고객층의 적정 지불 가격대를 조사합니다."
          ]}
        />
        
        <AnalysisSection
          title="원가 분석"
          items={[
            "제품/서비스 제공에 필요한 총 비용을 산출합니다."
          ]}
        />
        
        <AnalysisSection
          title="수익성 분석"
          items={[
            "목표 수익률 달성을 위한 최적 가격대를 도출합니다."
          ]}
        />
      </div>

      <button className="mt-8 bg-orange-500 text-white px-6 py-3 rounded-lg">
        분석 시작
      </button>
    </div>
  );
}