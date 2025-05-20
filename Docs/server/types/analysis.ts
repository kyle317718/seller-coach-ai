export type AnalysisStage = {
  id: string;
  title: string;
  content: string;
  status: 'pending' | 'loading' | 'completed' | 'error';
  result?: string;
};

export type AnalysisContextType = {
  productInfo: {
    name: string;
    description: string;
    targetMarket: string;
    competitors: string;
  };
  analysisStages: AnalysisStage[];
  currentStep: number;
  error: string | null;
  isComplete: boolean;
  setProductInfo: (info: AnalysisContextType['productInfo']) => void;
  setCurrentStep: (step: number) => void;
  setError: (error: string | null) => void;
  setComplete: (complete: boolean) => void;
  setSteps: (steps: AnalysisStage[]) => void;
};

export interface AnalysisData {
  productName: string;
  category: string;
  marketPotential: 'high' | 'medium' | 'low';
  keyStrengths: string[];
  keyWeaknesses: string[];
  recommendations: string[];
}

export const mockAnalysisData: AnalysisData = {
  productName: "스마트 LED 조명",
  category: "스마트홈 / IoT",
  marketPotential: "high",
  keyStrengths: [
    "에너지 효율성이 높음",
    "스마트폰 앱 연동 기능",
    "다양한 색상 및 밝기 조절"
  ],
  keyWeaknesses: [
    "초기 구매 비용이 높음",
    "설치 과정이 복잡함",
    "와이파이 연결 필요"
  ],
  recommendations: [
    "무상 설치 서비스 제공으로 진입장벽 낮추기",
    "에너지 절감 효과를 수치화하여 마케팅에 활용",
    "간편 설치 가이드 영상 제작 및 배포"
  ]
};

export interface MarketSize {
  value: string;
  growthRate: string;
  source: string;
}

export interface Recommendation {
  title: string;
  actions: string[];
}

export interface CompetitionAnalysis {
  level: string;
  competitors: {
    name: string;
    marketShare: string;
    strengths: string[];
  }[];
}

export interface AnalysisResult {
  summary: string;
  marketSize: MarketSize;
  competition: CompetitionAnalysis;
  recommendations: Recommendation[];
  targetMarket: {
    size: string;
    demographics: string[];
    trends: string[];
  };
}

// API 요청 타입
export interface AnalysisRequest {
  productName: string;
  category: string;
  priceRange?: string;
  targetMarket?: string;
}

// DeepSeek 응답 타입
export interface DeepSeekResponse {
  market_analysis: {
    size: string;
    growth_rate: string;
    source: string;
  };
  competitors: Array<{
    name: string;
    market_share: string;
    threat_level: string;
    strengths: string[];
  }>;
  recommendations: string[];
}

// 처리된 분석 결과 타입
export interface ProcessedAnalysis {
  summary: string;
  market_size: {
    value: string;
    growth_rate: string;
    source: string;
  };
  competitors: Array<{
    name: string;
    market_share: string;
    strengths: string[];
  }>;
  recommendations: string[];
  timestamp: string;
}

// 분석 단계 타입
export interface AnalysisStep {
  id: number;
  title: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  result?: any;
}

export interface AnalysisInput {
  productName: string;
  category: string;
  priceRange: string;
  targetMarket: string;
  targetAge: string[];
  budget: number;
  marketingChannels: string[];
}

export interface MarketData {
  size: string;
  growthRate: string;
  competitors: number;
  averageRating: number;
  trends: string[];
}

export interface AnalysisReport {
  marketData: MarketData;
  recommendations: {
    platform: string;
    strategy: string;
    budget: string;
    warnings: string[];
  };
  steps: AnalysisStep[];
} 