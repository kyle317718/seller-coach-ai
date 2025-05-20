"use client";

import ProductAnalysis from "../../../components/ProductAnalysis";

export default function ProductAnalysisResultPage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-orange-600 drop-shadow">AI 10단계 사업분석 리포트</h1>
      <ProductAnalysis />
    </div>
  );
}
