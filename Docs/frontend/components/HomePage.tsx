'use client';
import { useRouter } from 'next/navigation';

export function HomePage() {
    const router = useRouter();

    return (
        <div className="max-w-5xl mx-auto py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-2">🚀 AI가 3분 만에 끝내주는 제품 분석</h1>
                <p className="text-lg text-gray-600 mb-6">데이터 기반의 확실한 결정을 지원합니다.</p>
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg text-lg shadow"
                        onClick={() => router.push('/product-analysis')}
                    >
                        지금 분석 시작하기
                    </button>
                </div>
                <div className="flex justify-center gap-4 mb-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">안전한 분석</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">2024년 최신 데이터</span>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs">AI 정확도: 89%</span>
                </div>
            </div>
            <div className="mb-16">
                <h2 className="text-2xl font-bold text-center mb-8">무엇을 분석해 드릴까요?</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">시장 분석</h3>
                        <p className="text-gray-600">1조 원 규모 시장에서 당신의 위치</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">경쟁사 분석</h3>
                        <p className="text-gray-600">5개사 가격/리뷰 비교</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">전략 추천</h3>
                        <p className="text-gray-600">맞춤형 로드맵</p>
                    </div>
                </div>
            </div>
            <div className="mb-16">
                <h2 className="text-2xl font-bold text-center mb-8">8단계 분석 프로세스</h2>
                <div className="grid md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="text-lg font-semibold mb-2">1. 트렌드 분석</div>
                        <p className="text-gray-600 text-sm">현재 시장 트렌드와 소비자 선호도 분석</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="text-lg font-semibold mb-2">2. 시장성 평가</div>
                        <p className="text-gray-600 text-sm">시장 규모와 성장 가능성 평가</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="text-lg font-semibold mb-2">3. 경쟁사 분석</div>
                        <p className="text-gray-600 text-sm">주요 경쟁사 강점/약점 분석</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="text-lg font-semibold mb-2">4. 타겟 고객 분석</div>
                        <p className="text-gray-600 text-sm">고객 특성 및 니즈 파악</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="text-lg font-semibold mb-2">5. 가격 전략</div>
                        <p className="text-gray-600 text-sm">최적 가격 전략 도출</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="text-lg font-semibold mb-2">6. 마케팅 전략</div>
                        <p className="text-gray-600 text-sm">마케팅 채널/방법 제시</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="text-lg font-semibold mb-2">7. 리스크 분석</div>
                        <p className="text-gray-600 text-sm">위험 요소 분석 및 대응</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="text-lg font-semibold mb-2">8. 최종 보고서</div>
                        <p className="text-gray-600 text-sm">종합 분석 결과/권장사항</p>
                    </div>
                </div>
            </div>
        </div>
    );
} 