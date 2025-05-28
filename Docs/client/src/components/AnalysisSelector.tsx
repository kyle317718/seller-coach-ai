import { useAnalysis } from '../hooks/useAnalysis';
import { AnalysisType } from '../types/analysis';

const AnalysisSelector = () => {
  const { startAnalysis } = useAnalysis();

  const analysisOptions = [
<<<<<<< HEAD
    { type: 'market', label: '시장 분석(성공의 비밀 찾기)', desc: '1조 원 규모 시장에서 당신의 위치' },
=======
    { type: 'market', label: '시장 분석', desc: '1조 원 규모 시장에서 당신의 위치' },
>>>>>>> 69ed5420 (동기부여 말투 전체 적용 및 UI 개선 (detached HEAD 상태))
    { type: 'price', label: '가격 분석', desc: '최적 가격대 도출' },
    { type: 'competitor', label: '경쟁사 분석', desc: '5개사 가격/리뷰 비교' },
    { type: 'target', label: '타겟 분석', desc: '구매자 페르소나 정의' },
    { type: 'trend', label: '트렌드 분석', desc: '실시간 시장 트렌드' },
    { type: 'risk', label: '리스크 분석', desc: '시장 진입 위험도' }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {analysisOptions.map((option) => (
        <button 
          key={option.type}
          onClick={() => startAnalysis(option.type as AnalysisType)}
          className="analysis-card border rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
        >
          <h3 className="text-lg font-semibold mb-2">{option.label}</h3>
          <p className="text-gray-600 text-sm">{option.desc}</p>
        </button>
      ))}
    </div>
  );
};

export default AnalysisSelector;
