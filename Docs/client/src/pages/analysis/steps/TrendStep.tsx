import React from 'react';
import { TrendData } from '@/api/types';

export default function TrendStep({ data }: { data?: TrendData }) {
  if (!data) return <div>트렌드 데이터 없음</div>;
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">트렌드 분석</h2>
      <div className="mb-2">핵심 트렌드: <span className="font-semibold">{data.trend}</span></div>
      <div>트렌드 변화: <span className="font-semibold">{data.change}</span></div>
    </div>
  );
}
