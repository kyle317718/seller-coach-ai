import React from 'react';
import { CompetitorData } from '@/api/types';

export default function CompetitorStep({ data }: { data?: CompetitorData }) {
  if (!data) return <div>경쟁사 데이터 없음</div>;
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">경쟁사 분석</h2>
      <div className="mb-2">주요 경쟁사: <span className="font-semibold">{data.main}</span></div>
      <div>경쟁 강도: <span className="font-semibold">{data.level}</span></div>
    </div>
  );
}
