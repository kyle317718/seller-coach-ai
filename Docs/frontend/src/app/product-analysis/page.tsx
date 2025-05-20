import { AnalysisForm, AnalysisSteps, ResultView } from "@/components";

export default function ProductAnalysis() {
  return (
    <div className="container mx-auto">
      <AnalysisSteps currentStep={1} />
      <AnalysisForm />
      <ResultView />
    </div>
  );
}
