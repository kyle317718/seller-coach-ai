import React, { useState, useEffect } from 'react';
import '@/chartjs-setup';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import AnalysisNavBar from './AnalysisNavBar';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

interface Props {
  result: any;
  onRetry: () => void;
  onPdf: () => void;
  onReset: () => void;
}

const steps = [
  { key: 'market', label: '시장 분석', tip: '시장 규모와 성장률을 확인하세요.' },
  { key: 'pricing', label: '가격 분석', tip: '적정가와 가격 범위를 참고하세요.' },
  { key: 'competitor', label: '경쟁사 분석', tip: '주요 경쟁사와 경쟁 수준을 파악하세요.' },
  { key: 'target', label: '타겟 분석', tip: '주요 타겟과 특징을 분석하세요.' },
  { key: 'trend', label: '트렌드 분석', tip: '트렌드와 변화를 주목하세요.' },
  { key: 'risk', label: '리스크 분석', tip: '주요 리스크와 대응 전략을 확인하세요.' },
  { key: 'detailPage', label: '상세페이지', tip: '상세페이지의 핵심과 개선점을 점검하세요.' },
  { key: 'marketing', label: '마케팅', tip: '주요 마케팅 전략과 채널을 확인하세요.' },
  { key: 'logistics', label: '물류/공급망', tip: '물류 및 공급망 이슈를 점검하세요.' },
  { key: 'patent', label: '특허/규제', tip: '특허 및 규제 사항을 확인하세요.' },
  { key: 'summary', label: '전체 요약', tip: '전체 분석 내용을 요약합니다.' },
  { key: 'final', label: '최종 상세 분석', tip: '최종 상세 분석 결과를 확인하세요.' },
  { key: 'strategy', label: '전략 분석', tip: '판매 방식에 따른 전략을 분석하세요.' },
];

// 판매 방식 선택 컴포넌트
function SalesMethodSelector({
  value,
  onChange,
}: {
  value: 'consignment' | 'direct';
  onChange: (method: 'consignment' | 'direct') => void;
}) {
  return (
    <div className="flex gap-4">
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="salesMethod"
          value="consignment"
          checked={value === 'consignment'}
          onChange={() => onChange('consignment')}
        />
        위탁 판매
      </label>
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="salesMethod"
          value="direct"
          checked={value === 'direct'}
          onChange={() => onChange('direct')}
        />
        직접 판매
      </label>
    </div>
  );
}

// 특허/규제/세무 안내 컴포넌트
function PatentRegulationTaxInfo() {
  return (
    <ul className="list-disc ml-6 text-gray-700 text-sm">
      <li>특허: 관련 특허 등록 여부, 침해 위험</li>
      <li>규제: 상품별 법적 규제, 인증 필요성</li>
      <li>세무: 부가세, 소득세, 세무 신고 주의사항</li>
    </ul>
  );
}

function getStepContent(
  step: number,
  result: any,
  salesMethod: 'consignment' | 'direct',
  setSalesMethod: (method: 'consignment' | 'direct') => void
) {
  switch (steps[step].key) {
    case 'market':
      return (
        <>
          <div>시장 규모: <b>{result.market?.tam ?? '-'}</b></div>
          <div>성장률: <b>{result.market?.growthRate ?? '-'}</b></div>
        </>
      );
    case 'pricing':
      return (
        <>
          <div>적정가: <b>{result.pricing?.optimal ?? '-'}</b></div>
          <div>가격 범위: <b>{result.pricing?.range ?? '-'}</b></div>
        </>
      );
    case 'competitor':
      return (
        <>
          <div>주요 경쟁사: <b>{result.competitor?.main ?? '-'}</b></div>
          <div>경쟁 수준: <b>{result.competitor?.level ?? '-'}</b></div>
        </>
      );
    case 'target':
      return (
        <>
          <div>주요 타겟: <b>{result.target?.main ?? '-'}</b></div>
          <div>특징: <b>{result.target?.feature ?? '-'}</b></div>
        </>
      );
    case 'trend':
      return (
        <>
          <div>트렌드: <b>{result.trend?.trend ?? '-'}</b></div>
          <div>변화: <b>{result.trend?.change ?? '-'}</b></div>
        </>
      );
    case 'risk':
      return (
        <>
          <div>주요 리스크: <b>{result.risk?.main ?? '-'}</b></div>
          <div>대응 전략: <b>{result.risk?.strategy ?? '-'}</b></div>
        </>
      );
    case 'detailPage':
      return (
        <>
          <div>상세페이지: <b>{result.detailPage?.key ?? '-'}</b></div>
          <div>개선점: <b>{result.detailPage?.improve ?? '-'}</b></div>
        </>
      );
    case 'marketing':
      return (
        <>
          <div>마케팅: <b>{result.marketing?.main ?? '-'}</b></div>
          <div>채널: <b>{result.marketing?.channel ?? '-'}</b></div>
        </>
      );
    case 'logistics':
      return (
        <>
          <div>물류: <b>{result.logistics?.main ?? '-'}</b></div>
          <div>공급망: <b>{result.logistics?.supply ?? '-'}</b></div>
        </>
      );
    case 'patent':
      return (
        <>
          <div>특허: <b>{result.patent?.main ?? '-'}</b></div>
          <div>규제: <b>{result.patent?.regulation ?? '-'}</b></div>
          <div className="mt-4">
            <div className="font-bold mb-2">세무 정보</div>
            <PatentRegulationTaxInfo />
          </div>
        </>
      );
    case 'summary':
      return (
        <>
          <div>전체 요약: <b>{result.step9?.summary ?? '-'}</b></div>
        </>
      );
    case 'final':
      return (
        <>
          <div>최종 상세 분석: <b>{result.step10?.detail ?? '-'}</b></div>
        </>
      );
    case 'strategy':
      return (
        <>
          <div className="mb-2 text-base text-gray-700 font-semibold">
            {salesMethod === 'consignment'
              ? '위탁 판매에 최적화된 전략 안내: 예) 재고 부담 없이 다양한 상품 테스트, 공급처 신뢰성 확보가 중요합니다.'
              : '직접 판매에 최적화된 전략 안내: 예) 마진율 극대화, 자체 브랜드 구축, 재고/물류 관리 역량이 중요합니다.'}
          </div>
        </>
      );
    default:
      return <div>데이터 없음</div>;
  }
}

