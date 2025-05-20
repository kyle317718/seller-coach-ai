"use client";
import { ANALYSIS_ITEMS } from '@/data/analysisData';

export default function Chart({ type }: { type: string | null }) {
  const item = ANALYSIS_ITEMS.find(i => i.id === type);
  
  return (
    <div className="h-80 bg-gray-100 rounded flex flex-col items-center justify-center">
      <p className="text-gray-500 mb-4">
        {item?.title || '종합'} 분석 결과 차트
      </p>
      <div className="w-full h-48 bg-white border rounded-md animate-pulse" />
    </div>
  );
}
