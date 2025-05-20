import React from 'react';

interface StatCardProps {
    title: string;
    value: string;
    delta?: string;
}

const StatCard = ({ title, value, delta }: StatCardProps) => (
    <div className="bg-white p-4 rounded-lg shadow-sm">
        <h4 className="text-sm text-gray-600">{title}</h4>
        <div className="flex items-baseline mt-1">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {delta && (
                <span className={`ml-2 text-sm ${delta.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {delta}
                </span>
            )}
        </div>
    </div>
);

interface SummarySectionProps {
    marketSize: string;
    recommendedPrice: string;
    profitMargin: string;
    summary: string;
}

export function SummarySection({ marketSize, recommendedPrice, profitMargin, summary }: SummarySectionProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">🔍 한눈에 보는 핵심 분석</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <StatCard title="시장 규모" value={marketSize} delta="+25%" />
                <StatCard title="추천 가격" value={recommendedPrice} />
                <StatCard title="예상 마진" value={profitMargin} />
            </div>
            <p className="text-gray-600 mt-4">{summary}</p>
        </div>
    );
} 