// 더미 데이터(그래프/요약) - 실제 데이터 없을 때 사용
const defaultBarData = {
  labels: ['2020', '2021', '2022', '2023'],
  datasets: [{ label: '시장 성장', data: [5000, 8000, 12000, 15000], backgroundColor: '#a5b4fc' }]
};
const defaultDoughnutData = {
  labels: ['내 상품', 'A사', 'B사', 'C사'],
  datasets: [{ data: [40, 30, 20, 10], backgroundColor: ['#6366f1', '#fbbf24', '#34d399', '#f87171'] }]
};
const defaultSummary = {
  strength: '시장 성장세가 두드러지고, 내 상품의 가격/경쟁력이 상위권입니다. 상세페이지와 마케팅 준비도 우수합니다.',
  weakness: '경쟁사 분석이 다소 부족하며, 차별화 포인트가 더 명확히 필요합니다.',
  opportunity: '최근 트렌드(예: 친환경, 미니멀리즘)와 연계하면 추가 성장 가능성이 높습니다.',
  risk: '가격 경쟁 심화, 유사 상품 증가, 리뷰 관리 필요.',
  advice: '경쟁사 상세페이지/시장공급벤치마킹과 차별화 포인트 1개 추가, 인플루언서 협업/이벤트로 신뢰도 강화, 가격 정책을 월 1회 점검해 마진율 유지.'
};

// 안전하게 값 또는 더미 반환
const safe = (v: any, fallback: string) => (v === undefined || v === null || v === '') ? fallback : v;

// 안전하게 차트 데이터 반환
function getBarData(data: any) {
  if (!data || !data.labels || !data.datasets) return defaultBarData;
  return data;
}
function getDoughnutData(data: any) {
  if (!data || !data.labels || !data.datasets) return defaultDoughnutData;
  return data;
}

// Chart.js 에러 방어용 fallback 컴포넌트
function SafeChart({ children }: { children: React.ReactNode }) {
  try {
    return <>{children}</>;
  } catch (e) {
    return <div className="text-red-500 text-sm">그래프를 표시할 수 없습니다.</div>;
  }
}

