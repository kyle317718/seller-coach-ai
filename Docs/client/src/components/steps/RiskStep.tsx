import React from 'react';

const RiskStep = ({ data }: { data?: any }) => (
  <div>
    <h3 className="text-lg font-extrabold mb-2 text-red-500 flex items-center gap-2"><span role="img" aria-label="risk">⚠️</span> 리스크 분석 - AI 코치의 주의사항!</h3>
    <p className="text-base text-gray-700 mb-2">진입장벽, 계절성, 위험요소까지 내가 미리 싹 다 체크해줬어! 미리 대비하면 걱정 끝~ 🛡️</p>
    {data ? (
      <div className="bg-white/80 p-4 rounded-xl mt-2 text-base space-y-1 shadow">
        <div><b className="text-red-500">주요 리스크:</b> {data.main}</div>
        <div><b className="text-blue-600">대응 전략:</b> {data.solution}</div>
  </div>
    ) : (
      <div className="bg-gray-50 p-4 rounded mt-2 text-sm text-gray-400">아직 데이터 없어! 상품명 입력하고 분석 한 번 돌려봐~ 😊</div>
    )}
  </div>
);

export default RiskStep;
