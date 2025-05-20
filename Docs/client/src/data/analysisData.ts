export type MarketAnalysis = any;

export const ANALYSIS_DATA = [
  { id: 'market', name: '시장 분석', description: '시장 동향 및 규모 분석' },
  { id: 'price', name: '가격 분석', description: '가격 정책 및 경쟁력 분석' },
  { id: 'competitor', name: '경쟁사 분석', description: '주요 경쟁사 비교' },
  { id: 'target', name: '타겟 분석', description: '목표 고객 및 세그먼트' },
  { id: 'trend', name: '트렌드 분석', description: '최신 트렌드 및 변화' },
  { id: 'risk', name: '리스크 분석', description: '사업 리스크 및 대응' },
  { id: 'detail', name: '상세 분석', description: '세부 항목별 심층 분석' },
  { id: 'marketing', name: '마케팅 분석', description: '마케팅 전략 및 효과' },
];

export const generateAnalysis = (productData: any) => {
  // 임시 로직: 실제 분석 로직으로 교체 가능
  return { ...productData, analyzed: true };
};

export const ANALYSIS_ITEMS = [
  { id: 'market', name: '시장 분석', description: '시장 동향 및 규모 분석', title: '시장 분석' },
  { id: 'price', name: '가격 분석', description: '가격 정책 및 경쟁력 분석', title: '가격 분석' },
  { id: 'competitor', name: '경쟁사 분석', description: '주요 경쟁사 비교', title: '경쟁사 분석' },
  { id: 'target', name: '타겟 분석', description: '목표 고객 및 세그먼트', title: '타겟 분석' },
  { id: 'trend', name: '트렌드 분석', description: '최신 트렌드 및 변화', title: '트렌드 분석' },
  { id: 'risk', name: '리스크 분석', description: '사업 리스크 및 대응', title: '리스크 분석' },
  { id: 'detail', name: '상세 분석', description: '세부 항목별 심층 분석', title: '상세 분석' },
  { id: 'marketing', name: '마케팅 분석', description: '마케팅 전략 및 효과', title: '마케팅 분석' },
];