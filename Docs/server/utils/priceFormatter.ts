export const formatDisplayPrice = (value: string): string => {
  const numValue = parseInt(value);
  if (isNaN(numValue)) return value;
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0
  }).format(numValue);
};

export const formatPriceForAPI = (displayPrice: string): string => {
  // 이미 API 형식(숫자-숫자)인 경우 그대로 반환
  if (/^\d+-\d+$/.test(displayPrice)) {
    return displayPrice;
  }

  // 직접 입력값인 경우 (숫자만)
  if (/^\d+$/.test(displayPrice)) {
    return `0-${displayPrice}`;
  }

  // 미리 정의된 범위값 변환
  const ranges: { [key: string]: string } = {
    "1만원 미만": "0-10000",
    "1~3만원": "10000-30000",
    "3~5만원": "30000-50000",
    "5~10만원": "50000-100000",
    "10만원 이상": "100000-1000000"
  };

  return ranges[displayPrice] || displayPrice;
};

export const validatePriceRange = (value: string): boolean => {
  // API 형식 검증 (숫자-숫자)
  if (/^\d+-\d+$/.test(value)) {
    const [min, max] = value.split('-').map(Number);
    return min >= 0 && max <= 1000000 && min <= max;
  }
  
  // 직접 입력값 검증 (숫자만)
  if (/^\d+$/.test(value)) {
    const numValue = parseInt(value);
    return numValue >= 0 && numValue <= 1000000;
  }

  // 미리 정의된 범위값 검증
  const validRanges = [
    "1만원 미만",
    "1~3만원",
    "3~5만원",
    "5~10만원",
    "10만원 이상"
  ];

  return validRanges.includes(value);
}; 