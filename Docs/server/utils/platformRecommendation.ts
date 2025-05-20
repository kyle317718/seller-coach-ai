import { PlatformData } from '@/types/platform';

export interface ProductProfile {
  category: string;       // "패션", "전자제품" 등
  priceRange: string;    // "저가", "고가"
  targetAge: number[];   // [20, 30]
  isFragile: boolean;    // 통관 시 주의 필요 여부
}

interface ScoredPlatform extends PlatformData {
  score: number;
}

type Category = '패션' | '전자제품' | '식품' | '뷰티';
type PriceRange = '저가' | '중가' | '고가';
type PlatformKey = 'coupang' | 'naver' | 'eleven';

type CategoryScores = {
  [K in Category]: {
    [P in PlatformKey]: number;
  };
};

type PriceRangeScores = {
  [K in PriceRange]: {
    [P in PlatformKey]: number;
  };
};

type ChinaFriendlyScores = {
  [K in PlatformKey]: number;
};

// 카테고리별 플랫폼 적합도 점수 (0-100)
const CATEGORY_SCORES: CategoryScores = {
  패션: {
    coupang: 85,
    naver: 90,
    eleven: 80
  },
  전자제품: {
    coupang: 95,
    naver: 75,
    eleven: 85
  },
  식품: {
    coupang: 90,
    naver: 85,
    eleven: 70
  },
  뷰티: {
    coupang: 80,
    naver: 95,
    eleven: 75
  }
};

// 중국 셀러 친화도 점수 (0-100)
const CHINA_FRIENDLY_SCORES: ChinaFriendlyScores = {
  coupang: 90,  // 통관 프로세스 간소화
  naver: 85,    // 중국 셀러 전용 서포트
  eleven: 80    // 기본적인 지원
};

// 가격대별 플랫폼 적합도 (0-100)
const PRICE_RANGE_SCORES: PriceRangeScores = {
  저가: {
    coupang: 90,
    naver: 85,
    eleven: 95
  },
  중가: {
    coupang: 90,
    naver: 90,
    eleven: 85
  },
  고가: {
    coupang: 80,
    naver: 95,
    eleven: 85
  }
};

const filterByCategory = (category: Category): PlatformData[] => {
  const scores = CATEGORY_SCORES[category];
  return Object.entries(scores)
    .filter(([_, score]) => score > 70) // 최소 점수 이상만 추천
    .map(([platform]) => ({
      key: platform as PlatformKey,
      name: platform === 'coupang' ? '쿠팡' :
        platform === 'naver' ? '네이버' : '11번가',
      // 실제 구현시 아이콘과 가이드 정보 추가 필요
    } as PlatformData));
};

const prioritizeChinaFriendly = (platforms: PlatformData[]): PlatformData[] => {
  return platforms.sort((a, b) =>
    (CHINA_FRIENDLY_SCORES[b.key as PlatformKey] || 0) -
    (CHINA_FRIENDLY_SCORES[a.key as PlatformKey] || 0)
  );
};

const calculateScore = (platform: PlatformData, product: ProductProfile): number => {
  let score = 0;
  const weights = {
    category: 0.4,
    chinaFriendly: 0.3,
    priceRange: 0.2,
    fragile: 0.1
  };

  // 카테고리 점수
  if (product.category in CATEGORY_SCORES) {
    score += CATEGORY_SCORES[product.category as Category][platform.key as PlatformKey] * weights.category;
  }

  // 중국 친화도 점수
  score += CHINA_FRIENDLY_SCORES[platform.key as PlatformKey] * weights.chinaFriendly;

  // 가격대 점수
  if (product.priceRange in PRICE_RANGE_SCORES) {
    score += PRICE_RANGE_SCORES[product.priceRange as PriceRange][platform.key as PlatformKey] * weights.priceRange;
  }

  // 취급주의 상품 점수
  if (product.isFragile) {
    score *= platform.key === 'coupang' ? 0.9 : 1; // 쿠팡은 취급주의 상품에 대해 페널티
  }

  return Math.round(score);
};

export const recommendPlatform = (
  product: ProductProfile & { category: Category; priceRange: PriceRange },
  sellerLocation: string
): ScoredPlatform[] => {
  // 1. 카테고리 기반 1차 필터링
  let platforms = filterByCategory(product.category);

  // 2. 중국 셀러 특화 조건 적용
  if (sellerLocation === "china") {
    platforms = prioritizeChinaFriendly(platforms);
  }

  // 3. 상품 특성 반영하여 최종 점수 계산
  return platforms.map(p => ({
    ...p,
    score: calculateScore(p, product)
  })).sort((a, b) => b.score - a.score);
}; 