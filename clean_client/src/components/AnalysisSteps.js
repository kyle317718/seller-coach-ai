import React, { useState } from 'react';

const AnalysisSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < 3) { // 0~3단계 가정
      setCurrentStep(currentStep + 1);
    } else {
      alert("분석 완료!");
    }
  };

  return (
    <button 
      onClick={nextStep}
      className="nav-button"
    >
      {currentStep === 3 ? "분석 완료" : "다음 단계"}
    </button>
  );
};

export default AnalysisSteps;
