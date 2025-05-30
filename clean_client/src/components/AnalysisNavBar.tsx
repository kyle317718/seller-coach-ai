"use client";
import { useRouter } from "next/navigation";

const navItems = [
  { id: "1", label: "상품 예측" },
  { id: "2", label: "시장성 분석" },
  { id: "3", label: "사업/위탁 전략" },
  { id: "4", label: "판매 전 준비" },
  { id: "5", label: "고객 분석" },
  { id: "6", label: "경쟁 분석" },
  { id: "7", label: "상세페이지 개선" },
  { id: "8", label: "마케팅 전략 제안" },
  { id: "9", label: "광고 & END ROAS 시뮬레이션" },
  { id: "10", label: "세무·회계 가이드" },
];

export default function AnalysisNavBar({ activeId }: { activeId: string }) {
  const router = useRouter();
  return (
    <div className="flex bg-blue-500 p-2 rounded mt-4 mb-8 overflow-x-auto">
      {navItems.map(item => (
        <button
          key={item.id}
          className={`px-4 py-2 mx-1 rounded text-white font-semibold whitespace-nowrap transition-colors duration-150 ${activeId === item.id ? "bg-blue-700" : "bg-blue-400 hover:bg-blue-600"}`}
          onClick={() => router.push(`/analysis/${item.id}`)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
