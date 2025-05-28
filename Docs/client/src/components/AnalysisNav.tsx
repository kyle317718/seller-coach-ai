import React from 'react';

interface AnalysisNavProps {
  steps: string[];
  currentStep: number;
  onStepChange?: (step: number) => void;
}

const AnalysisNav: React.FC<AnalysisNavProps> = ({ steps, currentStep, onStepChange }) => {
  return (
    <nav className="flex flex-wrap gap-2 mb-6">
      {steps.map((label, idx) => (
        <button
          key={label}
          className={`px-3 py-1 rounded-full text-sm font-semibold border transition-all duration-200 ${
            idx === currentStep
              ? 'bg-orange-500 text-white border-orange-500 shadow'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-orange-50'
          }`}
          onClick={() => onStepChange && onStepChange(idx)}
          disabled={onStepChange == null}
        >
<<<<<<< HEAD
          {label} <span role="img" aria-label="rocket">🚀</span>
=======
          {label}
>>>>>>> 69ed5420 (동기부여 말투 전체 적용 및 UI 개선 (detached HEAD 상태))
        </button>
      ))}
    </nav>
  );
};

export default AnalysisNav;
