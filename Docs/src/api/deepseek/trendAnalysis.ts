import { useDeepSeek } from '@/hooks/useDeepSeek';

export const analyzeTrends = async (category: string) => {
  const { analyze } = useDeepSeek();
  
  const prompt = `
    As a market analysis expert, provide trending insights for ${category} in 2024.
    Output JSON format:
    {
      "top_products": {name: string, search_volume: number}[],
      "growth_prediction": {q1: number, q2: number, q3: number, q4: number},
      "risk_factors": string[]
    }
  `;

  return await analyze(prompt);
};
