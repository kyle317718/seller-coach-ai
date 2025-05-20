'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

export default function TrendAnalysisPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAnalysis = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/analyze/trend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // 분석에 필요한 데이터
                }),
            });

            if (!response.ok) {
                throw new Error('분석 중 오류가 발생했습니다.');
            }

            const data = await response.json();
            router.push('/product-analysis/result');
        } catch (err) {
            setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">트렌드 분석</h1>

                {error && <ErrorMessage message={error} className="mb-6" />}

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-lg font-semibold mb-2">실시간 트렌드</h2>
                            <p className="text-gray-600">현재 시장의 주요 트렌드와 소비자 선호도를 분석합니다.</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold mb-2">성장 예측</h2>
                            <p className="text-gray-600">향후 6개월간의 시장 트렌드 변화를 예측합니다.</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold mb-2">연관 키워드</h2>
                            <p className="text-gray-600">주요 연관 키워드와 검색량 추이를 분석합니다.</p>
                        </div>

                        <button
                            onClick={handleAnalysis}
                            disabled={isLoading}
                            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <LoadingSpinner size="sm" className="mr-2" />
                                    <span>분석 중...</span>
                                </div>
                            ) : (
                                '분석 시작'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 