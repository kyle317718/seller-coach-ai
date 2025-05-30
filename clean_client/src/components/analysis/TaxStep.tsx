import { useDeepSeek } from '@/hooks/useDeepSeek';

export default function TaxStep({ onComplete }: { onComplete: (data: any) => void }) {
  const { analyze, isLoading } = useDeepSeek();
  
  const getTaxGuide = async () => {
    const prompt = `
      온라인 셀러를 위한 세무·회계 가이드를 생성해주세요. 다음 내용 포함:
      - 월별 세금 신고 일정
      - 필수 증빙 서류 목록
      - 장부 관리 팁
      출력 형식: { schedule: string[], documents: string[], tips: string[] }
    `;
    const result = await analyze(prompt);
    onComplete(result);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={getTaxGuide}
        disabled={isLoading}
        className="bg-indigo-600 text-white px-4 py-2 rounded disabled:bg-indigo-300"
      >
        {isLoading ? '생성 중...' : '세무 가이드 생성'}
      </button>
    </div>
  );
}
