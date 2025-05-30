export type AnalysisCategory = {
  id: 'market' | 'price' | 'competitor' | 'target' | 'trend' | 'risk' | 'report';
  title: string;
  description: string;
  badge?: string;
};
