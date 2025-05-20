'use client';

import { BarChart2, Users, TrendingUp, Search, ChevronRight, Download, PieChart, LineChart, BarChart } from 'lucide-react';

interface AnalysisResult {
    marketAnalysis: {
        competitors: any[];
        marketSize: number;
        growthRate: number;
    };
    consumerAnalysis: {
        demographics: any[];
        preferences: any[];
        patterns: any[];
    };
    trendAnalysis: {
        marketTrends: any[];
        searchTerms: any[];
        popularProducts: any[];
    };
    keywordAnalysis: {
        relatedKeywords: string[];
        searchVolume: any[];
        competition: any[];
    };
}

export const ResultView = ({ results }: { results?: AnalysisResult }) => {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">분석 결과</h2>

                {/* 주요 지표 섹션 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">시장 규모</h3>
                            <PieChart className="text-indigo-500" size={24} />
                        </div>
                        <p className="text-3xl font-bold text-indigo-600">₩ 1,234억</p>
                        <p className="text-sm text-gray-500 mt-2">전년 대비 12% 성장</p>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">경쟁사 수</h3>
                            <Users className="text-blue-500" size={24} />
                        </div>
                        <p className="text-3xl font-bold text-blue-600">48개</p>
                        <p className="text-sm text-gray-500 mt-2">상위 10개사 점유율 65%</p>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">성장 예측</h3>
                            <TrendingUp className="text-green-500" size={24} />
                        </div>
                        <p className="text-3xl font-bold text-green-600">+15.4%</p>
                        <p className="text-sm text-gray-500 mt-2">향후 3년 연평균 성장률</p>
                    </div>
                </div>

                {/* 상세 분석 섹션 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* 시장 트렌드 */}
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold text-gray-800">시장 트렌드</h3>
                            <LineChart className="text-indigo-500" size={24} />
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">온라인 판매 비중</span>
                                <div className="w-2/3 bg-gray-200 rounded-full h-2">
                                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                                </div>
                                <span className="text-indigo-600 font-semibold">75%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">모바일 구매율</span>
                                <div className="w-2/3 bg-gray-200 rounded-full h-2">
                                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                                </div>
                                <span className="text-indigo-600 font-semibold">82%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">해외 직구 비중</span>
                                <div className="w-2/3 bg-gray-200 rounded-full h-2">
                                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                                </div>
                                <span className="text-indigo-600 font-semibold">45%</span>
                            </div>
                        </div>
                    </div>

                    {/* 소비자 분석 */}
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold text-gray-800">소비자 분석</h3>
                            <BarChart className="text-blue-500" size={24} />
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-sm font-medium text-gray-600 mb-2">연령대별 분포</h4>
                                <div className="grid grid-cols-5 gap-2">
                                    <div className="flex flex-col items-center">
                                        <div className="w-full bg-blue-100 rounded-t">
                                            <div className="bg-blue-500 h-24 rounded-t" style={{ height: '40%' }}></div>
                                        </div>
                                        <span className="text-xs mt-1">20대</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-full bg-blue-100 rounded-t">
                                            <div className="bg-blue-500 h-24 rounded-t" style={{ height: '80%' }}></div>
                                        </div>
                                        <span className="text-xs mt-1">30대</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-full bg-blue-100 rounded-t">
                                            <div className="bg-blue-500 h-24 rounded-t" style={{ height: '65%' }}></div>
                                        </div>
                                        <span className="text-xs mt-1">40대</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-full bg-blue-100 rounded-t">
                                            <div className="bg-blue-500 h-24 rounded-t" style={{ height: '45%' }}></div>
                                        </div>
                                        <span className="text-xs mt-1">50대</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-full bg-blue-100 rounded-t">
                                            <div className="bg-blue-500 h-24 rounded-t" style={{ height: '20%' }}></div>
                                        </div>
                                        <span className="text-xs mt-1">60대+</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 키워드 분석 */}
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold text-gray-800">인기 키워드</h3>
                            <Search className="text-purple-500" size={24} />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">브랜드명</span>
                            <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">가격비교</span>
                            <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">리뷰</span>
                            <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">할인</span>
                            <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">신제품</span>
                            <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">인기상품</span>
                            <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">추천</span>
                            <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">비교</span>
                        </div>
                    </div>

                    {/* 경쟁사 분석 */}
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold text-gray-800">경쟁사 분석</h3>
                            <BarChart2 className="text-green-500" size={24} />
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">A사</span>
                                <div className="w-2/3 bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                                <span className="text-green-600 font-semibold">32%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">B사</span>
                                <div className="w-2/3 bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                                </div>
                                <span className="text-green-600 font-semibold">24%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">C사</span>
                                <div className="w-2/3 bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                                </div>
                                <span className="text-green-600 font-semibold">18%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 액션 버튼 */}
                <div className="flex justify-center space-x-4 mt-8">
                    <button className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                        <Download size={20} className="mr-2" />
                        PDF 다운로드
                    </button>
                    <button className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <Download size={20} className="mr-2" />
                        Excel 다운로드
                    </button>
                </div>
            </div>
        </div>
    );
}; 