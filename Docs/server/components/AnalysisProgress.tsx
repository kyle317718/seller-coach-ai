'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export interface AnalysisStep {
    id: number;
    title: string;
    description: string;
    path: string;
    isCompleted: boolean;
}

export const ANALYSIS_STEPS: AnalysisStep[] = [
    {
        id: 1,
        title: '트렌드 분석',
        description: '현재 시장 트렌드와 소비자 선호도를 분석합니다.',
        path: '/analysis/trend',
        isCompleted: false,
    },
    {
        id: 2,
        title: '시장성 평가',
        description: '시장 규모와 성장 가능성을 평가합니다.',
        path: '/analysis/market',
        isCompleted: false,
    },
    {
        id: 3,
        title: '경쟁사 분석',
        description: '주요 경쟁사의 강점과 약점을 분석합니다.',
        path: '/analysis/competition',
        isCompleted: false,
    },
    {
        id: 4,
        title: '타겟 고객 분석',
        description: '잠재 고객층의 특성과 니즈를 파악합니다.',
        path: '/analysis/target',
        isCompleted: false,
    },
    {
        id: 5,
        title: '가격 전략',
        description: '최적의 가격 전략을 도출합니다.',
        path: '/analysis/pricing',
        isCompleted: false,
    },
    {
        id: 6,
        title: '마케팅 전략',
        description: '효과적인 마케팅 채널과 방법을 제시합니다.',
        path: '/analysis/marketing',
        isCompleted: false,
    },
    {
        id: 7,
        title: '리스크 분석',
        description: '잠재적 위험 요소를 분석하고 대응 방안을 제시합니다.',
        path: '/analysis/risk',
        isCompleted: false,
    },
    {
        id: 8,
        title: '최종 보고서',
        description: '종합적인 분석 결과와 권장사항을 제시합니다.',
        path: '/analysis/report',
        isCompleted: false,
    },
];

interface AnalysisProgressProps {
    currentStep: number;
}

export default function AnalysisProgress({ currentStep }: AnalysisProgressProps) {
    const router = useRouter();

    return (
        <div className="w-64 min-h-screen bg-gray-50 border-r border-gray-200 p-4">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900">분석 진행 상태</h2>
                <p className="text-sm text-gray-600">현재 단계: {currentStep}/8</p>
            </div>

            <nav className="space-y-2">
                {ANALYSIS_STEPS.map((step) => {
                    const isActive = step.id === currentStep;
                    const isPast = step.id < currentStep;

                    return (
                        <Link
                            key={step.id}
                            href={step.path}
                            className={`
                block p-3 rounded-lg transition-all duration-200
                ${isActive ? 'bg-blue-50 border-blue-500 border text-blue-700' :
                                    isPast ? 'bg-green-50 text-green-700' : 'hover:bg-gray-100'}
              `}
                        >
                            <div className="flex items-center">
                                <div className={`
                  w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm
                  ${isActive ? 'bg-blue-100 text-blue-700' :
                                        isPast ? 'bg-green-100 text-green-700' : 'bg-gray-200'}
                `}>
                                    {step.id}
                                </div>
                                <div>
                                    <div className="font-medium">{step.title}</div>
                                    <p className="text-xs text-gray-500">{step.description}</p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
} 