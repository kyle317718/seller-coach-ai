import React from 'react';

const LogisticsStep = ({ data }: { data?: any }) => (
  <div>
    <h3 className="text-lg font-extrabold mb-2 text-yellow-600 flex items-center gap-2"><span role="img" aria-label="logistics">🚚</span> 물류 분석 - AI 코치의 배송 꿀팁!</h3>
    <p className="text-base text-gray-700 mb-2">배송, 재고, 물류 최적화까지 AI가 실전에서 통하는 노하우를 알려드려요! 📦</p>
    {data ? (
      <div className="bg-white/80 p-4 rounded-xl mt-2 text-base space-y-1 shadow">
        <div><b className="text-yellow-600">배송 전략:</b> {data.shipping}</div>
        <div><b className="text-blue-600">재고 관리:</b> {data.inventory}</div>
        <div><b className="text-green-600">물류 팁:</b> {data.tip}</div>
      </div>
    ) : (
      <div className="bg-gray-50 p-4 rounded mt-2 text-sm text-gray-400">아직 데이터가 없어요. 상품명을 입력하고 분석을 시작해보세요! 😊</div>
    )}
  </div>
);

export default LogisticsStep;
