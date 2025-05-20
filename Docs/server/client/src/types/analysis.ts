export type AnalysisStep = {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'loading' | 'completed' | 'error';
};

export type AnalysisResult = {
    steps: AnalysisStep[];
    currentStep: number;
}; 