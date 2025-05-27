import { useRouter } from "next/navigation";
import { ProductAnalysis } from "@/components/ProductAnalysis";

// 예시 데이터 (실제론 API에서 받아오면 됨)
const analysisData = [
  {
    id: "1",
    category: "상품 예측",
    title: "상품 예측 결과",
    description: "상품의 판매 예측 결과입니다.",
    details: ["예상 판매량: 1000개", "성장률: 15%", "주요 타겟: 20~30대"]
  },
  {
    id: "2",
    category: "시장성 분석",
    title: "시장성 분석 결과",
    description: "시장성에 대한 분석 결과입니다.",
    details: ["시장 규모: 500억", "경쟁사 수: 10개", "진입장벽: 낮음"]
  },
  // ... 나머지 카테고리도 추가 가능
];

export default function AnalysisDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const result = analysisData.find(item => item.id === id);

  if (!result) return <div className="p-8 text-center">404 | 분석 결과가 없습니다.</div>;

  return (
    <div>
      <BlueNavBar activeId={id} />
      <div className="mt-8">
        <ProductAnalysis analysisResults={[result]} />
      </div>
    </div>
  );
}

function BlueNavBar({ activeId }: { activeId: string }) {
  const router = useRouter();
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
  return (
    <div className="flex bg-blue-500 p-2 rounded">
      {navItems.map(item => (
        <button
          key={item.id}
          className={`px-4 py-2 mx-1 rounded text-white font-semibold transition-colors duration-150 ${activeId === item.id ? "bg-blue-700" : "bg-blue-400 hover:bg-blue-600"}`}
          onClick={() => router.push(`/analysis/${item.id}`)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
