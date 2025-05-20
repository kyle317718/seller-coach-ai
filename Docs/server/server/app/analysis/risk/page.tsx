'use client';

import * as React from 'react';
import { useState } from 'react';
import { Card } from '@/components/Card';
import { MetricBar } from '@/components/MetricBar';
import { ReportTemplate } from '@/components/ReportTemplate';
import { SearchTrendChart } from '@/components/SearchTrendChart';
import { Header } from '@/components/Header';
import { SuccessStory } from '@/components/SuccessStory';

interface RiskMetric {
    label: string;
    value: number;
    tooltipContent: string;
    color: 'primary' | 'warning' | 'danger' | 'success';
}

interface RiskItem {
    category: string;
    level: number;
    impact: string;
    mitigation: string;
}

const RiskAnalysisPage = () => {
    const [searchTrends] = useState([
        { month: '1월', value: 120 },
        { month: '2월', value: 180 },
        { month: '3월', value: 210 }
    ]);

    const [metrics] = useState([
        {
            label: '시장 성장률',
            value: 75,
            tooltipContent: '전년 대비 75% 성장',
            color: 'success'
        },
        {
            label: '경쟁 강도',
            value: 60,
            tooltipContent: '중간 수준의 경쟁',
            color: 'warning'
        },
        {
            label: '수익성',
            value: 85,
            tooltipContent: '높은 마진율',
            color: 'success'
        }
    ]);

    const [recommendations] = useState([
        '경쟁사 대비 차별화된 마케팅 전략 수립 필요',
        '품질 관리 프로세스 강화로 반품률 감소 도모',
        '성장하는 시장에 맞춘 공격적 마케팅 전략 권장'
    ]);

    const [risks] = useState<RiskItem[]>([
        {
            category: '시장 위험',
            level: 75,
            impact: '높은 경쟁으로 인한 시장 점유율 감소',
            mitigation: '차별화된 제품 전략 수립'
        },
        {
            category: '기술 위험',
            level: 60,
            impact: '신기술 도입 지연으로 인한 경쟁력 약화',
            mitigation: 'R&D 투자 확대 및 기술 파트너십 구축'
        }
    ]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="grid grid-cols-1 gap-6">
                        <Card className="p-6">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold mb-2">검색 트렌드 분석</h2>
                                <p className="text-gray-600">최근 3개월 검색량 추이</p>
                            </div>
                            <SearchTrendChart data={searchTrends} />
                        </Card>

                        <Card className="p-6">
                            <h2 className="text-2xl font-bold mb-6">주요 지표</h2>
                            <div className="space-y-6">
                                {metrics.map((metric, index) => (
                                    <MetricBar
                                        key={index}
                                        label={metric.label}
                                        value={metric.value}
                                        tooltipContent={metric.tooltipContent}
                                        color={metric.color}
                                    />
                                ))}
                            </div>
                        </Card>

                        <SuccessStory />

                        {/* Interactive Analysis Section */}
                        <Card className="lg:sticky lg:top-4 h-fit">
                            <h2 className="text-xl font-pretendard font-bold text-gray-900 mb-6">리스크 분석</h2>
                            <div className="space-y-6">
                                {metrics.map((metric, index) => (
                                    <MetricBar
                                        key={index}
                                        label={metric.label}
                                        value={metric.value}
                                        tooltipContent={metric.tooltipContent}
                                        color={metric.color}
                                    />
                                ))}
                            </div>
                        </Card>

                        {/* Report Preview Section */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <ReportTemplate
                                title="리스크 분석 보고서"
                                date={new Date().toLocaleDateString('ko-KR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                                companyName="트레이 AI"
                                metrics={metrics}
                                summary={`분석 결과, 현재 시장은 경쟁이 치열한 상황입니다 (경쟁 강도 80%). 
                                하지만 시장 성장성이 65%로 양호하며, 반품 리스크는 40%로 관리 가능한 수준입니다.
                                차별화된 전략과 품질 관리를 통해 시장에서의 경쟁력 확보가 가능할 것으로 판단됩니다.`}
                                recommendations={recommendations}
                            />
                        </div>
                    </div>
                </div>
            </main>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-6">위험 분석</h2>
                <div className="grid gap-6">
                    {risks.map((risk, index) => (
                        <Card key={index} className="w-full">
                            <div className="flex flex-col space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-semibold">{risk.category}</h3>
                                    <span className="text-lg font-medium">
                                        위험도: {risk.level}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-red-600 h-2.5 rounded-full"
                                        style={{ width: `${risk.level}%` }}
                                    ></div>
                                </div>
                                <div className="space-y-2">
                                    <p><span className="font-medium">영향:</span> {risk.impact}</p>
                                    <p><span className="font-medium">대응 방안:</span> {risk.mitigation}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Mobile Optimization */}
            <style jsx global>{`
                @media (max-width: 640px) {
                    .container {
                        padding-left: 1rem;
                        padding-right: 1rem;
                    }
                    .grid {
                        gap: 1rem;
                    }
                    .lg\\:sticky {
                        position: relative;
                        top: 0;
                    }
                }
            `}</style>
        </div>
    );
};

export default RiskAnalysisPage; 