'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Tooltip as CustomTooltip } from './Tooltip';
import { ProgressBar } from './ProgressBar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface AnalysisCardProps {
  title: string;
  content?: string;
  currentStep: number;
  totalSteps: number;
  chartData?: Array<{ name: string; value: number }>;
  recommendations?: string[];
  tableData?: {
    marketSize?: { value: string; growth: string };
    competitors?: { count: string; share: string; names: string };
    strategy?: { type: string; budget: string };
  };
  tooltips?: {
    marketSize?: { title: string; content: string[] };
    competitors?: { title: string; content: string[] };
    strategy?: { title: string; content: string[] };
  };
}

const defaultTooltips = {
  marketSize: {
    title: '시장 규모 평가 기준',
    content: [
      '한국생산협회 2024년 데이터 기반',
      '동일 카테고리 평균 성장률과 비교',
      '최근 3년간의 CAGR 반영'
    ]
  },
  competitors: {
    title: '경쟁사 분석 기준',
    content: [
      '상위 5개 기업 기준',
      '시장 점유율은 매출액 기준',
      '온라인/오프라인 채널 통합'
    ]
  },
  strategy: {
    title: '추천 전략 도출 기준',
    content: [
      'AI 기반 시장 트렌드 분석',
      '경쟁사 전략 벤치마킹',
      'ROI 시뮬레이션 결과'
    ]
  }
};

export function AnalysisCard({
  title,
  content,
  currentStep,
  totalSteps,
  chartData,
  recommendations,
  tableData,
  tooltips = defaultTooltips
}: AnalysisCardProps) {
  const progress = (currentStep / totalSteps) * 100;
  const stepNames = ['트렌드 분석', '시장 규모', '경쟁사 분석', '타겟 시장', '마케팅 전략', '가격 전략', '유통 전략', '실행 계획'];

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '검색량'
        }
      }
    }
  };

  const chartConfig = chartData ? {
    labels: chartData.map(item => item.name),
    datasets: [
      {
        label: '검색량 추이',
        data: chartData.map(item => item.value),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4
      }
    ]
  } : null;

  return (
    <div className="space-y-6 bg-white rounded-lg shadow-lg p-6">
      {/* Header Section */}
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">📊 분석 진행 상태</h1>
        <div className="mb-4">
          <ProgressBar
            progress={progress}
            currentStep={stepNames[currentStep - 1]}
          />
        </div>
        <h2 className="text-xl font-semibold text-blue-600">{title}</h2>
        {content && <p className="mt-2 text-gray-600">{content}</p>}
      </div>

      {/* Chart Section */}
      {chartData && chartConfig && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 최근 3개월 검색량 추이</h3>
          <div className="h-80">
            <Line options={chartOptions} data={chartConfig} />
          </div>
        </div>
      )}

      {/* Data Table */}
      {tableData && (
        <div className="bg-white rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 분석 결과</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="bg-white divide-y divide-gray-200">
                {tableData.marketSize && (
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <CustomTooltip
                        title={tooltips.marketSize?.title || ''}
                        content={tooltips.marketSize?.content || []}
                      >
                        시장 규모
                      </CustomTooltip>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {tableData.marketSize.value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      전년 대비 {tableData.marketSize.growth}
                    </td>
                  </tr>
                )}
                {tableData.competitors && (
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <CustomTooltip
                        title={tooltips.competitors?.title || ''}
                        content={tooltips.competitors?.content || []}
                      >
                        경쟁 강도
                      </CustomTooltip>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {tableData.competitors.count}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      시장 점유율 {tableData.competitors.share}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 다음 단계</h3>
          <ul className="space-y-2">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span className="text-blue-800">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 