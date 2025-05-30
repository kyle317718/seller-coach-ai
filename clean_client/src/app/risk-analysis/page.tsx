import ProgressBar from '../../components/ProgressBar';
import AnalysisSection from '../../components/AnalysisSection';

export default function RiskAnalysis() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">리스크 분석</h1>
      <ProgressBar currentStep={6} totalSteps={6} />

      <div className="space-y-8 mt-8">
        <AnalysisSection
          title="시장 진입 리스크"
          items={[
            "현재 시장의 경쟁 상황과 진입 장벽을 분석합니다.",
            "관련 법규 및 규제 요소를 검토합니다."
          ]}
        />
        
        <AnalysisSection
          title="운영 리스크"
          items={[
            "제품/서비스 운영 과정에서 발생할 수 있는 위험 요소를 분석합니다."
          ]}
        />
        
        <AnalysisSection
          title="재무 리스크"
          items={[
            "초기 투자 비용과 예상 수익성을 고려한 재무적 위험을 평가합니다."
          ]}
        />
      </div>

      <button className="mt-8 bg-orange-500 text-white px-6 py-3 rounded-lg">
        분석 완료
      </button>
    </div>
  );
}
