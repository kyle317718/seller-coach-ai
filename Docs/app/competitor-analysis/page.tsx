import { useState } from 'react';
import ProgressBar from '../../components/ProgressBar';
import AnalysisSection from '../../components/AnalysisSection';
import AnalysisForm from '../../components/AnalysisForm';

export default function CompetitorAnalysis() {
  const [result, setResult] = useState<string | null>(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">경쟁사 분석</h1>
      <ProgressBar currentStep={3} totalSteps={6} />
      <AnalysisForm onSubmit={(value) => setResult(`'${value}'에 대한 경쟁사 분석 결과 예시입니다.`)} />

      {result && (
        <div className="mt-8">
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
          <div className="mt-6 p-4 bg-gray-50 rounded border text-gray-700">{result}</div>
        </div>
      )}
    </div>
  );
}
