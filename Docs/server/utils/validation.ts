export const typoMap: Record<string, string> = {
    "장어지": "강아지",
    "우선": "우산",
    "방수우산": "방수 우산",
    "이동장": "이동 케이지"
};

export const validateProductName = (text: string): { isValid: boolean; suggestion?: string } => {
    // 금지된 단어 체크
    for (const [typo, correction] of Object.entries(typoMap)) {
        if (text.includes(typo)) {
            const corrected = text.replace(new RegExp(typo, 'g'), correction);
            return {
                isValid: false,
                suggestion: corrected
            };
        }
    }

    // 최소 길이 체크
    if (text.length < 2) {
        return {
            isValid: false,
            suggestion: "제품명은 2글자 이상이어야 합니다."
        };
    }

    return { isValid: true };
};

export const validateCategory = (category: string): boolean => {
    const validCategories = [
        "생활용품",
        "전자제품",
        "패션의류",
        "식품",
        "가구/인테리어",
        "반려동물"
    ];
    return validCategories.includes(category);
};

export const validatePriceRange = (price: string): boolean => {
    const priceNumber = parseInt(price.replace(/[^0-9]/g, ''));
    return !isNaN(priceNumber) && priceNumber > 0 && priceNumber <= 1000000;
};

export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW'
    }).format(price);
}; 