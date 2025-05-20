import { DeepSeekClient } from 'deepseek-api';

export const suggestProducts = async (budget: number) => {
  const client = new DeepSeekClient(process.env.DEEPSEEK_API_KEY!);

  const prompt = `
    ${budget.toLocaleString()}원 예산으로 온라인 판매 가능한 유망 상품을 추천해주세요.\n
    다음 기준으로 우선순위를 매겨주세요:
    1. 경쟁력: 초보자 진입 장벽 낮음
    2. 수익률: 평균 30% 이상
    3. 트렌드: 최근 3개월 간 검색량 증가세
    JSON 형식: {products: {name: string, reason: string}[]}
  `;

  const response = await client.chat({
    messages: [{ role: 'user', content: prompt }],
    model: 'deepseek-chat'
  });

  return JSON.parse(response.choices[0].message.content);
};
