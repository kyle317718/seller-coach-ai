'use client';

interface CustomerInsightsProps {
    insights: {
        purchasePatterns: string[];
        preferences: string[];
        recommendations: string[];
    };
}

export function CustomerInsights({ insights }: CustomerInsightsProps) {
    return (
        <div className="space-y-6">
            <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">구매 패턴</h3>
                <ul className="space-y-2">
                    {insights.purchasePatterns.map((pattern, index) => (
                        <li key={index} className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            <span className="text-blue-700">{pattern}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="text-lg font-semibold text-green-700 mb-2">선호도</h3>
                <ul className="space-y-2">
                    {insights.preferences.map((preference, index) => (
                        <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span className="text-green-700">{preference}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-700 mb-2">추천 사항</h3>
                <ul className="space-y-2">
                    {insights.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start">
                            <span className="text-purple-500 mr-2">•</span>
                            <span className="text-purple-700">{recommendation}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
} 