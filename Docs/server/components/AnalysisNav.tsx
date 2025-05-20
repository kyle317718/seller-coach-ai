'use client';

import Link from 'next/link';

export function AnalysisNav() {
    return (
        <nav className="flex items-center gap-2 mb-6">
            <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                뒤로 가기
            </Link>
            <span className="text-gray-300 mx-2">|</span>
            <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                홈
            </Link>
        </nav>
    );
} 