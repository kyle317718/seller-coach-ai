'use client';

import { useState } from 'react';
import ProgressBar from './ProgressBar';
import ProductInfoForm from './ProductInfoForm';
import CompetitorAnalysis from './CompetitorAnalysis';

interface AnalysisData {
    productInfo: {
        name: string;
        description: string;
        targetMarket: string;
        price: number;
    };
    competitorAnalysis: {
        competitors: Array<{
            name: string;
            strengths: string[];
            weaknesses: string[];
            marketShare: number;
            pricePoint: number;
        }>;
        differentiators: string[];
    };
}

const steps = [
    {
        title: '제품 정보 입력',
        description: '제품의 기본 정보를 입력해주세요.',
        component: ProductInfoForm
    },
    {
        title: '경쟁사 분석',
        description: '주요 경쟁사 정보를 입력해주세요.',
        component: CompetitorAnalysis
    }
];

export function AnalysisFlow() {
    const [currentStep, setCurrentStep] = useState(0);
    const [analysisData, setAnalysisData] = useState<AnalysisData>({
        productInfo: {
            name: '',
            description: '',
            targetMarket: '',
            price: 0
        },
        competitorAnalysis: {
            competitors: [],
            differentiators: []
        }
    });

    const handleProductInfoSubmit = (data: AnalysisData['productInfo']) => {
        setAnalysisData(prev => ({
            ...prev,
            productInfo: data
        }));
        setCurrentStep(1);
    };

    const handleCompetitorAnalysisSubmit = (data: AnalysisData['competitorAnalysis']) => {
        setAnalysisData(prev => ({
            ...prev,
            competitorAnalysis: data
        }));
        // 다음 단계로 이동하거나 분석 완료 처리
    };

    const CurrentStepComponent = steps[currentStep].component;

    return (
        <div className="space-y-6">
            <ProgressBar
                steps={steps.map(step => step.title)}
                currentStep={currentStep}
            />
            <div className="p-6 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">{steps[currentStep].title}</h2>
                <p className="text-gray-600 mb-6">{steps[currentStep].description}</p>
                {currentStep === 0 ? (
                    <ProductInfoForm
                        initialData={analysisData.productInfo}
                        onSubmit={handleProductInfoSubmit}
                    />
                ) : (
                    <CompetitorAnalysis
                        initialData={analysisData.competitorAnalysis}
                        onSubmit={handleCompetitorAnalysisSubmit}
                    />
                )}
            </div>
        </div>
    );
}

export default AnalysisFlow; 