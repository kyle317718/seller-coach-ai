import React from 'react';
import { RiskData } from '@/api/types';

export default function RiskStep({ data }: { data?: RiskData }) {
  if (!data) return <div>리스크 데이터 없음</div>;
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">리스크 분석</h2>
      <div className="mb-2">주요 리스크: <span className="font-semibold">{data.main}</span></div>
      <div>대응 전략: <span className="font-semibold">{data.strategy}</span></div>
    </div>
  );
}
