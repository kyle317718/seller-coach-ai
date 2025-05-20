import { useState } from 'react';
import ProgressBar from '../../components/ProgressBar';
import AnalysisSection from '../../components/AnalysisSection';
import AnalysisForm from '../../components/AnalysisForm';

export default function TrendAnalysis() {
  const [result, setResult] = useState<string | null>(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">트렌드 분석</h1>
      <ProgressBar currentStep={4} totalSteps={6} />
      <AnalysisForm onSubmit={(value) => setResult(`'${value}'에 대한 트렌드 분석 결과 예시입니다.`)} />

      {result && (
        <div className="mt-8">
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
          <div className="mt-6 p-4 bg-gray-50 rounded border text-gray-700">{result}</div>
        </div>
      )}
    </div>
  );
}
