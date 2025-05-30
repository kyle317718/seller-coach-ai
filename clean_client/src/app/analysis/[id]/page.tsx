"use client";
import { useParams, useSearchParams } from 'next/navigation';
import Chart from '../../../components/Chart';
import AnalysisNavBar from '../../../components/AnalysisNavBar';

export default function AnalysisPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const type = searchParams?.get('type') ?? null;

  // URL이 /analysis/1 이라면 params.id가 "1"
  const activeId = params?.id?.toString() ?? "";

  return (
    <div className="p-8">
      {/* 파란색 네비게이션 바 */}
      <AnalysisNavBar activeId={activeId} />

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
