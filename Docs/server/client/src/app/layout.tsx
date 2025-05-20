import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: '셀러코치.AI',
    description: '제품 분석을 위한 AI 기반 웹 애플리케이션',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
} 