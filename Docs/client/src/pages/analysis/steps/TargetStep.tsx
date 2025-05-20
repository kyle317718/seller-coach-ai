import React from 'react';
import { TargetData } from '@/api/types';

export default function TargetStep({ data }: { data?: TargetData }) {
  if (!data) return <div>타겟 데이터 없음</div>;
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">타겟 분석</h2>
      <div className="mb-2">주요 타겟: <span className="font-semibold">{data.main}</span></div>
      <div>특징: <span className="font-semibold">{data.feature}</span></div>
    </div>
  );
}
