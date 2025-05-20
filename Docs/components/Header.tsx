import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          셀러코치 AI
        </Link>
        <nav className="flex space-x-6">
          <Link href="/market-analysis" className="hover:text-orange-500">
            시장 분석
          </Link>
          <Link href="/price-analysis" className="hover:text-orange-500">
            가격 분석
          </Link>
          <Link href="/competitor-analysis" className="hover:text-orange-500">
            경쟁사 분석
          </Link>
          <Link href="/trend-analysis" className="hover:text-orange-500">
            트렌드 분석
          </Link>
          <Link href="/target-analysis" className="hover:text-orange-500">
            타겟 분석
          </Link>
          <Link href="/risk-analysis" className="hover:text-orange-500">
            리스크 분석
          </Link>
        </nav>
      </div>
    </header>
  );
}
