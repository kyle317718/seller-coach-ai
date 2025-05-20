import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: '셀러코치.AI',
  description: '제품 분석을 위한 AI 기반 웹 애플리케이션',
};

// 정적 viewport 설정
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

// 정적 렌더링 강제
export const dynamic = 'force-static';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="font-sans">
        <div className="min-h-screen bg-gray-50">
          <Providers>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
} 