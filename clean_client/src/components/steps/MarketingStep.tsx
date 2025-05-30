import React from 'react';

const MarketingStep = ({ data }: { data?: any }) => (
  <div>
    <h3 className="text-lg font-extrabold mb-2 text-green-600 flex items-center gap-2"><span role="img" aria-label="marketing">📢</span> 마케팅 분석 - AI 코치의 실전 전략!</h3>
    <p className="text-base text-gray-700 mb-2">광고 채널, 예산, 실전 마케팅 전략까지 내가 싹 다 추천해줄게! 📈</p>
    {data ? (
      <div className="bg-white/80 p-4 rounded-xl mt-2 text-base space-y-1 shadow">
        <div><b className="text-green-600">추천 채널:</b> {data.channel}</div>
        <div><b className="text-blue-600">예산 제안:</b> {data.budget}</div>
        <div><b className="text-pink-500">실전 전략:</b> {data.strategy}</div>
  </div>
    ) : (
      <div className="bg-gray-50 p-4 rounded mt-2 text-sm text-gray-400">아직 데이터 없어! 상품명 입력하고 분석 한 번 돌려봐~ 😊</div>
    )}
  </div>
);

export default MarketingStep;
