export type AnalysisType = 'market' | 'pricing' | 'competitor' | 'target' | 'trend' | 'risk' | 'detailPage' | 'marketing' | 'logistics' | 'patent';

export interface AnalysisResult {
  market?: any;
  pricing?: any;
  competitor?: any;
  target?: any;
  trend?: any;
  risk?: any;
  detailPage?: any;
  marketing?: any;
  logistics?: any;
  patent?: any;
}

export type AnalysisStepKey =
  | 'market'
  | 'pricing'
  | 'competitor'
  | 'target'
  | 'trend'
  | 'risk'
  | 'detailPage'
  | 'marketing'
  | 'logistics'
  | 'patent';

export const ANALYSIS_STEP_LABELS: Record<AnalysisStepKey, string> = {
  market: '시장성 분석',
  pricing: '가격 분석',
  competitor: '경쟁사 분석',
  target: '타겟 분석',
  trend: '트렌드 분석',
  risk: '리스크 분석',
  detailPage: '상세페이지 개선',
  marketing: '마케팅 전략',
  logistics: '물류/공급망',
  patent: '특허/지식재산',
};
