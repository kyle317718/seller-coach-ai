import ProgressBar from '../../components/ProgressBar';
import AnalysisSection from '../../components/AnalysisSection';

export default function CompetitorAnalysis() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">경쟁사 분석</h1>
      <ProgressBar currentStep={3} totalSteps={6} />

      <div className="space-y-8 mt-8">
        <AnalysisSection
          title="주요 경쟁사 현황"
          items={[
            "상위 5개 경쟁사의 제품 특징과 가격을 비교 분석합니다."
          ]}
        />
        
        <AnalysisSection
          title="SWOT 분석"
          items={[
            "경쟁사 대비 강점, 약점, 기회, 위협 요소를 분석합니다."
          ]}
        />
        
        <AnalysisSection
          title="차별화 전략"
          items={[
            "경쟁사와의 차별화 포인트를 도출합니다."
          ]}
        />
      </div>

      <button className="mt-8 bg-orange-500 text-white px-6 py-3 rounded-lg">
        분석 시작
      </button>
    </div>
  );
}