'use client';

import { useState } from 'react';
import { AnalysisResults } from '../../../components/AnalysisResults';

export default function ResultsPage() {
    const [isGeneratingAd, setIsGeneratingAd] = useState(false);

    const mockFeedback = [
        {
            quote: "이 분석으로 첫 달 120만 원 매출 달성!",
            author: "셀러 김** 님"
        },
        {
            quote: "경쟁사 분석이 정확해서 가격 전략 수립이 쉬웠어요",
            author: "셀러 박** 님"
        }
    ];

    const handleGenerateAd = async () => {
        setIsGeneratingAd(true);
        // TODO: Implement ad generation
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsGeneratingAd(false);
    };

    const handleDownloadTemplate = async () => {
        // TODO: Implement template download
        const template = await fetch('/api/templates/product-detail');
        const blob = await template.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '상세페이지_템플릿.psd';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    const handleSetupMonitoring = async () => {
        // TODO: Implement monitoring setup
        window.location.href = '/monitoring/setup';
    };

    return (
        <AnalysisResults
            monthlyProfit={84}
            profitRate={42}
            actionItems={[
                {
                    icon: "📢",
                    title: "인스타그램 광고 자동 생성",
                    onClick: handleGenerateAd
                },
                {
                    icon: "📦",
                    title: "상세페이지 템플릿 다운로드",
                    onClick: handleDownloadTemplate
                },
                {
                    icon: "🔄",
                    title: "경쟁사 모니터링 설정",
                    onClick: handleSetupMonitoring
                }
            ]}
            feedback={mockFeedback}
            onGenerateAd={handleGenerateAd}
            onDownloadTemplate={handleDownloadTemplate}
            onSetupMonitoring={handleSetupMonitoring}
        />
    );
} 