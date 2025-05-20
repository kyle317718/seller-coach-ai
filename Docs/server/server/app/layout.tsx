import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Trae AI - 제품 분석 도구',
    description: '데이터 기반의 제품 분석 및 전략 수립 도구',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <head>
                <link
                    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="font-noto bg-gray-50 text-gray-900 antialiased">
                {children}
            </body>
        </html>
    );
} 