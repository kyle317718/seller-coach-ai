"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

export default function HeaderNavBar() {
  const router = useRouter();
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-blue-600 shadow flex items-center justify-center px-8 py-3">
      <div className="flex items-center">
        <div className="font-bold text-xl flex items-center gap-2 text-white select-none ml-4 mr-4 min-w-max cursor-pointer" onClick={() => router.push('/') }>
          <span>🚀</span> 셀러코치.AI
        </div>
        <div className="flex items-center gap-2 ml-2">
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded" onClick={() => router.push('/analysis/1')}>상품 예측</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded" onClick={() => router.push('/analysis/2')}>시장성 분석</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded" onClick={() => router.push('/analysis/3')}>사업/위탁 전략</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded" onClick={() => router.push('/analysis/4')}>판매 전 준비</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded" onClick={() => router.push('/analysis/5')}>고객 분석</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded" onClick={() => router.push('/analysis/6')}>경쟁 분석</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded" onClick={() => router.push('/analysis/7')}>상세페이지 개선</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded" onClick={() => router.push('/analysis/8')}>마케팅 전략 제안</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded" onClick={() => router.push('/analysis/9')}>광고 & END ROAS 시뮬레이션</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded" onClick={() => router.push('/analysis/10')}>세무·회계 가이드</button>
        </div>
      </div>
    </nav>
  );
}
