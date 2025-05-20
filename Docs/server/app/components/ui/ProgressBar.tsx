interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
    const progress = Math.round((currentStep / totalSteps) * 100);

    return (
        <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">분석 진행 중...</span>
                <span className="text-sm text-gray-500">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className="bg-[#FF6B00] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
} 