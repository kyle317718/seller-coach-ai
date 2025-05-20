'use client';

import { ProductInfoForm } from './ProductInfoForm';
import { ProgressBar } from './ProgressBar';

export function AnalysisForm() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🔍</span>
            <h1 className="text-2xl font-bold text-gray-900">분석 진행 상태</h1>
          </div>
          <div className="text-sm text-gray-600">
            현재 단계: 0/8 (기본 정보 입력)
          </div>
          <ProgressBar
            currentStep={0}
            totalSteps={8}
            stepTitle="기본 정보 입력"
          />
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-xl">✏️</span>
            <h2 className="text-xl font-semibold text-gray-900">제품 정보를 입력해 주세요</h2>
          </div>
        </div>
        <ProductInfoForm />
      </div>

      {/* Next Steps Preview */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">다음 단계</h3>
        <div className="text-sm text-gray-500">
          1. 트렌드 분석 → 2. 시장성 평가 → 3. 경쟁사 분석 → 4. 타겟 시장 분석 → 5. 마케팅 전략 → 6. 가격 전략 → 7. 유통 전략 → 8. 최종 보고서
        </div>
      </div>

      {/* Analysis Steps */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
        <h3 className="text-lg font-medium text-gray-900">분석 단계</h3>
        <ol className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center space-x-2">
            <span className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs">1</span>
            <span>트렌드 분석: 검색량 추이 및 관련 키워드 분석</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-5 h-5 rounded-full bg-gray-300 text-white flex items-center justify-center text-xs">2</span>
            <span>시장 분석: 시장 규모 및 성장성 분석</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-5 h-5 rounded-full bg-gray-300 text-white flex items-center justify-center text-xs">3</span>
            <span>경쟁사 분석: 주요 경쟁사 및 시장 점유율 분석</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-5 h-5 rounded-full bg-gray-300 text-white flex items-center justify-center text-xs">4</span>
            <span>타겟 시장 분석: 소비자 특성 및 선호도 분석</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-5 h-5 rounded-full bg-gray-300 text-white flex items-center justify-center text-xs">5</span>
            <span>마케팅 전략: 효과적인 마케팅 채널 및 메시지 제안</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-5 h-5 rounded-full bg-gray-300 text-white flex items-center justify-center text-xs">6</span>
            <span>가격 전략: 최적 가격대 및 가격 정책 제안</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-5 h-5 rounded-full bg-gray-300 text-white flex items-center justify-center text-xs">7</span>
            <span>유통 전략: 효과적인 판매 채널 및 유통 방안</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-5 h-5 rounded-full bg-gray-300 text-white flex items-center justify-center text-xs">8</span>
            <span>최종 보고서: 종합 분석 및 실행 계획 제시</span>
          </li>
        </ol>
      </div>
    </div>
  );
} 