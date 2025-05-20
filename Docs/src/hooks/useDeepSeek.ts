import { DeepSeekClient } from 'deepseek-api';
import { useState } from 'react';

export const useDeepSeek = () => {
  const [isLoading, setIsLoading] = useState(false);
  const client = new DeepSeekClient(process.env.NEXT_PUBLIC_DEEPSEEK_KEY!);

  const analyze = async (prompt: string) => {
    setIsLoading(true);
    try {
      const response = await client.chat({
        messages: [{ role: 'user', content: prompt }],
        model: 'deepseek-chat',
        temperature: 0.7
      });
      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('DeepSeek API Error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { analyze, isLoading };
};
