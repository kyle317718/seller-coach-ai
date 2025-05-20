import { ArrowRightIcon, SparklesIcon, FireIcon, UserGroupIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
          셀러코치.AI랑 같이<br />
          온라인 초보도 바로 매출 찍자!
        </h1>
        <p className="text-2xl text-gray-700 mb-8 font-semibold">
          상품 찾기부터 매출 인증까지, AI가 다 알려주고<br />
          진짜 성공하면 그때만 결제! 부담 없이 시작해봐
        </p>
        <div className="mb-4">
          <span className="inline-block bg-white/80 text-purple-600 text-sm font-bold rounded-full px-5 py-2 shadow-md">
            네 결제는 셀러코치.AI가 더 멋지게 성장하는 힘! 네가 내는 만큼 서비스도 더 좋아질 거야 🚀
          </span>
        </div>
        <form
          className="flex flex-col items-center gap-4 mt-8"
          onSubmit={e => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const input = (form.elements.namedItem('productInput') as HTMLInputElement)?.value;
            if (input) {
              window.location.href = `/product-analysis/result?query=${encodeURIComponent(input)}`;
            }
          }}
        >
          <input
            name="productInput"
            type="text"
            placeholder="분석할 상품명/설명 입력 (예: 미니 가습기, 20대 여성 등)"
            className="w-full max-w-md px-4 py-3 rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-400 text-lg shadow"
            required
          />
          <button
            type="submit"
            className="relative bg-gradient-to-r from-purple-500 via-pink-400 to-blue-500 bg-[length:200%_200%] animate-gradient-x text-white px-10 py-5 rounded-2xl text-xl font-extrabold transition-all flex items-center gap-3 mx-auto shadow-2xl focus:outline-none overflow-hidden hover:scale-105"
          >
            <span className="absolute inset-0 opacity-30 blur-xl bg-gradient-to-r from-purple-400 via-pink-300 to-blue-400 animate-pulse pointer-events-none" />
            <SparklesIcon className="w-7 h-7 md:w-8 md:h-8" />
            AI 분석 바로 해볼래
            <ArrowRightIcon className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </form>
      </div>

      {/* 트렌디한 Benefit Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-extrabold mb-8 text-purple-700 drop-shadow">이런 게 바로 셀러코치.AI만의 매력!</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
              <div className="flex flex-col items-center p-8 bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl shadow-xl hover:scale-105 transition">
                <FireIcon className="w-12 h-12 text-pink-500 mb-4 animate-bounce" />
                <div className="text-xl font-bold mb-2 text-gray-800">AI가 상품 소싱부터 매출 인증까지 다 알려줌</div>
                <p className="text-gray-600">초보도 바로 따라할 수 있게, 실전 노하우+트렌드까지 한 번에!</p>
              </div>
              <div className="flex flex-col items-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl hover:scale-105 transition">
                <UserGroupIcon className="w-12 h-12 text-purple-500 mb-4 animate-pulse" />
                <div className="text-xl font-bold mb-2 text-gray-800">실시간 커뮤니티 & 챗봇 코칭</div>
                <p className="text-gray-600">궁금한 건 바로바로! AI 코치랑 실시간으로 소통하고, 셀러 선배들과 정보 교류까지!</p>
              </div>
              <div className="flex flex-col items-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl hover:scale-105 transition">
                <ChatBubbleLeftRightIcon className="w-12 h-12 text-blue-500 mb-4 animate-bounce" />
                <div className="text-xl font-bold mb-2 text-gray-800">성공하면 그때만 결제, 부담 제로</div>
                <p className="text-gray-600">AI 분석 다 써보고, 진짜 매출 나면 그때만 결제! 네가 생각한 가치만큼만 내면 돼.</p>
              </div>
            </div>
            <p className="text-purple-600 text-lg font-bold mt-8">
              ※ 얼마 낼지는 네 마음대로! 분석 끝나고 얻은 가치 만큼 그때 결제해~<br />
              <span className="inline-block mt-2 bg-purple-50 text-purple-500 text-xs font-semibold rounded-full px-4 py-1 shadow-sm">
                네 결제는 셀러코치.AI가 더 트렌디하게 진화하는 원동력이야! 같이 성장하자💜
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* 트렌디한 Social Proof Section */}
      <div className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-extrabold text-center mb-10 text-blue-600 drop-shadow">🔥 요즘 셀러들, 이렇게 성공 중!</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition">
            <span className="text-4xl font-extrabold text-pink-500 mb-2">#1</span>
            <div className="text-lg font-bold mb-1">AI 분석으로 첫 매출 인증!</div>
            <p className="text-gray-600">"진짜 아무것도 몰랐는데, 셀러코치.AI 따라하니까 바로 첫 매출!"</p>
            <span className="mt-3 text-xs text-gray-400">- 초보 셀러 민지</span>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition">
            <span className="text-4xl font-extrabold text-purple-500 mb-2">#2</span>
            <div className="text-lg font-bold mb-1">실시간 챗봇 코칭, 완전 신세계</div>
            <p className="text-gray-600">"모르는 거 바로 물어보고, 선배 셀러랑도 소통! 혼자 하는 느낌 1도 없음."</p>
            <span className="mt-3 text-xs text-gray-400">- 성장 셀러 준호</span>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition">
            <span className="text-4xl font-extrabold text-blue-500 mb-2">#3</span>
            <div className="text-lg font-bold mb-1">성공하면 그때만 결제, 부담 제로</div>
            <p className="text-gray-600">"매출 나기 전엔 0원! 진짜 성공하면 그때만 결제라 부담 없어서 좋음."</p>
            <span className="mt-3 text-xs text-gray-400">- 자유 셀러 수진</span>
          </div>
        </div>
        <div className="mt-12 text-center">
          <span className="inline-block bg-white/80 text-purple-500 text-sm font-bold rounded-full px-5 py-2 shadow-md">
            네가 결제해준 만큼 셀러코치.AI는 더 똑똑해지고, 더 많은 셀러를 도울 수 있어! 같이 성장하자🔥
          </span>
        </div>
      </div>
    </div>
  );
}