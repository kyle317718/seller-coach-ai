'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface ReportPreviewProps {
    result: any;
}

export function ReportPreview({ result }: ReportPreviewProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!result) {
        return null;
    }

    return (
        <div className="w-full">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between text-left text-gray-900 font-semibold mb-4"
            >
                <span>📊 최종 보고서 미리보기</span>
                {isExpanded ? (
                    <ChevronUpIcon className="h-5 w-5" />
                ) : (
                    <ChevronDownIcon className="h-5 w-5" />
                )}
            </button>

            {isExpanded && (
                <div className="space-y-4 text-gray-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">시장 현황</h4>
                            <ul className="list-disc list-inside space-y-2">
                                <li>시장 규모: {result.marketSize || '분석 중...'}</li>
                                <li>성장률: {result.growthRate || '분석 중...'}</li>
                                <li>주요 트렌드: {result.trends?.join(', ') || '분석 중...'}</li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">경쟁 현황</h4>
                            <ul className="list-disc list-inside space-y-2">
                                <li>주요 경쟁사: {result.competitors?.length || 0}개사</li>
                                <li>평균 점유율: {result.averageMarketShare || '분석 중...'}</li>
                                <li>진입 장벽: {result.entryBarriers || '분석 중...'}</li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">추천 전략</h4>
                            <ul className="list-disc list-inside space-y-2">
                                {result.recommendations?.map((rec: string, index: number) => (
                                    <li key={index}>{rec}</li>
                                )) || <li>분석 중...</li>}
                            </ul>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">다음 단계</h4>
                            <ul className="list-disc list-inside space-y-2">
                                <li>예상 소요 시간: {result.nextStepDuration || '2-3분'}</li>
                                <li>필요 자료: {result.requiredData || '자동 수집 중...'}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 