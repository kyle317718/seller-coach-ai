import { useState } from 'react';
import ProgressBar from '../../components/ProgressBar';
import AnalysisSection from '../../components/AnalysisSection';
import AnalysisForm from '../../components/AnalysisForm';

export default function TargetAnalysis() {
  const [result, setResult] = useState<string | null>(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">타겟 분석</h1>
      <ProgressBar currentStep={5} totalSteps={6} />
      <AnalysisForm onSubmit={(value) => setResult(`'${value}'에 대한 타겟 분석 결과 예시입니다.`)} />

      {result && (
        <div className="mt-8">
          <AnalysisSection
            title="구매자 페르소나"
            items={[
              "제품/서비스의 핵심 구매자 그룹을 정의합니다.",
              "고객이 제품/서비스를 구매하는 주요 이유를 분석합니다."
            ]}
          />
          <AnalysisSection
            title="구매 행동 분석"
            items={[
              "구매 결정 과정과 주요 고려 사항을 분석합니다."
            ]}
          />
          <AnalysisSection
            title="고객 니즈 분석"
            items={[
              "잠재 고객의 주요 니즈와 페인 포인트를 도출합니다."
            ]}
          />
          <div className="mt-6 p-4 bg-gray-50 rounded border text-gray-700">{result}</div>
        </div>
      )}
    </div>
  );
}
