'use client';

import { AnalysisData } from '@/types/analysis';
import { CheckCircleIcon, ExclamationCircleIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

interface AnalysisSummaryProps {
    data: AnalysisData;
}

const getMarketPotentialColor = (potential: 'high' | 'medium' | 'low'): string => {
    switch (potential) {
        case 'high':
            return 'bg-green-100 text-green-800';
        case 'medium':
            return 'bg-yellow-100 text-yellow-800';
        case 'low':
            return 'bg-red-100 text-red-800';
    }
};

const getMarketPotentialText = (potential: 'high' | 'medium' | 'low'): string => {
    switch (potential) {
        case 'high':
            return '높음';
        case 'medium':
            return '보통';
        case 'low':
            return '낮음';
    }
};

export default function AnalysisSummary({ data }: AnalysisSummaryProps) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
            {/* Product Info */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h3 className="text-sm font-medium text-gray-500">제품명</h3>
                    <p className="mt-1 text-lg font-semibold">{data.productName}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-500">카테고리</h3>
                    <p className="mt-1 text-lg">{data.category}</p>
                </div>
            </div>

            {/* Market Potential */}
            <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">시장 잠재력</h3>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getMarketPotentialColor(data.marketPotential)}`}>
                    {getMarketPotentialText(data.marketPotential)}
                </span>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">주요 강점</h3>
                    <ul className="space-y-2">
                        {data.keyStrengths.map((strength, index) => (
                            <li key={index} className="flex items-start">
                                <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                <span>{strength}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">주요 약점</h3>
                    <ul className="space-y-2">
                        {data.keyWeaknesses.map((weakness, index) => (
                            <li key={index} className="flex items-start">
                                <ExclamationCircleIcon className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                                <span>{weakness}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Recommendations */}
            <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-3">추천 사항</h3>
                <ul className="space-y-3">
                    {data.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start">
                            <ArrowRightIcon className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-blue-900">{recommendation}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
} 