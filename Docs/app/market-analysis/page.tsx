import { useState } from 'react';
import ProgressBar from '../../components/ProgressBar';
import AnalysisSection from '../../components/AnalysisSection';
import AnalysisForm from '../../components/AnalysisForm';

export default function MarketAnalysis() {
  const [result, setResult] = useState<string | null>(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">시장 분석</h1>
      <ProgressBar currentStep={1} totalSteps={6} />
      <AnalysisForm onSubmit={(value) => setResult(`'${value}'에 대한 시장 분석 결과 예시입니다.`)} />

      {result && (
        <div className="mt-8">
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
          <div className="mt-6 p-4 bg-gray-50 rounded border text-gray-700">{result}</div>
        </div>
      )}
    </div>
  );
}
