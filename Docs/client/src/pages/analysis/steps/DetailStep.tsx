import React from 'react';
import { DetailData } from '@/api/types';

export default function DetailStep({ data }: { data?: DetailData }) {
  if (!data) return <div>상세페이지 데이터 없음</div>;
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">상세페이지 최적화</h2>
      <div className="mb-2">핵심 요소: <span className="font-semibold">{data.key}</span></div>
      <div>개선점: <span className="font-semibold">{data.improve}</span></div>
    </div>
  );
}
