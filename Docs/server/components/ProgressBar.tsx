'use client';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
    stepTitle: string;
}

export function ProgressBar({ currentStep, totalSteps, stepTitle }: ProgressBarProps) {
    const progress = currentStep === 0 ? 0 : (currentStep / totalSteps) * 100;

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-gray-700">{stepTitle}</span>
                <span className="text-gray-500">{`${Math.round(progress)}%`}</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-orange-500 transition-all duration-500 ease-in-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{`단계 ${currentStep}/${totalSteps}`}</span>
                <span>{currentStep === totalSteps ? '완료' : '진행 중'}</span>
            </div>
        </div>
    );
} 