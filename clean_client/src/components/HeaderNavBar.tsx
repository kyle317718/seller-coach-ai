import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

type NavItem = {
  name: string;
  href: string;
};

const navItems: NavItem[] = [
  { name: '홈', href: '/' },
  { name: '아이템 추천', href: '/item-recommendation' },
  { name: '마켓 분석', href: '/market-analysis' },
  { name: '판매 전략', href: '/sales-strategy' },
  { name: '사업 가이드', href: '/business-guide' },
];

const HeaderNavBar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary-600">셀로코치.AI</span>
            </Link>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center">
            <div className="hidden md:flex md:items-center md:space-x-4">
              <Link href="/login" className="btn-outline">
                로그인
              </Link>
              <Link href="/signup" className="btn-primary">
                무료 시작하기
              </Link>
            </div>
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              >
                <span className="sr-only">메뉴 열기</span>
                {isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-b-lg">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5">
                <Link href="/login" className="w-full btn-outline text-center mb-2">
                  로그인
                </Link>
              </div>
              <div className="flex items-center px-5">
                <Link href="/signup" className="w-full btn-primary text-center">
                  무료 시작하기
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default HeaderNavBar;
