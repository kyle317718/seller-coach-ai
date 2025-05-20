'use client';

import { useState } from 'react';
import { Card } from './Card';
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface TrendAnalysisProps {
    productName: string;
    onNext: () => void;
}

export const TrendAnalysis = ({ productName, onNext }: TrendAnalysisProps) => {
    const [loading, setLoading] = useState(false);
    const [trendData] = useState({
        labels: ['1월', '2월', '3월'],
        datasets: [
            {
                label: '검색량 추이',
                data: [100, 120, 150],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                tension: 0.4,
            },
        ],
    });

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: `${productName} 검색량 추이`,
                font: {
                    size: 16,
                    family: 'Pretendard',
                    weight: 'bold',
                }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value: number) {
                        return value + '%';
                    }
                }
            }
        },
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Card title="📊 트렌드 분석" showToggle={true}>
                <div className="space-y-6">
                    <div className="p-4 bg-trust-light rounded-lg">
                        <h3 className="font-pretendard text-trust font-bold mb-2">
                            분석 결과
                        </h3>
                        <p className="text-gray-700">
                            최근 3개월간 검색량이 지속적으로 증가하는 추세를 보이고 있으며,
                            특히 3월에는 전월 대비 25% 상승했습니다.
                        </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                        <Line options={options} data={trendData} />
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <span className="inline-block w-3 h-3 bg-primary rounded-full"></span>
                            <span className="text-sm text-gray-600">현재 단계: 트렌드 분석 (2/8)</span>
                        </div>
                        <button
                            onClick={onNext}
                            className="px-6 py-2 bg-primary text-white font-pretendard font-bold rounded-lg hover:bg-primary-hover active:transform active:scale-95 transition-all duration-200"
                        >
                            시장 규모 평가 →
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
}; 