import { DeepSeekClient } from 'deepseek-api';

export const analyzeMarket = async (keyword: string) => {
  const client = new DeepSeekClient(process.env.DEEPSEEK_API_KEY!);

  const prompt = `
    2024년 한국 ${keyword} 시장에 대해 아래 항목을 JSON 형식으로 조사해줘:
    - 시장 규모 및 성장률
    - 주요 경쟁사 및 점유율
    - 소비자 트렌드
    - 진입장벽 및 기회요인
  `;

  const response = await client.chat({
    messages: [{ role: 'user', content: prompt }],
    model: 'deepseek-chat'
  });

  return JSON.parse(response.choices[0].message.content);
};
