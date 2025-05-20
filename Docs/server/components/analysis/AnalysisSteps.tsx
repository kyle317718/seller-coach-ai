'use client';

import { useState } from 'react';

interface Step {
    id: number;
    title: string;
    icon: string;
    content: string;
}

interface AnalysisStepsProps {
    data: {
        marketSize: string;
        competition: string;
        targetCustomer: string;
        marketTrends: string;
        pricingStrategy: string;
        salesChannels: string;
        marketingPlan: string;
        riskFactors: string;
    };
}

export function AnalysisSteps({ data }: AnalysisStepsProps) {
    const [openStepId, setOpenStepId] = useState<number | null>(null);

    const steps: Step[] = [
        { id: 1, title: "시장 규모", icon: "📊", content: data.marketSize },
        { id: 2, title: "경쟁 분석", icon: "🥊", content: data.competition },
        { id: 3, title: "타겟 고객", icon: "🎯", content: data.targetCustomer },
        { id: 4, title: "시장 트렌드", icon: "📈", content: data.marketTrends },
        { id: 5, title: "가격 전략", icon: "💰", content: data.pricingStrategy },
        { id: 6, title: "판매 채널", icon: "🏪", content: data.salesChannels },
        { id: 7, title: "마케팅 계획", icon: "📱", content: data.marketingPlan },
        { id: 8, title: "리스크 요인", icon: "⚠️", content: data.riskFactors },
    ];

    const toggleStep = (stepId: number) => {
        setOpenStepId(openStepId === stepId ? null : stepId);
    };

    const [isAllExpanded, setIsAllExpanded] = useState(false);

    const toggleAll = () => {
        setIsAllExpanded(!isAllExpanded);
        setOpenStepId(null);
    };

    return (
        <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">8단계 상세 분석</h2>
                <button
                    onClick={toggleAll}
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                    {isAllExpanded ? '▲ 전체 접기' : '▼ 전체 펼치기'}
                </button>
            </div>
            <ol className="space-y-4">
                {steps.map((step) => (
                    <li
                        key={step.id}
                        className={`border rounded-lg overflow-hidden transition-all duration-200 ${openStepId === step.id || isAllExpanded ? 'bg-white' : 'bg-gray-50'
                            }`}
                        style={{
                            borderLeftWidth: '4px',
                            borderLeftColor: `var(--step-${step.id})`
                        }}
                    >
                        <button
                            onClick={() => toggleStep(step.id)}
                            className="w-full px-4 py-3 flex items-center justify-between text-left"
                        >
                            <div className="flex items-center">
                                <span className="text-2xl mr-3">{step.icon}</span>
                                <h3 className="text-lg font-semibold">
                                    {step.id}. {step.title}
                                </h3>
                            </div>
                            {!isAllExpanded && (
                                <span className="text-gray-500">
                                    {openStepId === step.id ? '▲' : '▼'}
                                </span>
                            )}
                        </button>
                        {(openStepId === step.id || isAllExpanded) && (
                            <div className="px-4 pb-4 pt-2">
                                <p className="text-gray-700 whitespace-pre-line">
                                    {step.content}
                                </p>
                            </div>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
} 