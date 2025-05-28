import React, { useState } from 'react';

interface Props {
  onAnalyze: (productName: string) => void;
}

export default function AnalysisForm({ onAnalyze }: Props) {
  const [input, setInput] = useState('');
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (input.trim()) onAnalyze(input.trim());
      }}
      className="flex flex-col items-center gap-4 p-8 bg-white rounded-xl shadow-md max-w-md mx-auto mt-12"
    >
<<<<<<< HEAD
      <h2 className="text-2xl font-bold text-orange-600 mb-2">성공의 첫걸음! 분석할 상품명을 입력해 주세요</h2>
=======
      <h2 className="text-2xl font-bold text-orange-600 mb-2">분석할 상품명을 입력하세요</h2>
>>>>>>> 69ed5420 (동기부여 말투 전체 적용 및 UI 개선 (detached HEAD 상태))
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
<<<<<<< HEAD
        placeholder="예: 손톱깎이 (당신의 아이디어가 성공의 씨앗입니다!)"
=======
        placeholder="예: 손톱깎이"
>>>>>>> 69ed5420 (동기부여 말투 전체 적용 및 UI 개선 (detached HEAD 상태))
        className="border border-orange-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <button
        type="submit"
        className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
      >
<<<<<<< HEAD
        AI 분석으로 성장 시작하기
=======
        AI 분석 시작
>>>>>>> 69ed5420 (동기부여 말투 전체 적용 및 UI 개선 (detached HEAD 상태))
      </button>
    </form>
  );
}