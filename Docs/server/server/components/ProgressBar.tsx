'use client';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
    steps: Array<{
        title: string;
        description?: string;
    }>;
}

const ProgressBar = ({ currentStep, totalSteps, steps }: ProgressBarProps) => {
    return (
        <div className="w-full mb-8">
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">
                    Current Step: {currentStep}/{totalSteps}
                </span>
                <span className="text-sm font-medium text-blue-600">
                    {Math.round((currentStep / totalSteps) * 100)}%
                </span>
            </div>
            <div className="relative">
                <div className="h-2 bg-gray-200 rounded-full">
                    <div
                        className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    />
                </div>
                <div className="flex justify-between mt-4">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${index + 1 === currentStep
                                ? 'bg-blue-600 text-white border-blue-600'
                                : index + 1 < currentStep
                                    ? 'bg-green-500 text-white border-green-500'
                                    : 'bg-white text-gray-400 border-gray-300'
                                }`}>
                                {index + 1 < currentStep ? '✓' : index + 1}
                            </div>
                            <span className="text-xs mt-2 text-gray-500">{step.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProgressBar; 