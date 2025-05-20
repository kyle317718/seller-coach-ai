import { analyzeTrends } from '@/api/deepseek/trendAnalysis';
// import { analyzeMarket } from '@/api/deepseek/marketResearch';
// import { suggestProducts } from '@/api/deepseek/productSuggest';

export const runFullAnalysis = async (productInfo: any) => {
  const steps = [
    { id: 1, name: 'trend', analyzer: () => analyzeTrends(productInfo.category) },
    // TODO: 2~8단계 analyzer 함수 추가 (예: analyzeMarket, suggestProducts 등)
  ];

  const results: Record<string, any> = {};
  for (const step of steps) {
    results[step.name] = await step.analyzer();
  }
  return results;
};
