import React from 'react';

interface PatentData {
  patent: string;
  copyright: string;
  tip: string;
}

export default function PatentStep({ data }: { data?: PatentData }) {
  return (
    <div>
      <h3 className="text-lg font-extrabold mb-2 text-indigo-600 flex items-center gap-2"><span role="img" aria-label="patent">🛡️</span> 특허/지식재산 분석 - AI 코치의 안전 가이드!</h3>
      <p className="text-base text-gray-700 mb-2">특허, 상표, 저작권 등 지식재산권 이슈까지 내가 싹 다 체크해줬어! 안전하게 사업하자~ 😊</p>
      {data ? (
        <div className="bg-white/80 p-4 rounded-xl mt-2 text-base space-y-1 shadow">
          <div><b className="text-indigo-600">특허 이슈:</b> {data.patent}</div>
          <div><b className="text-blue-600">상표/저작권:</b> {data.copyright}</div>
          <div><b className="text-pink-500">AI 코치의 조언:</b> {data.tip}</div>
        </div>
      ) : (
        <div className="bg-gray-50 p-4 rounded mt-2 text-sm text-gray-400">아직 데이터 없어! 상품명 입력하고 분석 한 번 돌려봐~ 😊</div>
      )}
    </div>
  );
}
