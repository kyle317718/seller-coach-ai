import ProgressBar from '../../components/ProgressBar';
import AnalysisSection from '../../components/AnalysisSection';

export default function TrendAnalysis() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">트렌드 분석</h1>
      <ProgressBar currentStep={4} totalSteps={6} />

      <div className="space-y-8 mt-8">
        <AnalysisSection
          title="실시간 트렌드"
          items={[
            "현재 시장의 주요 트렌드와 소비자 선호도를 분석합니다."
          ]}
        />
        
        <AnalysisSection
          title="성장 예측"
          items={[
            "향후 6개월간의 시장 트렌드 변화를 예측합니다."
          ]}
        />
        
        <AnalysisSection
          title="연관 키워드"
          items={[
            "주요 연관 키워드와 검색량 추이를 분석합니다."
          ]}
        />
      </div>

      <button className="mt-8 bg-orange-500 text-white px-6 py-3 rounded-lg">
        분석 시작
      </button>
    </div>
  );
}
