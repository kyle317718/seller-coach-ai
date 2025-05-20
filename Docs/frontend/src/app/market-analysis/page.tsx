import ProgressBar from '@/components/ProgressBar';
import AnalysisSection from '@/components/AnalysisSection';

export default function MarketAnalysis() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">시장 분석</h1>
      <ProgressBar currentStep={1} totalSteps={6} />

      <div className="space-y-8 mt-8">
        <AnalysisSection 
          title="시장 규모 분석"
          items={[
            "전체 시장 규모 (TAM): 해당 제품/서비스가 진출 가능한 전체 시장의 규모를 분석합니다.",
            "접근 가능 시장 규모 (SAM): 현재 기술과 비즈니스 모델로 접근 가능한 시장의 규모를 분석합니다."
          ]}
        />
        
        <AnalysisSection
          title="성장률 분석"
          items={[
            "시장의 연간 성장률과 향후 전망을 분석합니다."
          ]}
        />
        
        <AnalysisSection
          title="진입 장벽 분석"
          items={[
            "시장 진입 시 예상되는 장벽과 대응 방안을 분석합니다."
          ]}
        />
      </div>

      <button className="mt-8 bg-orange-500 text-white px-6 py-3 rounded-lg">
        분석 시작
      </button>
    </div>
  );
}
