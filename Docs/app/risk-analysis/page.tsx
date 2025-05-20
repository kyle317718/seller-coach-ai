import { useState } from 'react';
import ProgressBar from '../../components/ProgressBar';
import AnalysisSection from '../../components/AnalysisSection';
import AnalysisForm from '../../components/AnalysisForm';

export default function RiskAnalysis() {
  const [result, setResult] = useState<string | null>(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">리스크 분석</h1>
      <ProgressBar currentStep={6} totalSteps={6} />
      <AnalysisForm onSubmit={(value) => setResult(`'${value}'에 대한 리스크 분석 결과 예시입니다.`)} />

      {result && (
        <div className="mt-8">
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
          <div className="mt-6 p-4 bg-gray-50 rounded border text-gray-700">{result}</div>
        </div>
      )}
    </div>
  );
}
