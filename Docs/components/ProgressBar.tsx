export default function ProgressBar({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const percentage = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
      <div 
        className="bg-orange-500 h-4 rounded-full" 
        style={{ width: `${percentage}%` }}
      ></div>
      <p className="text-sm mt-1">{currentStep}/{totalSteps} 단계 완료</p>
    </div>
  );
}
