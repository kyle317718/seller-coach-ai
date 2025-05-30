import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const percent = Math.round((currentStep / totalSteps) * 100);
  return (
    <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
      <div
        className="bg-orange-500 h-3 rounded-full transition-all duration-500"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
