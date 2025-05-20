import { useNavigate } from 'react-router-dom';

const STEPS = [
  { id: 1, title: "시장 분석", icon: "📊", color: "bg-blue-100" },
  { id: 2, title: "가격 분석", icon: "💰", color: "bg-green-100" },
  { id: 3, title: "경쟁사 분석", icon: "🥇", color: "bg-yellow-100" },
  { id: 4, title: "타겟 분석", icon: "🎯", color: "bg-pink-100" },
  { id: 5, title: "트렌드 분석", icon: "📈", color: "bg-purple-100" },
  { id: 6, title: "리스크 분석", icon: "⚠️", color: "bg-red-100" },
  { id: 7, title: "상세페이지 최적화", icon: "🖥️", color: "bg-gray-100" },
  { id: 8, title: "마케팅 전략", icon: "📢", color: "bg-indigo-100" },
];

export default function MainPage() {
  if (typeof window === 'undefined') {
    return null;
  }
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {STEPS.map((step) => (
        <div 
          key={step.id}
          onClick={() => navigate(`/analysis/${step.id}`)}
          className={`${step.color} p-6 rounded-lg cursor-pointer transition hover:scale-105`}
        >
          <div className="text-3xl mb-2">{step.icon}</div>
          <h3 className="font-bold">{step.title}</h3>
        </div>
      ))}
    </div>
  );
}
