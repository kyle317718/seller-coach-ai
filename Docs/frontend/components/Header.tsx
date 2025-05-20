import Link from 'next/link';

export function Header() {
    return (
        <header className="w-full bg-white shadow-sm py-4 px-8 flex items-center justify-between">
            <div className="text-xl font-bold text-gray-900">
                셀러코치AI
            </div>
            <nav className="flex gap-4">
                <Link href="/">홈</Link>
                <Link href="/product-analysis">제품 분석</Link>
            </nav>
        </header>
    );
} 