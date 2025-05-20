import React, { useState } from 'react';
import { generateAnalysis, MarketAnalysis } from '../data/analysisData';
// import AnalysisResult from './AnalysisResult'; // 실제 결과 표시 컴포넌트가 있다면 주석 해제

// 예시용 product 데이터 (실제 사용 시 props 등으로 전달)
const currentProduct = {
  name: '샘플 제품',
  category: '전자기기',
  description: '최신 AI 기반 스마트 디바이스'
};

const AnalysisView = () => {
  const [result, setResult] = useState<MarketAnalysis | null>(null);

  const handleAnalyze = (productData: any) => {
    const analysis = generateAnalysis(productData);
    setResult(analysis);
  };

  return (
    <div>
      <button onClick={() => handleAnalyze(currentProduct)}>
        AI 분석 실행
      </button>
      {result && (
        // <AnalysisResult data={result} />
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
};

export default AnalysisView;
