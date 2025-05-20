import React from 'react';
import { PriceData } from '@/api/types';

export default function PriceStep({ data }: { data?: PriceData }) {
  if (!data) return <div>가격 데이터 없음</div>;
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">가격 분석</h2>
      <div className="mb-2">최적가: <span className="font-semibold">{data.optimal}</span></div>
      <div>가격 범위: <span className="font-semibold">{data.range}</span></div>
    </div>
  );
}