export default function AnalysisResult({ result, onRetry, onPdf, onReset }: Props) {
  const [step, setStep] = useState(1);
  const [salesMethod, setSalesMethod] = useState<'consignment' | 'direct'>('consignment');

  useEffect(() => {
    console.log('result 객체:', result);
  }, [result]);

  if (!result) return <div>결과 없음 (result가 없습니다)</div>;
  if (result.error) {
    return (
      <div>
        <strong>오류 발생: </strong>
        <span>{result.error}</span>
        <button onClick={onRetry}>재시도</button>
      </div>
    );
  }

  // 단계별 정보
  const isFirst = step === 0;
  const isLast = step === steps.length - 1;
  const stepInfo = steps[step];

  // 단계별 그래프 데이터 매핑
  const stepChart: Record<string, React.ReactNode> = {
    market: <SafeChart><Bar data={getBarData(result.market?.chartData)} /></SafeChart>,
    pricing: <SafeChart><Line data={getBarData(result.pricing?.chartData)} /></SafeChart>,
    competitor: <SafeChart><Doughnut data={getDoughnutData(result.competitor?.chartData)} /></SafeChart>,
    target: <SafeChart><Bar data={getBarData(result.target?.chartData)} /></SafeChart>,
    trend: <SafeChart><Line data={getBarData(result.trend?.chartData)} /></SafeChart>,
    risk: <SafeChart><Doughnut data={getDoughnutData(result.risk?.chartData)} /></SafeChart>,
    detailPage: <SafeChart><Bar data={getBarData(result.detailPage?.chartData)} /></SafeChart>,
    marketing: <SafeChart><Doughnut data={getDoughnutData(result.marketing?.chartData)} /></SafeChart>,
    logistics: <SafeChart><Bar data={getBarData(result.logistics?.chartData)} /></SafeChart>,
    patent: <SafeChart><Doughnut data={getDoughnutData(result.patent?.chartData)} /></SafeChart>,
    summary: <SafeChart><Bar data={defaultBarData} /></SafeChart>,
    final: <SafeChart><Line data={defaultBarData} /></SafeChart>,
    strategy: null,
  };

  // 진행 바
  const progress = Math.round(((step + 1) / steps.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-12 px-4 w-full flex flex-col items-center">
      {/* 상단 타이틀 */}
      <div className="w-full max-w-screen-2xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-2 tracking-tight drop-shadow">AI 분석 결과</h1>
        <div className="text-lg text-gray-600">검색어: <b>{result.name || result.title || '-'}</b></div>
      </div>
      {/* 진행 바 */}
      <div className="w-full max-w-screen-2xl mx-auto mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>{step + 1} / {steps.length} 단계</span>
          <span className="font-bold text-indigo-700">{stepInfo.label}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-300">
          <div className="bg-indigo-500 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      {/* 단계별 카드 */}
      <div className="w-full max-w-screen-2xl mx-auto bg-white rounded-2xl shadow-xl px-32 py-20 min-h-[700px] mb-8 flex flex-row gap-4 items-start justify-center">
        {/* 그래프 */}
        <div className="w-1/2 flex flex-col items-center justify-center min-w-[300px]">
          {stepChart[stepInfo.key]}
        </div>
        {/* 내용 */}
        <div className="w-1/2 text-2xl leading-loose">
          <h2 className="text-2xl font-bold text-indigo-700 mb-2 drop-shadow-sm">{stepInfo.label}</h2>
          <div className="mb-2 text-gray-500 text-sm">실전 팁: {stepInfo.tip}</div>
          <div className="mb-4 text-base text-gray-800">
            {getStepContent(step, result, salesMethod, setSalesMethod)}
          </div>
          {/* 더미 인사이트/조언/수치 등 풍부하게 */}
          <div className="mt-4 text-sm text-gray-600">
            <div className="mb-1"><b>인사이트:</b> {safe(result[stepInfo.key]?.insight, '이 단계에서 주목해야 할 핵심 인사이트와 시장 동향, 경쟁사 전략, 트렌드 변화 등을 요약합니다.')}</div>
            <div className="mb-1"><b>실전 조언:</b> {safe(result[stepInfo.key]?.advice, '실제 셀러들이 활용하는 전략, 주의점, 성장 팁 등을 안내합니다.')}</div>
            <div><b>수치/지표:</b> {safe(result[stepInfo.key]?.number, '관련 수치, 성장률, 점유율, 가격대 등')}</div>
          </div>
        </div>
      </div>
      {/* 하단 버튼 */}
      <div className="w-full max-w-screen-2xl mx-auto flex justify-between gap-6 mt-4">
        <button onClick={() => setStep(step - 1)} disabled={isFirst} className="w-1/4 px-8 py-4 rounded-lg bg-gray-200 text-gray-700 text-lg font-semibold hover:bg-gray-300 disabled:opacity-50 transition">이전</button>
        <button onClick={() => setStep(step + 1)} disabled={isLast} className="w-1/4 px-8 py-4 rounded-lg bg-indigo-600 text-white text-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 transition">다음</button>
        <button onClick={onPdf} className="w-1/4 px-8 py-4 bg-orange-500 text-white text-lg rounded-lg hover:bg-orange-600 font-semibold transition">PDF 저장</button>
        <button onClick={onReset} className="w-1/4 px-8 py-4 bg-gray-100 text-gray-800 text-lg rounded-lg hover:bg-gray-200 font-semibold transition">다시 분석</button>
      </div>

    </div>
  );
}