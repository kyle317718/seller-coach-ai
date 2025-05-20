const steps = [
    '트렌드 분석',
    '시장성 평가',
    '경쟁사 분석',
    '타겟 고객 분석',
    '가격 전략',
    '마케팅 전략',
    '리스크 분석',
    '최종 보고서',
];

export function AnalysisSteps({ analysisState }: any) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-lg font-bold mb-4">분석 단계</h2>
            <ol className="space-y-2">
                {steps.map((step, idx) => (
                    <li key={step} className={`flex items-center gap-2 ${analysisState.step === idx + 1 ? 'font-bold text-orange-600' : ''}`}>
                        <span className={`w-6 h-6 flex items-center justify-center rounded-full border ${analysisState.step > idx + 1 ? 'bg-green-400 text-white' : analysisState.step === idx + 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'}`}>{idx + 1}</span>
                        {step}
                    </li>
                ))}
            </ol>
        </div>
    );
} 