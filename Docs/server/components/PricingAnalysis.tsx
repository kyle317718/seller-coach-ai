import React from 'react';

interface PriceRange {
    min: number;
    max: number;
    avg: number;
}

interface PricingAnalysisProps {
    currentPrice: number;
    marketPriceRange: PriceRange;
    recommendations: string[];
    trends: Array<{
        period: string;
        trend: 'up' | 'down' | 'stable';
        percentage: number;
    }>;
}

export function PricingAnalysis({
    currentPrice,
    marketPriceRange,
    recommendations,
    trends
}: PricingAnalysisProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ko-KR', {
            style: 'currency',
            currency: 'KRW'
        }).format(price);
    };

    const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
        switch (trend) {
            case 'up':
                return '↑';
            case 'down':
                return '↓';
            case 'stable':
                return '→';
        }
    };

    const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
        switch (trend) {
            case 'up':
                return 'text-red-500';
            case 'down':
                return 'text-green-500';
            case 'stable':
                return 'text-gray-500';
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">현재 가격</div>
                    <div className="mt-1 text-lg font-semibold">{formatPrice(currentPrice)}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">시장 최저가</div>
                    <div className="mt-1 text-lg font-semibold">{formatPrice(marketPriceRange.min)}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">시장 평균가</div>
                    <div className="mt-1 text-lg font-semibold">{formatPrice(marketPriceRange.avg)}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">시장 최고가</div>
                    <div className="mt-1 text-lg font-semibold">{formatPrice(marketPriceRange.max)}</div>
                </div>
            </div>

            <div>
                <h4 className="font-medium mb-3">가격 트렌드</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {trends.map((item, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <span className="text-sm text-gray-500">{item.period}</span>
                            <div className="flex items-center space-x-2">
                                <span className={getTrendColor(item.trend)}>
                                    {getTrendIcon(item.trend)}
                                </span>
                                <span className="font-medium">
                                    {item.percentage}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="font-medium mb-3">가격 전략 추천</h4>
                <ul className="space-y-2">
                    {recommendations.map((recommendation, index) => (
                        <li
                            key={index}
                            className="flex items-start"
                        >
                            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-2">
                                {index + 1}
                            </span>
                            <span className="text-gray-700">{recommendation}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
} 