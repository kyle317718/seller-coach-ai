import React from 'react';
import { AnalysisAccordion } from './AnalysisAccordion';
import { CategoryAnalysis } from './CategoryAnalysis';

interface AnalysisResultsProps {
    productName: string;
    category: string;
    results: {
        category: {
            metrics: Array<{
                label: string;
                value: string | number;
            }>;
            insights: string[];
        };
        pricing: {
            recommendation: string;
            analysis: string[];
        };
        market: {
            trends: string[];
            opportunities: string[];
        };
    };
}

export function AnalysisResults({ productName, category, results }: AnalysisResultsProps) {
    const sections = [
        {
            title: '카테고리 분석',
            content: (
                <CategoryAnalysis
                    category={category}
                    metrics={results.category.metrics}
                    insights={results.category.insights}
                />
            )
        },
        {
            title: '가격 분석',
            content: (
                <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-900">추천 가격대</h4>
                        <p className="mt-1 text-blue-700">{results.pricing.recommendation}</p>
                    </div>
                    <div>
                        <h4 className="font-medium mb-2">상세 분석</h4>
                        <ul className="list-disc pl-5 space-y-2">
                            {results.pricing.analysis.map((item, index) => (
                                <li key={index} className="text-gray-700">{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        },
        {
            title: '시장 분석',
            content: (
                <div className="space-y-6">
                    <div>
                        <h4 className="font-medium mb-2">시장 트렌드</h4>
                        <ul className="list-disc pl-5 space-y-2">
                            {results.market.trends.map((trend, index) => (
                                <li key={index} className="text-gray-700">{trend}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium mb-2">기회 요인</h4>
                        <ul className="list-disc pl-5 space-y-2">
                            {results.market.opportunities.map((opportunity, index) => (
                                <li key={index} className="text-gray-700">{opportunity}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">{productName}</h2>
                <p className="mt-1 text-gray-600">카테고리: {category}</p>
            </div>
            <AnalysisAccordion sections={sections} />
        </div>
    );
} 