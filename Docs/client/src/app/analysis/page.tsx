"use client";
import { useSearchParams } from 'next/navigation';
import Chart from '@/components/Chart';

export default function AnalysisPage() {
  const searchParams = useSearchParams();
  const type = searchParams?.get('type') ?? null; // <-- 여기만 수정!

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">{type || '종합'} 분석 리포트</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Chart type={type} />
        <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded">
          PDF로 저장
        </button>
      </div>
    </div>
  );
}