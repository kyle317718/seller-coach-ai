'use client';

import AnalysisFlow from '../../components/AnalysisFlow';

// 10단계 분석 더미 데이터 예시
const dummyResult = {
  stepId: 1,
  data: {
    market: { tam: 120000, growthRate: 12, seasonality: 7 },
    risk: { riskScore: 78, summary: '리스크 분석 결과 요약', chart: [80, 90, 70, 60] },
    trend: { trendScore: 88, summary: '트렌드 분석 결과 요약', chart: [150, 140, 160, 170] },
    target: { persona: '20대 여성, 감성소비', insights: ['SNS 활용', '리뷰 마케팅'], summary: '타겟 분석 결과 요약', chart: [60, 70, 80, 90] },
    pricing: { optimalPrice: 25000, competitiveness: 92, summary: '가격 분석 결과 요약', chart: [25000, 27000, 26000, 25500] },
    competitor: { competitors: [{ name: '경쟁사A', price: 27000 }, { name: '경쟁사B', price: 26000 }], summary: '경쟁사 분석 결과 요약', chart: [92, 88, 85, 90] },
    detailPage: { summary: '상세페이지 분석 결과 요약', chart: [60, 65, 70, 75] },
    marketing: { summary: '마케팅 분석 결과 요약', chart: [80, 85, 90, 95] },
    logistics: { summary: '물류 분석 결과 요약', chart: [50, 55, 60, 65] },
    patent: { summary: '특허 분석 결과 요약', chart: [40, 45, 50, 55] },
  },
  recommendations: ['시장 조사 강화', '경쟁사 분석 심화', '마케팅 전략 다각화'],
  actionItems: ['신규 타겟 마케팅 실행', '가격 정책 재검토'],
  completed: true,
  timestamp: new Date().toISOString(),
};

import HeaderNavBar from '../../components/HeaderNavBar';

export default function AnalysisResultPage() {
  return (
    <>
      <HeaderNavBar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-white py-12">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-700 drop-shadow-sm tracking-tight">AI 10단계 분석 결과</h1>
        <AnalysisFlow result={dummyResult} />
      </div>
    </div>
    </>
  );
}

