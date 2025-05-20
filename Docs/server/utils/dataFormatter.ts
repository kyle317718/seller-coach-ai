export interface AnalysisStep {
    id: number;
    title: string;
    content: string;
    status: 'completed' | 'error';
}

export interface AnalysisResult {
    productName: string;
    category: string;
    subcategory?: string;
    priceRange: string;
    targetMarket: string;
    steps: AnalysisStep[];
}

export function formatAnalysisData(data: any): AnalysisResult {
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid analysis data');
    }

    const {
        productName,
        category,
        subcategory,
        priceRange,
        targetMarket,
        steps
    } = data;

    // 필수 필드 검증
    if (!productName || !category || !steps || !Array.isArray(steps)) {
        throw new Error('Missing required fields in analysis data');
    }

    // steps 배열의 각 항목 검증
    const validatedSteps = steps.map(step => {
        if (!step.id || !step.title || !step.content || !step.status) {
            throw new Error('Invalid step data structure');
        }
        return {
            id: step.id,
            title: step.title,
            content: step.content,
            status: step.status as 'completed' | 'error'
        };
    });

    return {
        productName,
        category,
        subcategory,
        priceRange: priceRange || '',
        targetMarket: targetMarket || '',
        steps: validatedSteps
    };
} 