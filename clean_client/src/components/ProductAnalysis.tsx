'use client';

import React, { useState, useEffect } from 'react';
import AnalysisForm from './AnalysisForm';
import { Bar, Pie, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  ChartData,
  ChartOptions,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement
);

const BarChart = ({ data, options }: { data: ChartData<'bar'>; options?: ChartOptions<'bar'> }) => <Bar data={data} options={options} />;
const PieChart = ({ data, options }: { data: ChartData<'pie'>; options?: ChartOptions<'pie'> }) => <Pie data={data} options={options} />;
const RadarChart = ({ data, options }: { data: ChartData<'radar'>; options?: ChartOptions<'radar'> }) => <Radar data={data} options={options} />;

// 전체 요약/최종결과용 더미 데이터
const summaryRadar = [85, 78, 92, 80, 88, 75, 90, 82, 77, 86];
const summaryLabels = [
  '예측', '시장성', '전략', '준비', '고객',
  '경쟁', '상세', '마케팅', '광고', '세무'
];

export default function ProductAnalysis() {
  const [step, setStep] = useState(0);
  const [productName, setProductName] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState<any>(null);
  useEffect(() => {
    if (productName) {
      fetch('http://localhost:5002/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName }),
      })
        .then(res => res.json())
        .then(data => setAnalysisData(data));
    }
  }, [productName]);

  if (!productName) {
    return <AnalysisForm onAnalyze={name => { setProductName(name); setStep(0); }} />;
  }

  // 단계별 렌더링 함수형 구조
  const analysisSteps = [
    {
      key: 'intro',
      title: '전체 분석 요약',
      icon: '🌟',
      content: (data: any) => (
        <div className="mb-6 flex flex-col items-center">
          <div className="w-full max-w-xl p-5 bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl border-l-4 border-orange-400 shadow-md mb-4">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">🤖</span>
              <span className="font-bold text-orange-600">AI 코치의 따뜻한 한마디</span>
            </div>
            <div className="text-gray-800 text-base leading-relaxed">
              {data?.coachMessage || 'AI가 10단계로 꼼꼼하게 분석했어요!'}
            </div>
          </div>
          <div className="w-full max-w-md bg-white rounded-xl shadow p-4 mb-4">
            <RadarChart data={data?.radarChartData} options={data?.radarChartOptions} />
          </div>
          <div className="w-full max-w-xl grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-orange-100 rounded-xl p-4 border-l-4 border-orange-400">
              <div className="font-bold text-orange-700 mb-1">🌈 강점</div>
              <ul className="list-disc ml-5 text-gray-700 text-sm">
                <li><b>시장성</b>과 <b>상품 예측</b>이 매우 우수합니다. 트렌드와 성장성이 모두 높아요!</li>
                <li><b>상세페이지/마케팅/광고</b>도 평균 이상으로 준비되어 있습니다.</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-300">
              <div className="font-bold text-blue-700 mb-1">🛠️ 보완점</div>
              <ul className="list-disc ml-5 text-gray-700 text-sm">
                <li>경쟁 분석과 세무 준비는 조금 더 보완하면 완벽해질 수 있어요.</li>
              </ul>
            </div>
          </div>
          <div className="w-full max-w-xl mt-6 text-center">
            <div className="inline-block bg-green-100 text-green-700 font-bold rounded-full px-6 py-3 shadow-md text-lg">
              🚀 셀러님의 성공을 항상 응원합니다! AI 코치와 함께라면 언제든 성장할 수 있어요 💪
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'predict',
      title: '상품 예측',
      icon: '🔮',
      content: (data: any) => (
        <BarChart data={data?.barChartData} options={data?.barChartOptions} />
      ),
    },
    {
      key: 'market',
      title: '시장성 분석',
      icon: '📈',
      content: (data: any) => (
        <PieChart data={data?.pieChartData} options={data?.pieChartOptions} />
      ),
    },
    {
      key: 'strategy',
      title: '사업/위탁 전략',
      icon: '🧩',
      content: (data: any) => (
        <div className="mb-2 text-base text-gray-700 font-semibold">사업 vs 위탁 적합도, 수익률, 현실적 사업방식 제안</div>
      ),
    },
    {
      key: 'prepare',
      title: '판매 전 준비',
      icon: '📝',
      content: (data: any) => (
        <div className="mb-2 text-base text-gray-700 font-semibold">법적 요건, 물류 구조, 전체 준비 체크리스트</div>
      ),
    },
    {
      key: 'customer',
      title: '고객 분석',
      icon: '👥',
      content: (data: any) => (
        <div className="mb-2 text-base text-gray-700 font-semibold">타깃 고객 페르소나, 사용 시나리오, 니즈 정리</div>
      ),
    },
    {
      key: 'competitor',
      title: '경쟁 분석',
      icon: '🥊',
      content: (data: any) => (
        <div className="mb-2 text-base text-gray-700 font-semibold">경쟁 강도, 차별화 전략, 리스크 판단</div>
      ),
    },
    {
      key: 'detail',
      title: '상세페이지 개선',
      icon: '🖼️',
      content: (data: any) => (
        <div className="mb-2 text-base text-gray-700 font-semibold">문구/카피, 이미지, 핵심 정보 구조화</div>
      ),
    },
    {
      key: 'marketing',
      title: '마케팅 전략 제안',
      icon: '📢',
      content: (data: any) => (
        <div className="mb-2 text-base text-gray-700 font-semibold">콘텐츠 유형, SNS/광고, 캠페인 전략</div>
      ),
    },
    {
      key: 'ad',
      title: '광고 & END ROAS 시뮬레이션',
      icon: '📊',
      content: (data: any) => (
        <div className="mb-2 text-base text-gray-700 font-semibold">광고 예산 대비 수익, 채널별 ROAS, 광고 전략</div>
      ),
    },
    {
      key: 'tax',
      title: '세무·회계 가이드',
      icon: '💡',
      content: (data: any) => (
        <div className="mb-2 text-base text-gray-700 font-semibold">매출/지출 관리, 세금 신고, 세무사 연결 가이드</div>
      ),
    },
    {
      key: 'final',
      title: '최종 분석 결과',
      icon: '🏁',
      content: (data: any) => (
        <div className="mb-4 p-4 bg-orange-50 rounded-xl text-gray-800 border-l-4 border-orange-400 shadow-sm">
          <span className="font-bold text-orange-600">AI 코치:</span> 셀러님의 사업 여정, 정말 멋지게 준비되고 있어요! 마지막으로 전체 종합 진단과 앞으로의 추천 전략을 안내드릴게요.
        </div>
      ),
    },
  ];
  const lastStep = analysisSteps.length - 1;
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-extrabold mb-2 text-center text-orange-600 drop-shadow">AI 10단계 사업분석</h1>
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {analysisSteps.map((s, idx) => (
          <button
            key={s.key}
            onClick={() => setStep(idx)}
            className={
              `px-4 py-2 rounded-full font-semibold border transition ` +
              (step === idx
                ? 'bg-orange-500 text-white border-orange-500 shadow'
                : 'bg-white text-orange-500 border-orange-200 hover:bg-orange-100')
            }
          >
            {idx === 0 ? '최종 분석 요약'
              : idx === lastStep ? '최종 분석 상세'
              : s.title.replace(/ 분석$/, '')}
          </button>
        ))}
      </div>
      <div className="bg-white/90 p-8 rounded-2xl shadow-xl border border-orange-100">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{analysisSteps[step].icon}</span>
          <span className="font-bold text-xl text-gray-800">{analysisSteps[step].title}</span>
        </div>
        <div className="mb-6">
          {analysisSteps[step].content(analysisData?.[analysisSteps[step].key])}
        </div>
      </div>
    </div>
  );
} 