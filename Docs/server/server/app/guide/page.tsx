'use client';

import { useState } from 'react';
import { FAQ } from '../../components/FAQ';
import { Card } from '../../components/Card';
import { Tooltip } from '../../components/Tooltip';

const faqItems = [
    {
        category: '분석',
        question: '분석 결과가 틀린 것 같아요',
        answer: `분석 결과가 예상과 다른 경우, 다음과 같이 재분석을 요청하실 수 있습니다:
        
        1. 분석 결과 페이지 상단의 "재분석 요청" 버튼을 클릭합니다.
        2. 틀렸다고 생각되는 부분과 그 이유를 입력해 주세요.
        3. 추가 데이터가 있다면 함께 제출해 주세요.
        4. 24시간 이내에 재분석 결과를 받아보실 수 있습니다.`
    },
    {
        category: '예산',
        question: '예산 분배 비율을 변경할 수 있나요?',
        answer: `예산 분배 비율은 다음과 같이 조정하실 수 있습니다:
        
        1. 예산 시뮬레이터 페이지에서 각 항목의 슬라이더를 조정합니다.
        2. 직접 숫자를 입력하여 정확한 금액을 설정할 수도 있습니다.
        3. "최적화" 버튼을 클릭하면 AI가 추천하는 최적의 비율을 확인할 수 있습니다.`
    },
    {
        category: '광고',
        question: '인스타그램 광고는 어떻게 연동하나요?',
        answer: '아래 영상을 통해 인스타그램 광고 연동 방법을 확인하실 수 있습니다.',
        videoUrl: 'https://www.youtube.com/embed/example'
    }
];

const manualSteps = [
    {
        title: '1단계: 분석 시작하기',
        description: '제품 정보와 목표를 입력하여 분석을 시작합니다.',
        tooltips: [
            {
                field: '제품명',
                content: '제품명은 검색량 분석에 사용됩니다. 정확히 입력해 주세요.'
            },
            {
                field: '카테고리',
                content: '정확한 경쟁사 분석을 위해 가장 적합한 카테고리를 선택해 주세요.'
            }
        ]
    },
    {
        title: '2단계: 보고서 확인하기',
        description: '분석이 완료되면 상세 보고서를 확인할 수 있습니다.',
        tooltips: [
            {
                field: '경쟁강도',
                content: '해당 카테고리의 경쟁 수준을 나타냅니다. 높을수록 차별화가 중요합니다.'
            },
            {
                field: '수익성',
                content: '예상되는 수익률입니다. 업계 평균과 비교한 수치입니다.'
            }
        ]
    },
    {
        title: '3단계: 마케팅 실행하기',
        description: '분석 결과를 바탕으로 효과적인 마케팅을 시작합니다.',
        tooltips: [
            {
                field: '광고 생성',
                content: 'AI가 타겟에 맞는 광고 문구와 이미지를 자동으로 생성합니다.'
            },
            {
                field: '모니터링',
                content: '실시간으로 경쟁사의 가격과 리뷰를 모니터링합니다.'
            }
        ]
    }
];

export default function GuidePage() {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-pretendard font-bold text-gray-900 mb-8">
                트레이 AI 사용 가이드
            </h1>

            {/* 매뉴얼 섹션 */}
            <section className="mb-12">
                <h2 className="text-2xl font-pretendard font-semibold text-gray-900 mb-6">
                    초보자 매뉴얼
                </h2>
                <div className="space-y-6">
                    {manualSteps.map((step, index) => (
                        <Card
                            key={index}
                            className={`transition-all duration-200 ${activeStep === index ? 'ring-2 ring-indigo-500' : ''
                                }`}
                        >
                            <div className="p-6">
                                <h3 className="text-xl font-pretendard font-medium text-gray-900 mb-4">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 mb-6">{step.description}</p>

                                <div className="space-y-4">
                                    {step.tooltips.map((tooltip, tIndex) => (
                                        <div key={tIndex} className="flex items-center space-x-2">
                                            <span className="text-gray-700">{tooltip.field}</span>
                                            <Tooltip content={tooltip.content}>
                                                <span className="text-indigo-500 cursor-help">ℹ️</span>
                                            </Tooltip>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* FAQ 섹션 */}
            <section>
                <h2 className="text-2xl font-pretendard font-semibold text-gray-900 mb-6">
                    자주 묻는 질문
                </h2>
                <FAQ items={faqItems} />
            </section>
        </div>
    );
} 