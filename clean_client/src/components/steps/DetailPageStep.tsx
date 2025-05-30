import React from 'react';

const DetailPageStep = ({ data }: { data?: any }) => (
  <div>
    <h3 className="text-lg font-extrabold mb-2 text-orange-600 flex items-center gap-2"><span role="img" aria-label="detail">📝</span> 상세페이지 분석 - AI 코치의 실전 팁!</h3>
    <p className="text-base text-gray-700 mb-2">상세페이지 구성, 주요 포인트, 실전에서 통하는 꿀팁까지 내가 싹 다 알려줄게! 🏆</p>
    {data ? (
      <div className="bg-white/80 p-4 rounded-xl mt-2 text-base space-y-1 shadow">
        <div><b className="text-orange-600">핵심 포인트:</b> {data.point}</div>
        <div><b className="text-blue-600">추천 구성:</b> {data.recommend}</div>
  </div>
    ) : (
      <div className="bg-gray-50 p-4 rounded mt-2 text-sm text-gray-400">아직 데이터 없어! 상품명 입력하고 분석 한 번 돌려봐~ 😊</div>
    )}
  </div>
);

export default DetailPageStep;
