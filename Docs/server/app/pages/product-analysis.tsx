import React, { useState } from 'react';
import { AnalysisForm } from '../components/AnalysisForm';
import { AnalysisSteps } from '../components/AnalysisSteps';
import { ResultView } from '../components/ResultView';

export interface AnalysisStep {
  id: number;
  title: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  content: string;
  result: string | null;
  timestamp?: string;
}

export interface AnalysisState {
  currentStep: number;
  totalSteps: number;
  steps: AnalysisStep[];
}

const ProductAnalysis: React.FC = () => {
  const [analysisState, setAnalysisState] = useState<AnalysisState>({
    currentStep: 0,
    totalSteps: 5,
    steps: [
      {
        id: 1,
        title: '시장 분석',
        status: 'pending',
        content: '시장 규모 및 트렌드 분석',
        result: null
      },
      {
        id: 2,
        title: '제품 특성 분석',
        status: 'pending',
        content: '제품의 주요 특징과 장점',
        result: null
      },
      {
        id: 3,
        title: '가격 전략',
        status: 'pending',
        content: '적정 가격대 및 가격 전략',
        result: null
      },
      {
        id: 4,
        title: '타겟 고객 분석',
        status: 'pending',
        content: '주요 고객층 및 구매 동기',
        result: null
      },
      {
        id: 5,
        title: '성장 전략',
        status: 'pending',
        content: '시장 진입 및 성장 전략',
        result: null
      }
    ]
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">
        제품 분석
      </h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <AnalysisForm
            analysisState={analysisState}
            setAnalysisState={setAnalysisState}
          />
        </div>
        <div className="md:col-span-8">
          <AnalysisSteps steps={analysisState.steps} />
          {analysisState.steps.some(step => step.status === 'completed') && (
            <ResultView steps={analysisState.steps} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductAnalysis; 