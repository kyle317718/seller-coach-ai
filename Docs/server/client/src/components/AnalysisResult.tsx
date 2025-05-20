'use client';

import { useState, forwardRef, useImperativeHandle } from 'react';
import { AnalysisStep } from '@/types/analysis';

const initialSteps: AnalysisStep[] = [
    {
        id: 1,
        title: '상품 예측',
        description: '',
        status: 'pending'
    },
    {
        id: 2,
        title: '사업/위탁 안내',
        description: '수집 상품 관련 도매처 정보, 예상 마진율 계산, 주요 위탁 안내 플랫폼 통계와 정보 제공',
        status: 'pending'
    },
    {
        id: 3,
        title: '판매 전 준비',
        description: '필요 인증 확인, 상품 포장 및 배송 옵션, 고객 응대 체크리스트 제공',
        status: 'pending'
    },
    {
        id: 4,
        title: '시장성 분석',
        description: '예상 시장 규모, 연간 성장률, 계절성 상품 여부 분석',
        status: 'pending'
    },
    {
        id: 5,
        title: '고객 분석',
        description: '주요 타겟 고객층, 고객 구매 여정 시나리오, 예상 구매 결정 요인 분석',
        status: 'pending'
    },
    {
        id: 6,
        title: '경쟁 분석',
        description: '주요 경쟁사 분석, 시장 내 경쟁 강도 평가, 차별화 전략 포인트 제안',
        status: 'pending'
    },
    {
        id: 7,
        title: '상세페이지 개선',
        description: '현재 페이지 분석 기반 문구/이미지 개선 제안, 필수 포함 요소 체크',
        status: 'pending'
    },
    {
        id: 8,
        title: '마케팅 전략',
        description: '추천 광고 채널, 타겟 키워드 제안, 광고 예상 성과 가이드 제공',
        status: 'pending'
    }
];

export const AnalysisResult = forwardRef((props, ref) => {
    const [steps, setSteps] = useState<AnalysisStep[]>(initialSteps);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // startAnalysis 함수를 외부에서 호출할 수 있도록 설정
    useImperativeHandle(ref, () => ({
        startAnalysis: async (formData: FormData) => {
            setIsAnalyzing(true);
            setError(null);

            try {
                // 첫 번째 단계를 로딩 상태로 변경
                updateStepStatus(1, 'loading');

                // 백엔드 API 호출
                const response = await fetch('http://localhost:5001/api/analyze', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('분석 요청에 실패했습니다.');
                }

                // 웹소켓 연결 설정
                const ws = new WebSocket('ws://localhost:5001/ws/analysis');

                ws.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    if (data.type === 'step_update') {
                        updateStepStatus(data.stepId, data.status);
                        if (data.status === 'completed' && data.stepId < 8) {
                            updateStepStatus(data.stepId + 1, 'loading');
                        }
                    }
                };

                ws.onerror = (error) => {
                    setError('연결에 문제가 발생했습니다.');
                    setIsAnalyzing(false);
                };

            } catch (err) {
                setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
                setIsAnalyzing(false);
            }
        }
    }));

    // 단계 상태 업데이트 함수
    const updateStepStatus = (stepId: number, status: AnalysisStep['status']) => {
        setSteps(prevSteps =>
            prevSteps.map(step =>
                step.id === stepId ? { ...step, status } : step
            )
        );
    };

    return (
        <div className="space-y-6 mt-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">분석 결과 📊</h2>
                {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className={`p-6 rounded-lg border ${step.status === 'loading'
                            ? 'border-blue-200 bg-blue-50'
                            : step.status === 'completed'
                                ? 'border-green-200 bg-green-50'
                                : step.status === 'error'
                                    ? 'border-red-200 bg-red-50'
                                    : 'border-gray-200 bg-gray-50'
                            }`}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg font-semibold">{step.id}. {step.title}</span>
                            {step.status === 'loading' && (
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent" />
                            )}
                            {step.status === 'completed' && (
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                            {step.status === 'error' && (
                                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </div>
                        {step.description && (
                            <p className="text-sm text-gray-600">{step.description}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}); 