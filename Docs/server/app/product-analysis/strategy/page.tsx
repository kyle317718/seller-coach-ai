'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

export default function StrategyAnalysisPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAnalysis = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/analyze/strategy', {
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
                <h1 className="text-2xl font-bold mb-6">맞춤형 전략 추천</h1>

                {error && <ErrorMessage message={error} className="mb-6" />}

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-lg font-semibold mb-2">가격 전략</h2>
                            <p className="text-gray-600">최적의 가격대와 프로모션 전략을 제시합니다.</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold mb-2">마케팅 전략</h2>
                            <p className="text-gray-600">효과적인 마케팅 채널과 메시지를 추천합니다.</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold mb-2">판매 전략</h2>
                            <p className="text-gray-600">최적의 판매 채널과 운영 방안을 제안합니다.</p>
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