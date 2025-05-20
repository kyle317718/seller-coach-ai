'use client';

import { useAnalysis } from '@/contexts/AnalysisContext';
import { ProgressBar } from './ProgressBar';
import { ReportPreview } from './ReportPreview';
import { AnalysisSteps } from './AnalysisSteps';

const TOTAL_STEPS = 8;
const STEP_NAMES = [
    '트렌드 분석',
    '시장 규모 분석',
    '경쟁사 분석',
    '타겟 시장 분석',
    '가격 전략',
    '마케팅 전략',
    '리스크 분석',
    '최종 보고서'
];

export function AnalysisLayout({ children }: { children: React.ReactNode }) {
    const { state } = useAnalysis();
    const currentStep = Math.floor((state.progress / 100) * TOTAL_STEPS);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header - Progress Status */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        📌 분석 진행 상태
                    </h3>
                    <ProgressBar progress={state.progress} />
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Sidebar - Steps */}
                    <div className="lg:col-span-4">
                        <AnalysisSteps />
                    </div>

                    {/* Right Content - Current Step Analysis */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            {children}
                        </div>

                        {/* Report Preview */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <ReportPreview result={state.result} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 