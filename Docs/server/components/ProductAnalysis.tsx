import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';

const ProductAnalysis = () => {
  // 분석 단계 정의
  const steps = [
    { id: 1, title: "시장 분석", desc: "1조 원 규모 시장에서의 위치 분석" },
    { id: 2, title: "가격 분석", desc: "최적 가격대 도출" },
    { id: 3, title: "경쟁사 분석", desc: "5개사 가격/리뷰 비교" },
    { id: 4, title: "타겟 분석", desc: "구매자 페르소나 정의" },
    { id: 5, title: "트렌드 분석", desc: "실시간 시장 트렌드" },
    { id: 6, title: "리스크 분석", desc: "시장 진입 위험도" },
    { id: 7, title: "상세페이지 최적화", desc: "전환율 향상을 위한 UI 개선" },
    { id: 8, title: "마케팅 전략", desc: "콘텐츠·광고 추천" }
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [analysisStarted, setAnalysisStarted] = useState(false);

  // 분석 실행 함수
  const startAnalysis = async () => {
    setAnalysisStarted(true);
    // API 호출 예시 (실제로는 백엔드 연결)
    const response = await fetch('/api/analyze', { method: 'POST' });
    const data = await response.json();
    console.log("AI 분석 결과:", data);
  };

  return (
    <div className="analysis-container">
      <h1>AI가 3분 만에 끝내주는 제품 분석</h1>
      <p>데이터 기반의 확실한 결정을 지원합니다.</p>

      {!analysisStarted ? (
        <>
          <h2>무엇을 분석해 드릴까요?</h2>
          <ul className="step-list">
            {steps.map((step) => (
              <li key={step.id}>
                <strong>{step.title}</strong> - {step.desc}
              </li>
            ))}
          </ul>

          <button 
            className="start-button" 
            onClick={startAnalysis}
          >
            지금 분석 시작하기
          </button>
        </>
      ) : (
        <div className="result-view">
          {/* 단계별 결과 표시 (예: 시장 분석 차트) */}
          {currentStep === 0 && (
            <div className="chart">
              <Bar data={marketData} options={chartOptions} />
              <p>전체 시장 규모: 1조 2,000억원 (연간 성장률 25%)</p>
            </div>
          )}
          
          {/* 다음 단계로 이동하는 버튼 */}
          <button 
            className="next-button"
            onClick={() => setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))}
          >
            {currentStep === steps.length - 1 ? "분석 완료" : "다음 단계 →"}
          </button>
        </div>
      )}
    </div>
  );
};

// 차트 데이터 예시
const marketData = {
  labels: ["TAM", "SAM", "내 점유 가능 시장"],
  datasets: [{
    label: "시장 규모 (억원)",
    data: [12000, 5000, 2000],
    backgroundColor: ["#36A2EB", "#FFCE56", "#4BC0C0"]
  }]
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
      display: false,
    },
  },
};

export default ProductAnalysis;