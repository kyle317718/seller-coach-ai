import { useState } from 'react';
import ProgressBar from '../../components/ProgressBar';
import AnalysisSection from '../../components/AnalysisSection';
import AnalysisForm from '../../components/AnalysisForm';

export default function PriceAnalysis() {
  const [result, setResult] = useState<string | null>(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">가격 분석</h1>
      <ProgressBar currentStep={2} totalSteps={6} />
      <AnalysisForm onSubmit={(value) => setResult(`'${value}'에 대한 가격 분석 결과 예시입니다.`)} />

      {result && (
        <div className="mt-8">
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
          <div className="mt-6 p-4 bg-gray-50 rounded border text-gray-700">{result}</div>
        </div>
      )}
    </div>
  );
}
