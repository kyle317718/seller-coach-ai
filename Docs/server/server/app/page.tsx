'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '../components/Card';
import { SearchTrendChart } from '../components/SearchTrendChart';

export default function Home() {
    const [searchTrends] = useState([
        { month: '1월', value: 120 },
        { month: '2월', value: 180 },
        { month: '3월', value: 210 }
    ]);

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* 헤더 섹션 */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                        <span className="mr-2">🚀</span>
                        AI가 3분 만에 끝내주는 제품 분석
                    </h1>
                    <p className="text-lg text-gray-600">
                        데이터 기반의 확실한 결정을 지원합니다.
                    </p>
                </div>

                {/* 트렌드 차트 섹션 */}
                <div className="mb-12">
                    <Card className="p-6">
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-2xl font-bold">실시간 트렌드</h2>
                                <span className="text-green-500 font-semibold">↑75% 증가</span>
                            </div>
                            <p className="text-gray-600">최근 3개월 검색량 추이</p>
                        </div>
                        <SearchTrendChart data={searchTrends} />
                    </Card>
                </div>

                {/* 분석 옵션 섹션 */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-center mb-8">
                        <span className="text-2xl">🔍</span> 무엇을 분석해 드릴까요?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="p-6 hover:shadow-md transition-shadow">
                            <div className="text-center">
                                <div className="text-4xl mb-4">📈</div>
                                <h3 className="text-xl font-semibold mb-2">시장 분석</h3>
                                <p className="text-gray-600 mb-4">1조 원 규모 시장에서 당신의 위치</p>
                            </div>
                        </Card>
                        <Card className="p-6 hover:shadow-md transition-shadow">
                            <div className="text-center">
                                <div className="text-4xl mb-4">🕵️</div>
                                <h3 className="text-xl font-semibold mb-2">경쟁사 분석</h3>
                                <p className="text-gray-600 mb-4">5개사 가격/리뷰 비교</p>
                            </div>
                        </Card>
                        <Card className="p-6 hover:shadow-md transition-shadow">
                            <div className="text-center">
                                <div className="text-4xl mb-4">🎯</div>
                                <h3 className="text-xl font-semibold mb-2">전략 추천</h3>
                                <p className="text-gray-600 mb-4">맞춤형 로드맵</p>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* 분석 시작 버튼 */}
                <div className="text-center mb-12">
                    <Link
                        href="/analysis/risk"
                        className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 transition-colors shadow-sm"
                    >
                        ✨ 지금 분석 시작하기
                    </Link>
                </div>

                {/* 신뢰도 지표 */}
                <div className="flex justify-center space-x-8 text-sm text-gray-600">
                    <span className="flex items-center">
                        🔒 안전한 분석
                    </span>
                    <span className="flex items-center">
                        📌 2024년 최신 데이터
                    </span>
                    <span className="flex items-center">
                        🤖 AI 정확도 89%
                    </span>
                </div>
            </main>
        </div>
    );
} 