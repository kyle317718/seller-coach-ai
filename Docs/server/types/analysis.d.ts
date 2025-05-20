export interface AnalysisInput {
    productName: string;
    category: string;
    subCategory?: string;
    priceRange?: string;
    targetMarket?: string;
}

export interface AnalysisStep {
    id: number;
    title: string;
    icon: string;
    content: {
        mainText: string;
        tip?: string;
        realCase?: string;
        quickNote?: string;
    };
}

export interface AnalysisSummary {
    productInfo: {
        name: string;
        category: string;
        target: string;
        features: string[];
        channels: string[];
    };
    recommendations: string[];
}

export interface AnalysisResult {
    steps: AnalysisStep[];
    summary: AnalysisSummary;
}

export type AnalysisStatus = 'idle' | 'loading' | 'success' | 'error'; 