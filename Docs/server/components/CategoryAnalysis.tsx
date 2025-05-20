import React from 'react';

interface CategoryAnalysisProps {
    category: string;
    metrics: Array<{
        label: string;
        value: string | number;
    }>;
    insights: string[];
}

export function CategoryAnalysis({ category, metrics, insights }: CategoryAnalysisProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {metrics.map((metric, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">{metric.label}</div>
                        <div className="mt-1 text-lg font-semibold">{metric.value}</div>
                    </div>
                ))}
            </div>
            
            <div>
                <h4 className="font-medium mb-3">주요 인사이트</h4>
                <ul className="space-y-2">
                    {insights.map((insight, index) => (
                        <li 
                            key={index}
                            className="flex items-start"
                        >
                            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-2">
                                {index + 1}
                            </span>
                            <span className="text-gray-700">{insight}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
} 