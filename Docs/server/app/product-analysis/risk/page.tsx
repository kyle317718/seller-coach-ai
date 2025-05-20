'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { commonStyles } from '@/app/components/ui/common-styles';

export default function RiskAnalysisPage() {
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

                <h1 className={commonStyles.heading.h1}>리스크 분석</h1>

                <div className="space-y-8">
                    {/* 시장 진입 리스크 */}
                    <section className={`${commonStyles.card} p-6`}>
                        <h2 className={commonStyles.heading.h2}>시장 진입 리스크</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className={commonStyles.heading.h3}>경쟁 강도</h3>
                                <p className={commonStyles.text.regular}>
                                    현재 시장의 경쟁 상황과 진입 장벽을 분석합니다.
                                </p>
                            </div>
                            <div>
                                <h3 className={commonStyles.heading.h3}>규제 환경</h3>
                                <p className={commonStyles.text.regular}>
                                    관련 법규 및 규제 요소를 검토합니다.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 운영 리스크 */}
                    <section className={`${commonStyles.card} p-6`}>
                        <h2 className={commonStyles.heading.h2}>운영 리스크</h2>
                        <p className={commonStyles.text.regular}>
                            제품/서비스 운영 과정에서 발생할 수 있는 위험 요소를 분석합니다.
                        </p>
                    </section>

                    {/* 재무 리스크 */}
                    <section className={`${commonStyles.card} p-6`}>
                        <h2 className={commonStyles.heading.h2}>재무 리스크</h2>
                        <p className={commonStyles.text.regular}>
                            초기 투자 비용과 예상 수익성을 고려한 재무적 위험을 평가합니다.
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