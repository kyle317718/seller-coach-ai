import { Suspense } from "react";
import AnalysisPageContent from "./AnalysisPageContent";

export default function AnalysisPage() {
  return (
    <Suspense>
      <AnalysisPageContent />
    </Suspense>
  );
}

export async function generateStaticParams() {
  return Array.from({ length: 10 }, (_, i) => ({ id: (i + 1).toString() }));
}
