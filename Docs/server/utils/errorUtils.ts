export class AnalysisError extends Error {
    constructor(
        message: string,
        public code: string,
        public suggestion?: string
    ) {
        super(message);
        this.name = 'AnalysisError';
    }
}

export const ERROR_CODES = {
    NETWORK_ERROR: 'NETWORK_ERROR',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    SERVER_ERROR: 'SERVER_ERROR',
    EXPORT_ERROR: 'EXPORT_ERROR',
    NO_RESULT_ERROR: 'NO_RESULT_ERROR',
} as const;

export const getErrorMessage = (error: unknown): { message: string; suggestion?: string } => {
    if (error instanceof AnalysisError) {
        return {
            message: error.message,
            suggestion: error.suggestion
        };
    }

    if (error instanceof Error) {
        if (error.message.includes('Failed to fetch') || error.message.includes('Network')) {
            return {
                message: '서버와의 연결에 실패했습니다.',
                suggestion: '인터넷 연결을 확인하시거나 잠시 후 다시 시도해주세요.'
            };
        }
        return { message: error.message };
    }

    return { message: '알 수 없는 오류가 발생했습니다.' };
};

export const handleExportError = (error: unknown): { message: string; suggestion?: string } => {
    if (error instanceof Error) {
        if (error.message.includes('Blob')) {
            return {
                message: '파일 생성 중 오류가 발생했습니다.',
                suggestion: '브라우저를 새로고침하고 다시 시도해주세요.'
            };
        }
        if (error.message.includes('storage')) {
            return {
                message: '분석 결과를 찾을 수 없습니다.',
                suggestion: '분석을 다시 실행해주세요.'
            };
        }
    }
    return getErrorMessage(error);
};

export const validateAnalysisResult = (result: unknown): boolean => {
    if (!result || typeof result !== 'object') return false;

    const requiredFields = [
        'productName',
        'category',
        'subcategory',
        'priceRange',
        'targetMarket',
        'analysis'
    ];

    return requiredFields.every(field => field in (result as object));
}; 