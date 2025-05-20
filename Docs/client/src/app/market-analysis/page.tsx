import ProgressBar from '../../components/ProgressBar';
import AnalysisSection from '../../components/AnalysisSection';

export default function PriceAnalysis() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">가격 분석</h1>
      <ProgressBar currentStep={2} totalSteps={6} />

      <div className="space-y-8 mt-8">
        <AnalysisSection
          title="가격대별 시장 점유율"
          items={[
            "1~3만원: 45%",
            "3~5만원: 35%",
            "5~10만원: 20%"
          ]}
        />
        <AnalysisSection
          title="경쟁사 평균가"
          items={[
            "2만 8천원"
          ]}
        />
      </div>

      <button className="mt-8 bg-orange-500 text-white px-6 py-3 rounded-lg">
        분석 시작
      </button>
    </div>
  );
}