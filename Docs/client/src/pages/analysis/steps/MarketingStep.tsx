import React from 'react';
import { MarketingData } from '@/api/types';

export default function MarketingStep({ data }: { data?: MarketingData }) {
  if (!data) return <div>마케팅 데이터 없음</div>;
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">마케팅 전략</h2>
      <div className="mb-2">주요 전략: <span className="font-semibold">{data.main}</span></div>
      <div>추천 채널: <span className="font-semibold">{data.channel}</span></div>
    </div>
  );
}
