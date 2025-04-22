import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "AI 판매 코치는 어떻게 작동하나요?",
    answer: "AI 판매 코치는 고급 자연어 처리 기술을 사용하여 판매 통화를 분석하고, 실시간으로 피드백과 개선 제안을 제공합니다. 통화의 톤, 속도, 키워드 사용 등을 분석하여 맞춤형 코칭을 제공합니다."
  },
  {
    question: "어떤 종류의 피드백을 받을 수 있나요?",
    answer: "고객 응대 스킬, 제품 지식 활용, 질문 기술, 클로징 전략 등 다양한 측면에 대한 구체적인 피드백을 받을 수 있습니다. 또한 감정 분석을 통해 고객과의 상호작용 품질도 평가합니다."
  },
  {
    question: "데이터는 안전하게 보호되나요?",
    answer: "네, 모든 통화 데이터는 엄격한 보안 프로토콜에 따라 암호화되어 저장되며, 개인정보 보호 규정을 준수합니다. 데이터는 분석 목적으로만 사용되며, 제3자와 공유되지 않습니다."
  }
];

export function HomePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          AI 판매 코치로 영업 실력을 향상시키세요
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          실시간 피드백과 맞춤형 코칭으로 당신의 판매 스킬을 한 단계 업그레이드하세요.
        </p>
        <button
          onClick={() => onNavigate('analysis')}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          지금 시작하기
        </button>
      </section>

      {/* Service Introduction */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            AI 판매 코치만의 특별한 기능
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-gray-50">
              <h3 className="text-xl font-semibold mb-4">실시간 분석</h3>
              <p className="text-gray-600">
                통화 중 실시간으로 톤, 속도, 키워드 사용을 분석하여 즉각적인 피드백을 제공합니다.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-gray-50">
              <h3 className="text-xl font-semibold mb-4">맞춤형 코칭</h3>
              <p className="text-gray-600">
                개인의 판매 스타일과 고객 유형에 맞는 맞춤형 조언과 개선점을 제시합니다.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-gray-50">
              <h3 className="text-xl font-semibold mb-4">성과 추적</h3>
              <p className="text-gray-600">
                상세한 분석 리포트와 시간에 따른 성과 변화를 추적하여 지속적인 발전을 돕습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Analysis Feature Guide */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            AI 분석 프로세스
          </h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold">통화 녹음 업로드</h3>
                <p className="text-gray-600">분석하고 싶은 판매 통화를 업로드합니다.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">2</div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold">AI 음성 분석</h3>
                <p className="text-gray-600">AI가 통화 내용, 톤, 감정을 분석합니다.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">3</div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold">맞춤형 피드백</h3>
                <p className="text-gray-600">구체적인 개선점과 실천 방안을 제시합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">자주 묻는 질문</h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-semibold">{item.question}</span>
                  {openFAQIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openFAQIndex === index && (
                  <div className="px-6 py-4 border-t">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 