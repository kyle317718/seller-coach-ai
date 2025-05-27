import { useNavigate } from 'react-router-dom';
// import HeaderNavBar from '../components/HeaderNavBar';
// import AnalysisMenuBar from '../components/AnalysisMenuBar';

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
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-fit">
        <span className="inline-block bg-white/80 text-purple-600 text-lg font-bold rounded-full px-8 py-3 shadow-md">
          당신의 선택이 셀러코치.AI를 더 강하게 만듭니다! 함께 성장하며, 최고의 성공을 만들어가요! 🚀
        </span>
      </div>
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
    </div>
  );
}
