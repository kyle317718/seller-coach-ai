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

export default function AnalysisResult({ result, onRetry, onPdf, onReset }: Props) {
  const [step, setStep] = useState(0);
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

  // 자동 요약 화면: step이 0일 때만 요약 전체 화면 표시
  if (step === 0) {
    return (
      <div className="min-h-screen bg-indigo-50 py-12 px-4 w-full">
        {/* 상단 타이틀 */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">AI 분석 결과</h1>
          <div className="text-lg text-gray-600">검색어: <b>{result.name || result.title || '-'}</b></div>
        </div>
        {/* 단계/탭 */}
        <div className="flex justify-between items-center w-full mb-8" style={{maxWidth:'100%'}}>
          <span className="text-sm text-gray-500">1 / 12 단계</span>
          <span className="text-indigo-700 font-bold bg-indigo-50 px-4 py-1 rounded">AI 분석 전체 요약</span>
        </div>
        {/* 카드형 레이아웃 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-10">
          <div className="bg-white rounded-2xl shadow-lg p-10 min-h-[340px] flex flex-col justify-center w-full">
            <div className="font-bold mb-4 text-lg">시장 성장 추이</div>
            <Bar data={result.market?.chartData || defaultBarData} />
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-10 min-h-[340px] flex flex-col justify-center w-full">
            <div className="font-bold mb-4 text-lg">경쟁사 비교</div>
            <Doughnut data={result.competitor?.chartData || defaultDoughnutData} />
          </div>
        </div>
        {/* 요약 박스 */}
        <div className="w-full mt-8 p-8 bg-orange-50 border-l-4 border-orange-400 rounded-xl text-base text-gray-800">
          <div className="font-bold text-orange-600 mb-3 text-lg">AI 분석 전체 요약</div>
          <div className="mb-1"><b>강점:</b> {`시장 성장률: ${safe(result.market?.growthRate, '25')}%, TAM: ${safe(result.market?.tam, '1조 2,000억원')} / 주요 경쟁사: ${safe(result.competitor?.main, 'A사, B사, C사')} / 타겟: ${safe(result.target?.main, '20~30대 여성')} (${safe(result.target?.feature, '온라인 쇼핑 선호, 트렌드 민감')}) / 트렌드: ${safe(result.trend?.trend, '친환경, 미니멀리즘')} (${safe(result.trend?.change, '최근 2년간 40% 증가')})`}</div>
          <div className="mb-1"><b>약점/보완점:</b> {`리스크: ${safe(result.risk?.main, '원자재 가격 변동, 공급망 불안')} / 상세페이지 개선: ${safe(result.detailPage?.improve, '고객 후기 강화, 상세 이미지 추가')}`}</div>
          <div className="mb-1"><b>시장 기회:</b> {safe(result.trend?.trend, '친환경, 미니멀리즘')}</div>
          <div className="mb-1"><b>주요 리스크:</b> {safe(result.risk?.main, '원자재 가격 변동, 공급망 불안')}</div>
          <div><b>실전 조언:</b> {`마케팅: ${safe(result.marketing?.main, 'SNS 인플루언서 마케팅, 검색광고')} / 채널: ${safe(result.marketing?.channel, '인스타그램, 네이버, 유튜브')} / 상세페이지: ${safe(result.detailPage?.key, '상세 이미지, 구매 후기, Q&A')} / 9단계: ${safe(result.step9?.summary, '9단계 요약')} / 10단계: ${safe(result.step10?.summary, '10단계 요약')}`}</div>
        </div>
      </div>
    );
  }

  // 기존 단계별 상세 분석 화면 (step > 0)
  const isFirst = step === 0;
  const isLast = step === steps.length - 1;
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center drop-shadow">AI 단계별 분석 결과</h2>
      <div className="mb-4 text-center text-lg text-gray-600">검색어: <b>{result.name || result.title || '-'}</b></div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">{step + 1} / {steps.length} 단계</span>
        <div className="flex gap-2">
          <button onClick={() => setStep(step - 1)} disabled={isFirst} className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50">이전</button>
          <button onClick={() => setStep(step + 1)} disabled={isLast} className="px-3 py-1 rounded bg-indigo-600 text-white disabled:opacity-50">다음</button>
        </div>
      </div>
      <section className="bg-white rounded-xl shadow p-6 mb-4">
        <h3 className="text-xl font-bold mb-2 text-indigo-700">{steps[step].label}</h3>
        <div className="mb-2 text-gray-500 text-sm">실전 팁: {steps[step].tip}</div>
        {getStepContent(step, result, salesMethod, setSalesMethod)}
      </section>
      <div className="flex justify-center gap-4 mt-8">
        <button onClick={onPdf} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">PDF 저장</button>
        <button onClick={onReset} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">다시 분석</button>
      </div>
    </div>
  );
}