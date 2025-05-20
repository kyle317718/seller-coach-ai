'use client';

import { useState, useEffect, Suspense } from 'react';
import { Card } from './Card';
import { MetricBar } from './MetricBar';
import dynamic from 'next/dynamic';

// Lazy load heavy components
const AdPreview = dynamic(() => import('./AdPreview'), {
    loading: () => <div className="animate-pulse bg-gray-200 h-48 rounded-lg" />,
    ssr: false
});

interface ActionItem {
    icon: string;
    title: string;
    onClick: () => void;
}

interface Feedback {
    quote: string;
    author: string;
}

interface AnalysisResultsProps {
    monthlyProfit: number;
    profitRate: number;
    actionItems: ActionItem[];
    feedback: Feedback[];
    onGenerateAd?: () => void;
    onDownloadTemplate?: () => void;
    onSetupMonitoring?: () => void;
}

export const AnalysisResults = ({
    monthlyProfit,
    profitRate,
    actionItems,
    feedback,
    onGenerateAd,
    onDownloadTemplate,
    onSetupMonitoring
}: AnalysisResultsProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [actionStartTime, setActionStartTime] = useState<number | null>(null);

    // Pre-fetch templates and monitoring data
    useEffect(() => {
        const prefetchResources = async () => {
            try {
                // Prefetch template in background
                const templatePrefetch = fetch('/api/templates/product-detail', { priority: 'low' });
                // Prefetch competitor data
                const competitorPrefetch = fetch('/api/competitors?category=반려용품', { priority: 'low' });
                await Promise.all([templatePrefetch, competitorPrefetch]);
            } catch (error) {
                console.error('Prefetch failed:', error);
            }
        };
        prefetchResources();
    }, []);

    const handleAction = async (action: () => void | undefined) => {
        if (!action) return;

        setIsLoading(true);
        setActionStartTime(performance.now());

        try {
            await Promise.race([
                action(),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Action timeout')), 3000)
                )
            ]);
        } catch (error) {
            if (error.message === 'Action timeout') {
                // Show progress instead of error
                console.warn('Action taking longer than expected, showing progress...');
            }
        } finally {
            const endTime = performance.now();
            const duration = endTime - (actionStartTime || endTime);

            // Analytics
            if (window.gtag) {
                window.gtag('event', 'action_performance', {
                    action_type: action.name,
                    duration_ms: duration
                });
            }

            setIsLoading(false);
            setActionStartTime(null);
        }
    };

    // Calculate loading progress
    const getLoadingProgress = () => {
        if (!actionStartTime) return 0;
        const elapsed = performance.now() - actionStartTime;
        return Math.min((elapsed / 3000) * 100, 99); // Never show 100% until complete
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
            {/* Header Section */}
            <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                <div className="p-6 space-y-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-3xl">🎯</span>
                        <h1 className="text-2xl font-pretendard font-bold">분석 완료!</h1>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-100">예상 월 순익</span>
                            <span className="text-xl font-bold">{monthlyProfit.toLocaleString()}만 원</span>
                        </div>
                        <MetricBar
                            label="예산 대비 수익률"
                            value={profitRate}
                            color="success"
                            tooltipContent={`투자 예산 대비 ${profitRate}% 수익률 예상`}
                        />
                    </div>
                </div>
            </Card>

            {/* Action Items */}
            <section className="space-y-4">
                <h2 className="text-xl font-pretendard font-semibold text-gray-900">다음 단계</h2>
                <div className="grid gap-4">
                    {actionItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleAction(item.onClick)}
                            className="group relative flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-indigo-500 transition-all duration-200 transform hover:scale-[1.02]"
                            disabled={isLoading}
                        >
                            <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">{item.icon}</span>
                            <div className="flex-1 text-left">
                                <h3 className="font-pretendard font-medium text-gray-900">{item.title}</h3>
                                <p className="text-sm text-gray-500">클릭 즉시 실행됩니다</p>
                            </div>
                            {isLoading && (
                                <div className="absolute bottom-0 left-0 h-1 bg-indigo-500 transition-all duration-200"
                                    style={{ width: `${getLoadingProgress()}%` }} />
                            )}
                        </button>
                    ))}
                </div>
            </section>

            {/* Feedback Section */}
            <section className="space-y-4">
                <h2 className="text-xl font-pretendard font-semibold text-gray-900">셀러 후기</h2>
                <div className="space-y-4">
                    {feedback.map((item, index) => (
                        <Card key={index} className="bg-gray-50">
                            <div className="p-4">
                                <blockquote className="text-gray-700">{item.quote}</blockquote>
                                <p className="mt-2 text-sm text-gray-500">- {item.author}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Loading Overlay */}
            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <div className="space-y-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto" />
                            <p className="text-sm text-gray-600 text-center">
                                {getLoadingProgress() < 80 ? '처리 중...' : '거의 완료되었습니다...'}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}; 