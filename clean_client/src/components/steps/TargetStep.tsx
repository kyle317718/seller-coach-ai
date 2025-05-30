import React from 'react';

const TargetStep = ({ data }: { data?: any }) => (
  <div>
    <h3 className="text-lg font-extrabold mb-2 text-purple-700 flex items-center gap-2"><span role="img" aria-label="target">🎯</span> 타겟 분석 - AI 코치의 맞춤 조언!</h3>
    <p className="text-base text-gray-700 mb-2">주요 고객층, 연령대, 성별까지 내가 싹 다 분석해줬어! 내 상품에 딱 맞는 고객, 이제 바로 잡아가~ 🕵️‍♂️</p>
    {data ? (
      <div className="bg-white/80 p-4 rounded-xl mt-2 text-base space-y-1 shadow">
        <div><b className="text-blue-600">주요 타겟:</b> {data.main}</div>
        <div><b className="text-pink-500">연령대:</b> {data.age}</div>
        <div><b className="text-purple-500">성별:</b> {data.gender}</div>
  </div>
    ) : (
      <div className="bg-gray-50 p-4 rounded mt-2 text-sm text-gray-400">아직 데이터 없어! 상품명 입력하고 분석 한 번 돌려봐~ 😊</div>
    )}
  </div>
);

export default TargetStep;
