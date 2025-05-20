import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 py-4 sticky top-0 z-30">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-4">
        <div className="flex items-center gap-2">
          {/* 로고 아이콘(이모지/이미지) */}
          <span className="text-2xl mr-1">🚀</span>
          <Link href="/" className="text-xl font-extrabold tracking-tight text-gray-900">
            셀러코치.AI
          </Link>
        </div>
        <nav className="flex gap-6 text-base font-medium">
          <Link href="/" className="hover:text-orange-500 transition">홈</Link>
          <Link href="/product-analysis" className="hover:text-orange-500 transition">제품 분석</Link>
        </nav>
      </div>
    </header>
  );
}
