import { useState } from 'react';

export function useDeepSeek() {
  const [isLoading, setIsLoading] = useState(false);

  const analyze = async (prompt: string) => {
    setIsLoading(true);
    // TODO: 실제 분석 API 연동 필요
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    // 임시 결과 반환
    return {
      persona: { age: '20대', gender: '여성', interest: ['패션', 'SNS'] },
      needs: ['트렌디한 스타일', 'SNS 활용법']
    };
  };

  return { analyze, isLoading };
}
