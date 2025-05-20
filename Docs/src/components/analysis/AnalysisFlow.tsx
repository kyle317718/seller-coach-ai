import { useState } from 'react';
import { useDeepSeek } from '@/hooks/useDeepSeek';
// STEP 목록과 StepCard, CurrentStepResult 컴포넌트는 실제 구현에 맞게 import 필요
// import { STEPS } from '@/data/analysisSteps';
// import StepCard from './StepCard';
// import CurrentStepResult from './CurrentStepResult';

const AnalysisFlow = () => {
  const { analyze, isLoading } = useDeepSeek();
  const [results, setResults] = useState<Record<number, any>>({});
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleStepComplete = async (stepId: number, inputData: any) => {
    const analysis = await analyze(stepId, inputData);
    setResults(prev => ({ ...prev, [stepId]: analysis }));
  };

  const saveToPdf = (results: Record<number, any>) => {
    // TODO: PDF 저장 로직 구현
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* 왼쪽 - 단계 선택 */}
      <div className="md:col-span-1">
        {/* {STEPS.map(step => (
          <StepCard 
            key={step.id}
            step={step}
            isCompleted={!!results[step.id]}
            onClick={() => setCurrentStep(step.id)}
          />
        ))} */}
      </div>
      
      {/* 오른쪽 - 분석 결과 */}
      <div className="md:col-span-2">
        {/* <CurrentStepResult 
          data={results[currentStep]} 
          onSave={() => saveToPdf(results)}
        /> */}
      </div>
    </div>
  );
};

export default AnalysisFlow;
