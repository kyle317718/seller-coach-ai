import React from 'react';
import { useRouter } from 'next/navigation';

const STEPS = [
<<<<<<< HEAD
  { id: 1, title: "시장 분석(성공의 기회 찾기)" },
  { id: 2, title: "가격 분석(가치의 발견)" },
  { id: 3, title: "경쟁사 분석(차별화 전략)" },
  { id: 4, title: "타겟 분석(고객의 마음 읽기)" },
  { id: 5, title: "트렌드 분석(미래를 선점)" },
  { id: 6, title: "리스크 분석(위기를 기회로)" },
  { id: 7, title: "상세페이지(매력 어필)" },
  { id: 8, title: "마케팅(성장 가속화)" },
=======
  { id: 1, title: "시장 분석" },
  { id: 2, title: "가격 분석" },
  { id: 3, title: "경쟁사 분석" },
  { id: 4, title: "타겟 분석" },
  { id: 5, title: "트렌드 분석" },
  { id: 6, title: "리스크 분석" },
  { id: 7, title: "상세페이지" },
  { id: 8, title: "마케팅" },
>>>>>>> 69ed5420 (동기부여 말투 전체 적용 및 UI 개선 (detached HEAD 상태))
];

export default function AnalysisMenuBar({ horizontal = false, buttonColor = "blue" }: { horizontal?: boolean, buttonColor?: "blue" | "white" }) {
  const router = useRouter();
  const buttonClass = buttonColor === "blue"
    ? "bg-blue-500 hover:bg-blue-700 text-white"
    : "bg-white hover:bg-blue-200 text-blue-800";
  return (
    <div className={`bg-blue-100 rounded-lg shadow-lg p-2 ${horizontal ? 'flex flex-row items-center space-x-2' : 'flex flex-col items-end space-y-2'}`}>
      {STEPS.map((step) => (
        <button
          key={step.id}
          className={`${buttonClass} font-bold py-1 px-3 rounded transition`}
        >
          {step.title}
        </button>
      ))}
    </div>
  );
} 