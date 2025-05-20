'use client';

import { InfoIcon } from 'lucide-react';

export const AnalysisTips = () => {
  return (
    <div className="bg-blue-50 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <InfoIcon className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-blue-900">분석 팁</h3>
      </div>
      <ul className="space-y-2 text-sm text-blue-800">
        <li className="flex items-start gap-2">
          <span className="font-medium">1.</span>
          <span>상품명을 정확히 입력해주세요 (예: "강아지 자동 급수기")</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="font-medium">2.</span>
          <span>이미지는 JPG/PNG만 가능 (최대 2MB)</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="font-medium">3.</span>
          <span>특수문자 사용 금지</span>
        </li>
      </ul>
    </div>
  );
}; 