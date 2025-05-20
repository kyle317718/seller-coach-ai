import { useState } from 'react';
import { AnalysisForm } from './AnalysisForm';
import { AnalysisSteps } from './AnalysisSteps';
import { ResultView } from './ResultView';

export function ProductAnalysis() {
    const [analysisState, setAnalysisState] = useState({
        step: 0,
        result: null,
        error: null,
        loading: false,
        productInfo: null,
    });

    return (
        <div className="max-w-5xl mx-auto py-8">
            <AnalysisForm analysisState={analysisState} setAnalysisState={setAnalysisState} />
            <AnalysisSteps analysisState={analysisState} />
            <ResultView analysisState={analysisState} />
        </div>
    );
} 