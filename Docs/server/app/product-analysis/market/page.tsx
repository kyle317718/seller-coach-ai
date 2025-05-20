'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { commonStyles } from '@/app/components/ui/common-styles';
import { ProgressBar } from '@/app/components/ui/ProgressBar';
import { ANALYSIS_ICONS, SECTION_ICONS, Icon } from '@/app/constants/icons';
import { generatePDF } from '@/app/utils/pdf';
import { storage } from '@/app/utils/storage';

export default function MarketAnalysisPage() {
    const [analysisData, setAnalysisData] = useState({
        tam: '1조 2,000억 원',
        sam: '3,500억 원',
        currentStep: 2,
    });

    // 데이터 자동 저장
    useEffect(() => {
        const loadData = async () => {
            const savedData = await storage.getItem<typeof analysisData>('marketAnalysisData');
            if (savedData) {
                setAnalysisData(savedData);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        storage.setItem('marketAnalysisData', analysisData);
    }, [analysisData]);

    const handleGeneratePDF = async () => {
        const success = await generatePDF('market-analysis-content', {
            filename: '시장분석_리포트.pdf',
            resolution: 300
        });

        if (success) {
            // TODO: 성공 토스트 메시지 표시
            console.log('PDF 생성 완료');
        } else {
            // TODO: 실패 토스트 메시지 표시
            console.error('PDF 생성 실패');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <Header />
            <main className={commonStyles.container}>
                <ProgressBar currentStep={analysisData.currentStep} totalSteps={6} />

                <div id="market-analysis-content">
                    <h1 className={commonStyles.heading.h1}>
                        <Icon icon={ANALYSIS_ICONS.market} label="시장 분석" />
                        <span>시장 분석</span>
                    </h1>

                    <div className="space-y-8">
                        <section className={`${commonStyles.card} p-6`}>
                            <h2 className={commonStyles.heading.h2}>
                                <Icon icon={SECTION_ICONS.market.size} label="시장 규모 분석" />
                                <span>시장 규모 분석</span>
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className={commonStyles.heading.h3}>TAM (전체 시장)</h3>
                                    <p className={commonStyles.text.regular}>{analysisData.tam}</p>
                                </div>
                                <div>
                                    <h3 className={commonStyles.heading.h3}>SAM (접근 가능 시장)</h3>
                                    <p className={commonStyles.text.regular}>{analysisData.sam}</p>
                                </div>
                            </div>
                        </section>

                        <div className="flex flex-col md:flex-row gap-4">
                            <button
                                onClick={handleGeneratePDF}
                                className={commonStyles.button.primary}
                            >
                                PDF로 저장
                            </button>
                            <button
                                className={commonStyles.button.secondary}
                            >
                                분석 다시하기
                            </button>
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm">
                    <div className={`${commonStyles.trustBadge} bg-blue-50`}>
                        <Icon icon="🔒" label="안전한 분석" />
                        <span className="text-blue-700">안전한 분석</span>
                    </div>
                    <div className={`${commonStyles.trustBadge} bg-green-50`}>
                        <Icon icon="📌" label="2024년 데이터" />
                        <span className="text-green-700">2024년 데이터</span>
                    </div>
                    <div className={`${commonStyles.trustBadge} bg-purple-50`}>
                        <Icon icon="🤖" label="AI 정확도" />
                        <span className="text-purple-700">AI 정확도 89%</span>
                    </div>
                </div>
            </main>
        </div>
    );
}