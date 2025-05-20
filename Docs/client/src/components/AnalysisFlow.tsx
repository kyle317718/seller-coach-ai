import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import AnalysisNav from './AnalysisNav';
import {
  MarketStep,
  PricingStep,
  CompetitorStep,
  TargetStep,
  TrendStep,
  RiskStep,
  DetailPageStep,
  MarketingStep,
} from './steps';
import { ANALYSIS_STEP_LABELS, AnalysisStepKey, AnalysisResult } from '@/types/analysis';

// intro/summary용 더미 데이터 및 컴포넌트
const summaryRadar = [85, 78, 92, 80, 88, 75, 90, 82, 77, 86];
const summaryLabels = [
  '시장', '가격', '경쟁', '타겟', '트렌드',
  '리스크', '상세', '마케팅', '물류', '특허'
];
const RadarChart = ({ data, labels }: { data: number[]; labels: string[] }) => {
  const size = 180;
  const center = size / 2;
  const radius = size / 2 - 30;
  const angleStep = (2 * Math.PI) / data.length;
  const points = data.map((v, i) => {
    const r = (v / 100) * radius;
    const angle = i * angleStep - Math.PI / 2;
    return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
  });
  const polygon = points.map(([x, y]) => `${x},${y}`).join(' ');
  return (
    <svg width={size} height={size} className="mx-auto my-4">
      {[0.25, 0.5, 0.75, 1].map((f, idx) => (
        <polygon
          key={idx}
          points={labels.map((_, i) => {
            const r = f * radius;
            const angle = i * angleStep - Math.PI / 2;
            return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
          }).join(' ')}
          fill={idx === 3 ? '#fbbf24' : '#fff7ed'}
          stroke="#fbbf24"
          strokeWidth={0.5}
          fillOpacity={idx === 3 ? 0.15 : 0.05}
        />
      ))}
      <polygon points={polygon} fill="#f59e42" fillOpacity={0.4} stroke="#f59e42" strokeWidth={2} />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={4} fill="#fbbf24" stroke="#f59e42" strokeWidth={1} />
      ))}
      {labels.map((label, i) => {
        const r = radius + 18;
        const angle = i * angleStep - Math.PI / 2;
        return (
          <text
            key={i}
            x={center + r * Math.cos(angle)}
            y={center + r * Math.sin(angle)}
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={13}
            fill="#f59e42"
            fontWeight="bold"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
};

const DummyStep = ({ data }: { data?: any }) => (
  <div className="bg-gray-50 p-4 rounded mt-2 text-sm">아직 준비 중인 단계입니다.</div>
);

const stepComponents: Record<AnalysisStepKey, React.FC<{ data?: any }>> = {
  market: MarketStep,
  pricing: PricingStep,
  competitor: CompetitorStep,
  target: TargetStep,
  trend: TrendStep,
  risk: RiskStep,
  detailPage: DetailPageStep,
  marketing: MarketingStep,
  logistics: DummyStep,
  patent: DummyStep,
};

const stepKeys: AnalysisStepKey[] = [
  'market',
  'pricing',
  'competitor',
  'target',
  'trend',
  'risk',
  'detailPage',
  'marketing',
  'logistics',
  'patent',
];

const TOTAL_STEPS = stepKeys.length + 2; // intro + 10단계 + final

const AnalysisFlow = ({ result }: { result: AnalysisResult }) => {
  const [currentStep, setCurrentStep] = useState(0);

  // intro
  if (currentStep === 0) {
    return (
      <div className="bg-white/90 p-8 rounded-2xl shadow-xl border border-orange-100 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-4">AI 사업분석 전체 요약</h2>
        <div className="mb-4 p-4 bg-orange-50 rounded-xl text-gray-800 border-l-4 border-orange-400 shadow-sm">
          <span className="font-bold text-orange-600">AI 코치:</span> 셀러님의 사업을 10단계로 꼼꼼히 분석했어요! 전체 흐름과 강점, 보완점을 한눈에 확인해보세요.
        </div>
        <RadarChart data={summaryRadar} labels={summaryLabels} />
        <div className="mt-4 text-base text-gray-700">
          <ul className="list-disc ml-6">
            <li><b>시장성</b>과 <b>가격/경쟁력</b>이 매우 우수합니다.</li>
            <li><b>상세페이지/마케팅/광고</b>도 평균 이상으로 준비되어 있습니다.</li>
            <li>경쟁 분석과 세무 준비는 조금 더 보완하면 완벽해질 수 있어요.</li>
          </ul>
        </div>
        <div className="flex justify-end mt-8">
          <button
            onClick={() => setCurrentStep(1)}
            className="px-6 py-2 rounded-lg bg-orange-500 text-white font-bold shadow hover:bg-orange-600 transition"
          >
            단계별 상세 보기 →
          </button>
        </div>
      </div>
    );
  }

  // final
  if (currentStep === TOTAL_STEPS - 1) {
    return (
      <div className="bg-white/90 p-8 rounded-2xl shadow-xl border border-orange-100 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-4">최종 분석 결과</h2>
        <div className="mb-4 p-4 bg-green-50 rounded-xl text-gray-800 border-l-4 border-green-400 shadow-sm">
          <span className="font-bold text-green-600">AI 코치:</span> 셀러님의 사업 여정, 정말 멋지게 준비되고 있어요! 마지막으로 전체 종합 진단과 앞으로의 추천 전략을 안내드릴게요.
        </div>
        <RadarChart data={summaryRadar} labels={summaryLabels} />
        <div className="mt-4 text-base text-gray-700">
          <ul className="list-disc ml-6">
            <li><b>강점</b>: 시장 트렌드, 상품 기획, 상세페이지, 마케팅 전략이 매우 뛰어납니다.</li>
            <li><b>보완점</b>: 경쟁 분석, 세무/회계 준비는 추가 자료와 전문가 상담을 추천드려요.</li>
            <li><b>추천 액션</b>:
              <ul className="list-disc ml-6 mt-1">
                <li>시장/고객 피드백을 꾸준히 반영해보세요.</li>
                <li>경쟁사 동향과 세무 이슈는 정기적으로 점검!</li>
                <li>AI 코치와 함께라면 언제든 성장할 수 있습니다 😊</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentStep(TOTAL_STEPS - 2)}
            className="px-5 py-2 rounded-lg bg-gray-100 text-gray-600 font-semibold border border-gray-200 shadow-sm"
          >
            이전 단계
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 rounded-lg bg-green-500 text-white font-bold shadow hover:bg-green-600 transition"
          >
            다시 분석하기
          </button>
        </div>
      </div>
    );
  }

  // 단계별
  const stepIdx = currentStep - 1;
  const StepComponent = stepComponents[stepKeys[stepIdx]];
  return (
    <div className="max-w-2xl mx-auto py-8">
      <ProgressBar currentStep={currentStep + 1} totalSteps={TOTAL_STEPS} />
      <div className="bg-white/90 p-8 rounded-2xl shadow-xl border border-orange-100">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{ANALYSIS_STEP_LABELS[stepKeys[stepIdx]]}</span>
          <span className="font-bold text-xl text-gray-800">{stepIdx + 1}단계</span>
        </div>
        <div className="mb-6">
          <StepComponent data={result[stepKeys[stepIdx]]} />
        </div>
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
            disabled={currentStep === 0}
            className="px-5 py-2 rounded-lg bg-gray-100 text-gray-600 font-semibold disabled:opacity-50 border border-gray-200 shadow-sm"
          >
            이전 단계
          </button>
          <button
            onClick={() => setCurrentStep((s) => Math.min(TOTAL_STEPS - 1, s + 1))}
            className="px-6 py-2 rounded-lg bg-orange-500 text-white font-bold shadow hover:bg-orange-600 transition"
          >
            {currentStep === TOTAL_STEPS - 2 ? '최종 결과 보기' : '다음 단계'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisFlow;
