'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { commonStyles } from '@/app/components/ui/common-styles';

export default function TargetAnalysisPage() {
    const [progress, setProgress] = useState(1);
    const totalSteps = 8;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <Header />
            <main className={commonStyles.container}>
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <span className={commonStyles.text.small}>분석 진행 중...</span>
                        <span className={commonStyles.text.small}>{Math.round((progress / totalSteps) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-[#FF6B00] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(progress / totalSteps) * 100}%` }}
                        />
                    </div>
                </div>

                <h1 className={commonStyles.heading.h1}>타겟 분석</h1>

                <div className="space-y-8">
                    {/* 구매자 페르소나 */}
                    <section className={`${commonStyles.card} p-6`}>
                        <h2 className={commonStyles.heading.h2}>구매자 페르소나</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className={commonStyles.heading.h3}>주요 고객층</h3>
                                <p className={commonStyles.text.regular}>
                                    제품/서비스의 핵심 구매자 그룹을 정의합니다.
                                </p>
                            </div>
                            <div>
                                <h3 className={commonStyles.heading.h3}>구매 동기</h3>
                                <p className={commonStyles.text.regular}>
                                    고객이 제품/서비스를 구매하는 주요 이유를 분석합니다.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 구매 행동 분석 */}
                    <section className={`${commonStyles.card} p-6`}>
                        <h2 className={commonStyles.heading.h2}>구매 행동 분석</h2>
                        <p className={commonStyles.text.regular}>
                            구매 결정 과정과 주요 고려 사항을 분석합니다.
                        </p>
                    </section>

                    {/* 고객 니즈 분석 */}
                    <section className={`${commonStyles.card} p-6`}>
                        <h2 className={commonStyles.heading.h2}>고객 니즈 분석</h2>
                        <p className={commonStyles.text.regular}>
                            잠재 고객의 주요 니즈와 페인 포인트를 도출합니다.
                        </p>
                    </section>
                </div>

                {/* Trust Badges */}
                <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm sm:flex-col">
                    <div className={`${commonStyles.trustBadge} bg-blue-50`}>
                        <span>🔒</span>
                        <span className="text-blue-700">안전한 분석</span>
                    </div>
                    <div className={`${commonStyles.trustBadge} bg-green-50`}>
                        <span>📌</span>
                        <span className="text-green-700">2024년 데이터</span>
                    </div>
                    <div className={`${commonStyles.trustBadge} bg-purple-50`}>
                        <span>🤖</span>
                        <span className="text-purple-700">AI 정확도 89%</span>
                    </div>
                </div>
            </main>
        </div>
    );
} 