import { TrendingUp, Package, CheckSquare, BarChart2, Users, ShieldAlert, FileText, Megaphone, BrainCircuit, Upload, Target, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

// FAQ 아이템 컴포넌트
const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-800 hover:text-indigo-600 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className="mt-3 text-gray-600 text-sm leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage = ({ onNavigate }: HomePageProps) => (
  <div className="space-y-16 md:space-y-24">
    {/* Hero 섹션 */}
    <section className="text-center py-16 md:py-24 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
        AI 셀러 코치와 함께<br className="sm:hidden"/> 성공적인 판매를 시작하세요! <span role="img" aria-label="로켓">🚀</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        상품 준비부터 판매 전략까지, 복잡한 온라인 판매 과정을 AI가 단계별로 쉽게 안내합니다.
      </p>
      <button
        onClick={() => onNavigate('analysis')}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
      >
        지금 바로 분석 시작하기
      </button>
    </section>

    {/* 서비스 소개 섹션 */}
    <section className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">셀러코치.AI, 무엇이 다른가요?</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {/* 카드 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <div className="text-indigo-600 mb-4"><BrainCircuit size={40} /></div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">AI 기반 8단계 분석</h3>
          <p className="text-gray-600 text-sm">초보 셀러 맞춤형! 상품 소싱부터 마케팅까지 전 과정을 체계적으로 분석하고 가이드합니다.</p>
        </div>
        {/* 카드 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <div className="text-indigo-600 mb-4"><Upload size={40} /></div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">다양한 입력 방식</h3>
          <p className="text-gray-600 text-sm">텍스트, 상품 이미지, 심지어 음성으로도 분석을 요청할 수 있어 편리합니다.</p>
        </div>
        {/* 카드 3 */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <div className="text-indigo-600 mb-4"><Target size={40} /></div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">실행 중심 전략 제시</h3>
          <p className="text-gray-600 text-sm">단순 분석을 넘어, 실제 판매에 적용 가능한 상세페이지 개선안, 마케팅 문구 등을 제공합니다.</p>
        </div>
      </div>
    </section>

    {/* 분석 기능 안내 섹션 */}
    <section className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">AI가 분석하는 8단계 프로세스</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {/* 각 단계 카드 */}
        {[
          { icon: <TrendingUp size={24}/>, title: "상품 예측" },
          { icon: <Package size={24}/>, title: "사입/위탁 안내" },
          { icon: <CheckSquare size={24}/>, title: "판매 전 준비" },
          { icon: <BarChart2 size={24}/>, title: "시장성 분석" },
          { icon: <Users size={24}/>, title: "고객 분석" },
          { icon: <ShieldAlert size={24}/>, title: "경쟁 분석" },
          { icon: <FileText size={24}/>, title: "상세페이지 개선" },
          { icon: <Megaphone size={24}/>, title: "마케팅 전략" },
        ].map((step, index) => (
          <div key={index} className="bg-indigo-50 p-4 rounded-lg text-center shadow-sm hover:shadow-md transition duration-300">
            <div className="text-indigo-600 mb-2 inline-block">{step.icon}</div>
            <p className="font-semibold text-sm text-gray-700">{`Step ${index + 1}`}</p>
            <p className="text-md font-medium text-gray-800">{step.title}</p>
          </div>
        ))}
      </div>
      <p className="text-center mt-8 text-gray-600">
        이 모든 과정을 '분석하기' 페이지에서 한눈에 확인하고 관리할 수 있습니다.
      </p>
    </section>

    {/* FAQ 섹션 */}
    <section className="container mx-auto px-6 max-w-3xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">자주 묻는 질문 (FAQ)</h2>
      <div className="space-y-4">
        <FaqItem
          question="셀러코치.AI는 어떤 셀러에게 도움이 되나요?"
          answer="온라인 판매를 처음 시작하는 초보 셀러, 판매 상품을 찾고 있는 예비 셀러, 혹은 현재 판매 전략에 어려움을 겪고 있는 기존 셀러 모두에게 유용합니다. 특히 상품 소싱부터 마케팅까지 전 과정에 대한 가이드가 필요한 분들께 큰 도움이 될 수 있습니다."
        />
        <FaqItem
          question="분석 결과는 얼마나 정확한가요?"
          answer="셀러코치.AI는 최신 AI 기술(DeepSeek 등)과 다양한 데이터 소스(향후 Google Trends 등 연동 예정)를 기반으로 분석을 제공합니다. 하지만 시장 상황은 항상 변동 가능하므로, 분석 결과는 전략 수립을 위한 참고 자료로 활용하시고 최종 결정은 셀러 본인의 판단 하에 진행하시는 것을 권장합니다."
        />
        <FaqItem
          question="이미지나 음성 입력은 어떻게 사용하나요?"
          answer="'분석하기' 페이지에서 해당 입력 방식을 선택하고 안내에 따라 파일을 업로드하거나 마이크 버튼을 눌러 음성을 녹음하면 됩니다. 이미지의 경우 상품 사진이나 경쟁사 제품 사진 등을 업로드하여 분석에 활용할 수 있습니다."
        />
      </div>
    </section>
  </div>
); 