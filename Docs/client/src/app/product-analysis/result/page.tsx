'use client';
import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import AnalysisResult from '../../../components/AnalysisResult';

import HeaderNavBar from '../../../components/HeaderNavBar';

export default function ProductAnalysisResultPage() {
  return (
    <Suspense>
      <ProductAnalysisResultPageContent />
    </Suspense>
  );
}

function ProductAnalysisResultPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query") || "";
  const [result, setResult] = useState({
    market: { tam: '1조 2,000억원', growthRate: 25 },
    pricing: { optimal: '25,000원', range: '20,000~30,000원' },
    competitor: { main: 'A사, B사, C사', level: '높음' },
    target: { main: '20~30대 여성', feature: '온라인 쇼핑 선호, 트렌드 민감' },
    trend: { trend: '친환경, 미니멀리즘', change: '최근 2년간 40% 증가' },
    risk: { main: '원자재 가격 변동, 공급망 불안', strategy: '다양한 공급처 확보, 가격 변동 모니터링' },
    detailPage: { key: '상세 이미지, 구매 후기, Q&A', improve: '고객 후기 강화, 상세 이미지 추가' },
    marketing: { main: 'SNS 인플루언서 마케팅, 검색광고', channel: '인스타그램, 네이버, 유튜브' },
    step9: { summary: '9단계 요약', detail: '9단계 상세 내용' },
    step10: { summary: '10단계 요약', detail: '10단계 상세 내용' },
  });

  // 콜백 함수들 (실제 기능은 추후 구현)
  const handleRetry = () => window.location.reload();
  const handlePdf = () => alert('PDF 저장 기능은 추후 제공됩니다.');
  const handleReset = () => (window.location.href = '/product-analysis');

  return (
    <>
      <HeaderNavBar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-white py-12">
      <div className="w-full">
        
        <AnalysisResult
          result={result}
          onRetry={handleRetry}
          onPdf={handlePdf}
          onReset={handleReset}
        />
      </div>
    </div>
    </>
  );
}
