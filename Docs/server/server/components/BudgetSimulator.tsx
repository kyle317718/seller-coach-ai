'use client';

import { useState, useEffect } from 'react';
import { Card } from './Card';

interface BudgetBreakdown {
    production: number;
    marketing: number;
    operation: number;
}

interface MarketingRecommendation {
    platform: string;
    budget: number;
    reason: string;
}

interface BudgetSimulatorProps {
    onSave: (data: {
        totalBudget: number;
        breakdown: BudgetBreakdown;
        recommendations: MarketingRecommendation[];
        monthlyProfit: number;
    }) => void;
    initialBudget?: number;
    productCategory?: string;
}

const BudgetSimulator = ({
    onSave,
    initialBudget = 1000000,
    productCategory = '일반'
}: BudgetSimulatorProps) => {
    const [totalBudget, setTotalBudget] = useState(initialBudget);
    const [breakdown, setBreakdown] = useState<BudgetBreakdown>({
        production: 0,
        marketing: 0,
        operation: 0
    });
    const [monthlyProfit, setMonthlyProfit] = useState(0);
    const [recommendations, setRecommendations] = useState<MarketingRecommendation[]>([]);

    const calculateBreakdown = (budget: number) => {
        // 기본 비율: 제작비 50%, 마케팅 30%, 운영비 20%
        return {
            production: Math.round(budget * 0.5),
            marketing: Math.round(budget * 0.3),
            operation: Math.round(budget * 0.2)
        };
    };

    const calculateMonthlyProfit = (budget: number) => {
        // 예상 수익률 42% (예시)
        const expectedRevenueMultiplier = 1.42;
        const expectedRevenue = budget * expectedRevenueMultiplier;
        return Math.round(expectedRevenue - budget);
    };

    const generateMarketingRecommendations = (marketingBudget: number, category: string) => {
        // 실제로는 AI API를 호출하여 추천을 받아올 수 있습니다
        const recommendations: MarketingRecommendation[] = [];

        if (category === '패션의류' || category === '뷰티') {
            recommendations.push({
                platform: 'Instagram',
                budget: Math.round(marketingBudget * 0.5),
                reason: '타겟 연령층의 주 활동 플랫폼이며, 비주얼 중심 마케팅에 최적화되어 있습니다.'
            });
            recommendations.push({
                platform: 'Facebook',
                budget: Math.round(marketingBudget * 0.3),
                reason: '상세한 타겟팅과 리마케팅이 가능합니다.'
            });
        } else {
            recommendations.push({
                platform: 'Google Ads',
                budget: Math.round(marketingBudget * 0.4),
                reason: '검색 의도가 명확한 고객 타겟팅이 가능합니다.'
            });
            recommendations.push({
                platform: 'Naver Blog',
                budget: Math.round(marketingBudget * 0.4),
                reason: '상세한 제품 정보 전달과 신뢰도 구축에 효과적입니다.'
            });
        }

        return recommendations;
    };

    useEffect(() => {
        const newBreakdown = calculateBreakdown(totalBudget);
        const newMonthlyProfit = calculateMonthlyProfit(totalBudget);
        setBreakdown(newBreakdown);
        setMonthlyProfit(newMonthlyProfit);
        const newRecommendations = generateMarketingRecommendations(newBreakdown.marketing, productCategory);
        setRecommendations(newRecommendations);
    }, [totalBudget, productCategory]);

    const handleSave = () => {
        onSave({ totalBudget, breakdown, recommendations, monthlyProfit });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('ko-KR', {
            style: 'currency',
            currency: 'KRW'
        }).format(amount);
    };

    return (
        <Card title="💰 예산 시뮬레이터" showToggle={true}>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        총 예산 설정
                    </label>
                    <div className="flex items-center space-x-4">
                        <input
                            type="range"
                            value={totalBudget}
                            onChange={(e) => setTotalBudget(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                            min="100000"
                            max="10000000"
                            step="100000"
                        />
                        <span className="text-lg font-pretendard font-bold text-primary whitespace-nowrap">
                            {formatCurrency(totalBudget)}
                        </span>
                    </div>
                </div>

                <div className="bg-trust-light rounded-lg p-4">
                    <h3 className="font-pretendard text-trust font-bold mb-4">예산 분배 분석</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">제작비 (50%)</span>
                                <span className="text-sm font-bold text-trust">{formatCurrency(breakdown.production)}</span>
                            </div>
                            <div className="w-full bg-white rounded-full h-2">
                                <div className="bg-trust h-2 rounded-full" style={{ width: '50%' }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">마케팅비 (30%)</span>
                                <span className="text-sm font-bold text-primary">{formatCurrency(breakdown.marketing)}</span>
                            </div>
                            <div className="w-full bg-white rounded-full h-2">
                                <div className="bg-primary h-2 rounded-full" style={{ width: '30%' }}></div>
                            </div>
                            <div className="mt-2 pl-4 border-l-2 border-primary">
                                {recommendations.map((rec, index) => (
                                    <div key={index} className="text-sm text-gray-600 mb-2">
                                        <span className="font-medium text-primary">{rec.platform}</span>: {formatCurrency(rec.budget)}
                                        <p className="text-xs text-gray-500 mt-1">{rec.reason}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">예비비 (20%)</span>
                                <span className="text-sm font-bold text-gray-600">{formatCurrency(breakdown.operation)}</span>
                            </div>
                            <div className="w-full bg-white rounded-full h-2">
                                <div className="bg-gray-400 h-2 rounded-full" style={{ width: '20%' }}></div>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700">예상 월 순익</span>
                                <span className="text-lg font-bold text-green-600">{formatCurrency(monthlyProfit)}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                * 예상 수익률 42% 기준
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-primary text-white font-pretendard font-bold rounded-lg hover:bg-primary-hover active:transform active:scale-95 transition-all duration-200"
                    >
                        예산 계획 저장
                    </button>
                </div>
            </div>
        </Card>
    );
};

export default BudgetSimulator; 