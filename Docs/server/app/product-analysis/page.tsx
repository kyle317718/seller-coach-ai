'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { commonStyles } from '@/app/components/ui/common-styles';

export default function ProductAnalysisPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const analysisTypes = [
    {
      id: 'market',
      title: '시장 분석',
      description: '1조 원 규모 시장에서 당신의 위치',
      icon: '📈'
    },
    {
      id: 'target',
      title: '타겟 분석',
      description: '구매자 페르소나 정의',
      icon: '🎯'
    },
    {
      id: 'pricing',
      title: '가격 분석',
      description: '최적 가격대 도출',
      icon: '💰'
    },
    {
      id: 'competition',
      title: '경쟁사 분석',
      description: '5개사 가격/리뷰 비교',
      icon: '🥊'
    },
    {
      id: 'trend',
      title: '트렌드 분석',
      description: '실시간 시장 트렌드',
      icon: '📊'
    },
    {
      id: 'risk',
      title: '리스크 분석',
      description: '시장 진입 위험도',
      icon: '⚠️'
    }
  ];

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    router.push(`/product-analysis/${typeId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <main className={commonStyles.container}>
        <div className="text-center mb-12">
          <h1 className={commonStyles.heading.h1}>
            🚀 AI가 3분 만에 끝내주는 제품 분석
          </h1>
          <h3 className={commonStyles.text.regular}>
            데이터 기반의 확실한 결정을 지원합니다
          </h3>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-blue-50 rounded-xl p-8">
            <h2 className={commonStyles.heading.h2}>
              <span>🔍</span> 무엇을 분석해 드릴까요?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analysisTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleTypeSelect(type.id)}
                  className={`${commonStyles.card} p-6 sm:w-full
                    ${selectedType === type.id
                      ? 'ring-2 ring-[#FF6B00] transform scale-105'
                      : 'hover:-translate-y-1 hover:bg-orange-50'
                    }`}
                >
                  <div className="flex flex-col items-start text-left space-y-3">
                    <span className="text-4xl">{type.icon}</span>
                    <div>
                      <h3 className="font-medium text-lg">{type.title}</h3>
                      <p className={`${commonStyles.text.small} mt-1`}>
                        {type.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 분석 시작 버튼 */}
          <div className="mt-8 text-center">
            <button
              onClick={() => router.push('/analysis')}
              className={`${commonStyles.button.primary} sm:fixed sm:bottom-4 sm:left-4 sm:right-4 sm:w-[calc(100%-2rem)]`}
            >
              ✨ 지금 분석 시작하기
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm sm:flex-col">
            <div className={`${commonStyles.trustBadge} bg-blue-50`}>
              <span>🔒</span>
              <span className="text-blue-700">안전한 분석</span>
            </div>
            <div className={`${commonStyles.trustBadge} bg-green-50`}>
              <span>📌</span>
              <span className="text-green-700">2024년 데이터</span>
            </div>
            <div className={`${commonStyles.trustBadge} bg-purple-50`}>
              <span>🤖</span>
              <span className="text-purple-700">AI 정확도 89%</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 