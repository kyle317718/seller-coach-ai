import ProgressBar from '@/components/ProgressBar';
import React from 'react';

export default function CompetitorAnalysisPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">경쟁사 분석</h1>
      <ProgressBar currentStep={3} totalSteps={6} />
      <div className="space-y-8 mt-8">
        {/* 예시 분석 섹션 */}
        <section className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-2">경쟁사 A</h2>
          <p>시장 점유율: 40%</p>
        </section>
        <section className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-2">경쟁사 B</h2>
          <p>시장 점유율: 30%</p>
        </section>
      </div>
    </div>
  );
} 