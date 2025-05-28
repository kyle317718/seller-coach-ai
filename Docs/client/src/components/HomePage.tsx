import { ArrowRightIcon, SparklesIcon, FireIcon, UserGroupIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="w-full flex justify-center pt-4 pb-2">
        <span className="inline-block text-purple-600 text-xl font-bold">
<<<<<<< HEAD
          지금 이 순간, 당신의 도전이 시작됩니다! 셀러코치.AI가 끝까지 응원할게요 💪
=======
          온라인 초보도 바로 매출 찍자!
>>>>>>> 69ed5420 (동기부여 말투 전체 적용 및 UI 개선 (detached HEAD 상태))
        </span>
      </div>
      {/* Benefit Section 바로 네비게이션바 밑으로 이동 */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
<<<<<<< HEAD
            <h2 className="text-4xl font-extrabold mb-8 text-purple-700 drop-shadow">셀러코치.AI와 함께라면, 불가능은 없습니다! 당신의 성공을 위한 특별한 지원을 만나보세요!</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
              <div className="flex flex-col items-center p-8 bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl shadow-xl hover:scale-105 transition">
                <FireIcon className="w-12 h-12 text-pink-500 mb-4 animate-bounce" />
                <div className="text-xl font-bold mb-2 text-gray-800">AI가 당신의 첫걸음부터 매출 인증까지, 든든하게 동행합니다!</div>
                <p className="text-gray-600">처음이어도 괜찮아요. 실전 노하우와 트렌드를 한 번에! 당신의 성장을 응원합니다.</p>
              </div>
              <div className="flex flex-col items-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl hover:scale-105 transition">
                <UserGroupIcon className="w-12 h-12 text-purple-500 mb-4 animate-pulse" />
                <div className="text-xl font-bold mb-2 text-gray-800">실시간 커뮤니티 & 챗봇 코칭으로 혼자라는 생각은 이제 그만!</div>
                <p className="text-gray-600">궁금한 건 언제든! AI 코치와 실시간 소통, 선배 셀러들과 함께 성장하는 경험을 누려보세요.</p>
              </div>
              <div className="flex flex-col items-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl hover:scale-105 transition">
                <ChatBubbleLeftRightIcon className="w-12 h-12 text-blue-500 mb-4 animate-bounce" />
                <div className="text-xl font-bold mb-2 text-gray-800">진짜 성공할 때만 결제! 부담은 내려놓고, 도전은 마음껏!</div>
                <p className="text-gray-600">AI 분석은 무제한! 매출이 나면 그때 결제, 당신의 가치를 믿어요.</p>
              </div>
            </div>
            <span className="inline-block mt-2 bg-purple-50 text-purple-500 text-lg font-bold rounded-full px-6 py-3 shadow-md">
                당신의 결제는 셀러코치.AI와 모두의 성장을 위한 힘! 함께 더 멀리 나아가요💜
=======
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
            <span className="inline-block mt-2 bg-purple-50 text-purple-500 text-lg font-bold rounded-full px-6 py-3 shadow-md">
                네 결제는 셀러코치.AI가 더 트렌디하게 진화하는 원동력이야! 같이 성장하자💜
>>>>>>> 69ed5420 (동기부여 말투 전체 적용 및 UI 개선 (detached HEAD 상태))
              </span>
          </div>
        </div>
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
<<<<<<< HEAD
            placeholder="분석하고 싶은 상품명이나 설명을 입력해 주세요! (예: 미니 가습기, 20대 여성 등)"
=======
            placeholder="분석할 상품명/설명 입력 (예: 미니 가습기, 20대 여성 등)"
>>>>>>> 69ed5420 (동기부여 말투 전체 적용 및 UI 개선 (detached HEAD 상태))
            className="w-full max-w-md px-4 py-3 rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-400 text-lg shadow"
            required
          />
          <button
            type="submit"
            className="relative bg-gradient-to-r from-purple-500 via-pink-400 to-blue-500 bg-[length:200%_200%] animate-gradient-x text-white px-10 py-5 rounded-2xl text-xl font-extrabold transition-all flex items-center gap-3 mx-auto shadow-2xl focus:outline-none overflow-hidden hover:scale-105"
          >
            <span className="absolute inset-0 opacity-30 blur-xl bg-gradient-to-r from-purple-400 via-pink-300 to-blue-400 animate-pulse pointer-events-none" />
            <SparklesIcon className="w-7 h-7 md:w-8 md:h-8" />
<<<<<<< HEAD
            AI 분석으로 내 가능성 확인하기
=======
            AI 분석 바로 해볼래
>>>>>>> 69ed5420 (동기부여 말투 전체 적용 및 UI 개선 (detached HEAD 상태))
            <ArrowRightIcon className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </form>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-10">
  {/* 1 */}
  <div onClick={() => router.push('/product-analysis/result?type=1')} className="cursor-pointer flex flex-col items-center p-8 bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl shadow-xl hover:scale-105 transition">
    <span className="text-4xl mb-4">🔮</span>
    <div className="text-xl font-bold mb-2 text-gray-800">1. 상품 예측</div>
    <p className="text-gray-600 text-center">트렌드 기반 상품 추천<br/>시즌성 및 진입 시기 판단<br/>신상품 추천</p>
  </div>
  {/* 2 */}
  <div onClick={() => router.push('/product-analysis/result?type=2')} className="cursor-pointer flex flex-col items-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl hover:scale-105 transition">
    <span className="text-4xl mb-4">📈</span>
    <div className="text-xl font-bold mb-2 text-gray-800">2. 시장성 분석</div>
    <p className="text-gray-600 text-center">대한민국 시장 규모, 성장성<br/>트렌드 반영도<br/>소비 흐름 및 수요 변화</p>
  </div>
  {/* 3 */}
  <div onClick={() => router.push('/product-analysis/result?type=3')} className="cursor-pointer flex flex-col items-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl hover:scale-105 transition">
    <span className="text-4xl mb-4">💡</span>
    <div className="text-xl font-bold mb-2 text-gray-800">3. 사업/위탁 전략</div>
    <p className="text-gray-600 text-center">사업 vs 위탁 적합도 분석<br/>공급망 추천 및 수익률 계산<br/>현실적인 사업 방식 제안</p>
  </div>
  {/* 4 */}
  <div onClick={() => router.push('/product-analysis/result?type=4')} className="cursor-pointer flex flex-col items-center p-8 bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl shadow-xl hover:scale-105 transition">
    <span className="text-4xl mb-4">📝</span>
    <div className="text-xl font-bold mb-2 text-gray-800">4. 판매 전 준비</div>
    <p className="text-gray-600 text-center">법적 요건 (사업자 등록 등)<br/>물류 구조 / CS 응대<br/>전체 준비 체크리스트 제공</p>
  </div>
  {/* 5 */}
  <div onClick={() => router.push('/product-analysis/result?type=5')} className="cursor-pointer flex flex-col items-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl hover:scale-105 transition">
    <span className="text-4xl mb-4">👤</span>
    <div className="text-xl font-bold mb-2 text-gray-800">5. 고객 분석</div>
    <p className="text-gray-600 text-center">타깃 고객 페르소나 정의<br/>사용 시나리오 및 페인포인트<br/>고객 인사이트 및 니즈 정리</p>
  </div>
  {/* 6 */}
  <div onClick={() => router.push('/product-analysis/result?type=6')} className="cursor-pointer flex flex-col items-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl hover:scale-105 transition">
    <span className="text-4xl mb-4">⚔️</span>
    <div className="text-xl font-bold mb-2 text-gray-800">6. 경쟁 분석</div>
    <p className="text-gray-600 text-center">경쟁 강도 분석<br/>차별화 전략 제안<br/>유사 상품과의 리스크 판단</p>
  </div>
  {/* 7 */}
  <div onClick={() => router.push('/product-analysis/result?type=7')} className="cursor-pointer flex flex-col items-center p-8 bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl shadow-xl hover:scale-105 transition">
    <span className="text-4xl mb-4">🖼️</span>
    <div className="text-xl font-bold mb-2 text-gray-800">7. 상세페이지 개선</div>
    <p className="text-gray-600 text-center">문구 카피 개선<br/>이미지 구성 제안<br/>핵심 정보 구조화</p>
  </div>
  {/* 8 */}
  <div onClick={() => router.push('/product-analysis/result?type=8')} className="cursor-pointer flex flex-col items-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl hover:scale-105 transition">
    <span className="text-4xl mb-4">📢</span>
    <div className="text-xl font-bold mb-2 text-gray-800">8. 마케팅 전략 제안</div>
    <p className="text-gray-600 text-center">콘텐츠 유형 및 키워드<br/>SNS/광고 채널 추천<br/>캠페인 전략 예시</p>
  </div>
  {/* 9 */}
  <div onClick={() => router.push('/product-analysis/result?type=9')} className="cursor-pointer flex flex-col items-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl hover:scale-105 transition">
    <span className="text-4xl mb-4">💸</span>
    <div className="text-xl font-bold mb-2 text-gray-800">9. 광고 & END ROAS 시뮬레이션</div>
    <p className="text-gray-600 text-center">광고 예산 대비 수익 시뮬레이션<br/>채널별 ROAS 예측<br/>CPA, CPC 계산 기반 광고 전략</p>
  </div>
  {/* 10 */}
  <div onClick={() => router.push('/product-analysis/result?type=10')} className="cursor-pointer flex flex-col items-center p-8 bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl shadow-xl hover:scale-105 transition">
    <span className="text-4xl mb-4">📊</span>
    <div className="text-xl font-bold mb-2 text-gray-800">10. 세무·회계 가이드</div>
    <p className="text-gray-600 text-center">매출/지출 관리 방식<br/>세금 신고 주기 및 준비물<br/>필요 시 세무사 연결 가이드</p>
  </div>
</div>


<<<<<<< HEAD
      {/* 셀러들의 생생한 성공 스토리 */}
      <div className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-extrabold text-center mb-10 text-blue-600 drop-shadow">🔥 셀러코치.AI와 함께한 셀러들의 멋진 성장기!</h3>
=======
      {/* 트렌디한 Social Proof Section */}
      <div className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-extrabold text-center mb-10 text-blue-600 drop-shadow">🔥 요즘 셀러들, 이렇게 성공 중!</h3>
>>>>>>> 69ed5420 (동기부여 말투 전체 적용 및 UI 개선 (detached HEAD 상태))
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition">
            <span className="text-4xl font-extrabold text-pink-500 mb-2">#1</span>
            <div className="text-lg font-bold mb-1">AI 분석으로 첫 매출 인증!</div>
<<<<<<< HEAD
            <p className="text-gray-600">"아무것도 몰랐던 저도, 셀러코치.AI 덕분에 첫 매출을 올렸어요! 저도 할 수 있었으니, 여러분도 분명 할 수 있습니다!"</p>
=======
            <p className="text-gray-600">"진짜 아무것도 몰랐는데, 셀러코치.AI 따라하니까 바로 첫 매출!"</p>
>>>>>>> 69ed5420 (동기부여 말투 전체 적용 및 UI 개선 (detached HEAD 상태))
            <span className="mt-3 text-xs text-gray-400">- 초보 셀러 민지</span>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition">
            <span className="text-4xl font-extrabold text-purple-500 mb-2">#2</span>
            <div className="text-lg font-bold mb-1">실시간 챗봇 코칭, 완전 신세계</div>
<<<<<<< HEAD
            <p className="text-gray-600">"모르는 건 바로바로 질문! 선배 셀러들과 소통하며, 혼자가 아니라는 든든함을 느꼈어요."</p>
=======
            <p className="text-gray-600">"모르는 거 바로 물어보고, 선배 셀러랑도 소통! 혼자 하는 느낌 1도 없음."</p>
>>>>>>> 69ed5420 (동기부여 말투 전체 적용 및 UI 개선 (detached HEAD 상태))
            <span className="mt-3 text-xs text-gray-400">- 성장 셀러 준호</span>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition">
            <span className="text-4xl font-extrabold text-blue-500 mb-2">#3</span>
            <div className="text-lg font-bold mb-1">성공하면 그때만 결제, 부담 제로</div>
<<<<<<< HEAD
            <p className="text-gray-600">"매출이 나기 전엔 0원! 성공할 때만 결제라 부담 없이 도전할 수 있었어요."</p>
=======
            <p className="text-gray-600">"매출 나기 전엔 0원! 진짜 성공하면 그때만 결제라 부담 없어서 좋음."</p>
>>>>>>> 69ed5420 (동기부여 말투 전체 적용 및 UI 개선 (detached HEAD 상태))
            <span className="mt-3 text-xs text-gray-400">- 자유 셀러 수진</span>
          </div>
        </div>
        <div className="mt-12 text-center">
          <span className="inline-block bg-white/80 text-purple-500 text-sm font-bold rounded-full px-5 py-2 shadow-md">
<<<<<<< HEAD
            여러분의 결제가 셀러코치.AI를 더 성장시키고, 더 많은 셀러의 성공을 이끌어요! 우리 함께 성장해요🔥
=======
            네가 결제해준 만큼 셀러코치.AI는 더 똑똑해지고, 더 많은 셀러를 도울 수 있어! 같이 성장하자🔥
>>>>>>> 69ed5420 (동기부여 말투 전체 적용 및 UI 개선 (detached HEAD 상태))
          </span>
        </div>
      </div>
    </div>
  );
}