import { useState } from 'react';
import ProgressBar from '../../components/ProgressBar';
import AnalysisSection from '../../components/AnalysisSection';
import ExportButton from '../../components/ExportButton';
import AnalysisForm from '../../components/AnalysisForm';

export default function SummaryReport() {
  const [result, setResult] = useState<string | null>(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">종합 보고서</h1>
      <ProgressBar currentStep={7} totalSteps={7} />
      <AnalysisForm onSubmit={(value) => setResult(`'${value}'에 대한 종합 보고서 예시입니다.`)} />

      {result && (
        <div className="space-y-8 mt-8">
          <AnalysisSection
            title="시장 분석 요약"
            items={[
              "시장 규모, 성장률, 진입 장벽 등 핵심 내용을 요약합니다."
            ]}
          />
          <AnalysisSection
            title="가격 분석 요약"
            items={[
              "경쟁사 가격, 소비자 지불 의사, 수익성 등 주요 내용을 요약합니다."
            ]}
          />
          <AnalysisSection
            title="경쟁사 분석 요약"
            items={[
              "주요 경쟁사 현황, SWOT, 차별화 전략 등 핵심 내용을 요약합니다."
            ]}
          />
          <AnalysisSection
            title="트렌드 분석 요약"
            items={[
              "실시간 트렌드, 성장 예측, 연관 키워드 등 주요 내용을 요약합니다."
            ]}
          />
          <AnalysisSection
            title="타겟 분석 요약"
            items={[
              "구매자 페르소나, 행동, 니즈 등 핵심 내용을 요약합니다."
            ]}
          />
          <AnalysisSection
            title="리스크 분석 요약"
            items={[
              "시장 진입, 운영, 재무 리스크 등 주요 내용을 요약합니다."
            ]}
          />
          <div className="mt-6 p-4 bg-gray-50 rounded border text-gray-700">{result}</div>
          <ExportButton title="종합 보고서" content={result} />
        </div>
      )}
    </div>
  );
}
