import React from 'react';
import { MarketData } from '@/api/types';

export default function MarketStep({ data }: { data?: MarketData }) {
  if (!data) return <div>시장 데이터 없음</div>;
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">시장 분석</h2>
      <div className="mb-2">시장 규모: <span className="font-semibold">{data.tam}</span></div>
      <div>성장률: <span className="font-semibold">{data.growthRate}%</span></div>
    </div>
  );
}
