'use client';

import { useAnalysis } from '@/contexts/AnalysisContext';

const ANALYSIS_STEPS = [
  { id: 1, title: '트렌드 분석', emoji: '📈' },
  { id: 2, title: '시장 규모 평가', emoji: '💹' },
  { id: 3, title: '경쟁사 분석', emoji: '🏢' },
  { id: 4, title: '타겟 시장 분석', emoji: '🎯' },
  { id: 5, title: '가격 전략', emoji: '💰' },
  { id: 6, title: '마케팅 전략', emoji: '📢' },
  { id: 7, title: '리스크 분석', emoji: '⚠️' },
  { id: 8, title: '최종 보고서', emoji: '📊' }
];

export function AnalysisSteps() {
  const { state } = useAnalysis();
  const currentStep = Math.floor((state.progress / 100) * 8) + 1;

  return (
    <div className="flex flex-col space-y-3 p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        분석 진행 단계
      </h3>
      <div className="space-y-2">
        {ANALYSIS_STEPS.map((step) => (
          <div
            key={step.id}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${step.id === currentStep
                ? 'bg-blue-50 border-l-4 border-blue-500'
                : step.id < currentStep
                  ? 'bg-gray-50 text-gray-500'
                  : 'text-gray-400'
              }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step.id === currentStep
                  ? 'bg-blue-500 text-white'
                  : step.id < currentStep
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-400'
                }`}
            >
              {step.id < currentStep ? '✓' : step.emoji}
            </div>
            <span
              className={`font-medium ${step.id === currentStep
                  ? 'text-blue-700'
                  : step.id < currentStep
                    ? 'text-gray-600'
                    : 'text-gray-400'
                }`}
            >
              {step.title}
            </span>
            {step.id === currentStep && (
              <span className="ml-2 text-sm text-blue-600 animate-pulse">
                진행 중...
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 