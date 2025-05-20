import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">AI가 3분 만에 끝내주는 제품 분석</h1>
      <p className="mb-8">데이터 기반의 확실한 결정을 지원합니다</p>

      <div className="mb-10">
        <button className="bg-orange-500 text-white px-6 py-3 rounded-lg">
          지금 바로 분석하기
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnalysisCard 
          title="시장 분석" 
          description="1조 원 규모 시장에서 당신의 위치"
          link="/market-analysis"
        />
        <AnalysisCard
          title="가격 분석"
          description="최적 가격대 도출"
          link="/price-analysis"
        />
        {/* 다른 분석 카드들 */}
      </div>

      <div className="mt-10 text-sm text-gray-500">
        <p>🔒 안전한 분석 | 📌 2024년 최신 데이터 | 🤖 AI 정확도 89%</p>
      </div>
    </main>
  );
}

function AnalysisCard({ title, description, link }: { title: string; description: string; link: string }) {
  return (
    <Link href={link} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p>{description}</p>
    </Link>
  );
}
