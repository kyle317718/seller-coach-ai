import { TrendingUpIcon, BoltIcon as ZapIcon, BullseyeIcon } from '@heroicons/react/24/solid';

// 더미 데이터
const trendData = [12, 18, 25, 40, 32];
const marketData = [80, 65, 90, 70, 82];

// TrendChart, MarketRadarChart 더미 컴포넌트
function TrendChart({ data }) {
  return (
    <div className="w-full h-16 bg-gradient-to-r from-[#8A4FFF22] to-[#2563EB22] rounded-lg flex items-end gap-1 p-1">
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-full"
          style={{
            height: `${v}%`,
            background: 'linear-gradient(180deg, #8A4FFF 0%, #2563EB 100%)',
            borderRadius: '8px',
            transition: 'height 0.2s',
          }}
        />
      ))}
    </div>
  );
}
function MarketRadarChart({ data }) {
  return (
    <div className="w-full flex justify-center items-center">
      <svg width="80" height="80" viewBox="0 0 80 80">
        <defs>
          <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8A4FFF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.3" />
          </radialGradient>
        </defs>
        <polygon points="40,10 70,40 40,70 10,40" fill="url(#radarGrad)" stroke="#8A4FFF" strokeWidth="2" />
        <circle cx="40" cy="40" r="30" fill="none" stroke="#2563EB" strokeWidth="2" />
        <text x="40" y="45" textAnchor="middle" fontSize="16" fill="#10B981" fontFamily="Pretendard, sans-serif" fontWeight="bold">82%</text>
      </svg>
    </div>
  );
}

export default function SummarySection() {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-2xl shadow-xl font-pretendard">
      <h2 className="text-3xl font-semibold mb-6 bg-gradient-to-r from-[#8A4FFF] to-[#2563EB] bg-clip-text text-transparent font-pretendard">
        🔥 한눈에 보는 핵심 인사이트
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 트렌드 분석 카드 */}
        <div className="bg-white p-6 rounded-xl hover:scale-[1.02] transition-transform duration-200 shadow font-pretendard">
          <TrendingUpIcon className="w-8 h-8 mb-4" style={{ color: '#8A4FFF' }} />
          <h3 className="text-xl font-semibold mb-2 text-[#8A4FFF] font-pretendard">지금 폭발하는 상품</h3>
          <TrendChart data={trendData} />
          <p className="text-sm text-gray-600 mt-2 font-normal">"이번 주 최고 급상승 키워드"</p>
        </div>

        {/* 시장 분석 카드 */}
        <div className="bg-white p-6 rounded-xl hover:scale-[1.02] transition-transform duration-200 shadow font-pretendard">
          <ZapIcon className="w-8 h-8 mb-4" style={{ color: '#2563EB' }} />
          <h3 className="text-xl font-semibold mb-2 text-[#2563EB] font-pretendard">초토화된 시장 현황</h3>
          <MarketRadarChart data={marketData} />
          <p className="text-sm text-gray-600 mt-2 font-normal">"진입 가능성 <span className='text-[#10B981] font-bold'>82%</span> 🚀"</p>
        </div>

        {/* 추천 전략 카드 */}
        <div className="bg-white p-6 rounded-xl hover:scale-[1.02] transition-transform duration-200 shadow font-pretendard">
          <BullseyeIcon className="w-8 h-8 mb-4" style={{ color: '#10B981' }} />
          <h3 className="text-xl font-semibold mb-2 text-[#10B981] font-pretendard">AI 추천 작전</h3>
          <ul className="list-disc pl-5 space-y-2 font-normal">
            <li>광고 채널: 인스타그램 Reels</li>
            <li>최적 가격대: 49,000원</li>
            <li>주요 리스크: 유사품 23개</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 