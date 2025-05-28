"use client";
import { ANALYSIS_ITEMS } from '../data/analysisData';
import AnalysisCard from './AnalysisCard';

const handleAnalysisStart = (id: string) => {
  console.log(`Starting ${id} analysis...`);
  // TODO: API 연동 로직 추가 예정
};

export default function AnalysisDashboard() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="mb-10">
<<<<<<< HEAD
        <h1 className="text-4xl font-bold mb-3">AI와 함께라면, 3분 만에 당신의 성공이 시작됩니다!</h1>
        <p className="text-lg text-gray-600">데이터와 AI의 힘으로, 당신의 도전을 반드시 성공으로 이끌어 드릴게요!</p>
=======
        <h1 className="text-4xl font-bold mb-3">AI가 3분 만에 끝내주는 제품 분석</h1>
        <p className="text-lg text-gray-600">데이터 기반의 확실한 경영을 지원합니다.</p>
>>>>>>> 69ed5420 (동기부여 말투 전체 적용 및 UI 개선 (detached HEAD 상태))
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {ANALYSIS_ITEMS.map((item, index) => (
          <AnalysisCard 
            key={item.id}
            title={item.name}
            description={item.description}
            order={index}
            onClick={() => handleAnalysisStart(item.id)}
            onStart={() => handleAnalysisStart(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
