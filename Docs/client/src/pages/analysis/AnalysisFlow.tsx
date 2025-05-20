import { useParams } from 'react-router-dom';
import ProgressBar from '@/components/ProgressBar';
import AnalysisNav from '@/components/AnalysisNav';
import { MARKET_DATA, PRICE_DATA, COMPETITOR_DATA, TARGET_DATA, TREND_DATA, RISK_DATA, DETAIL_DATA, MARKETING_DATA } from '@/api/mockApi';
import MarketStep from './steps/MarketStep';
import PriceStep from './steps/PriceStep';
import CompetitorStep from './steps/CompetitorStep';
import TargetStep from './steps/TargetStep';
import TrendStep from './steps/TrendStep';
import RiskStep from './steps/RiskStep';
import DetailStep from './steps/DetailStep';
import MarketingStep from './steps/MarketingStep';

const STEP_COMPONENTS: Record<number, React.ReactElement> = {
  1: <MarketStep data={MARKET_DATA} />,
  2: <PriceStep data={PRICE_DATA} />,
  3: <CompetitorStep data={COMPETITOR_DATA} />,
  4: <TargetStep data={TARGET_DATA} />,
  5: <TrendStep data={TREND_DATA} />,
  6: <RiskStep data={RISK_DATA} />,
  7: <DetailStep data={DETAIL_DATA} />,
  8: <MarketingStep data={MARKETING_DATA} />,
  9: <div>9단계 (추가 필요)</div>,
  10: <div>10단계 (추가 필요)</div>,
};

export default function AnalysisFlow() {
  const { stepId } = useParams();
  const currentStep = Number(stepId) || 1;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ProgressBar currentStep={currentStep} totalSteps={10} />
      <div className="my-8 p-6 border rounded-lg dark:bg-gray-800 dark:text-white">
        {STEP_COMPONENTS[currentStep]}
      </div>
      <AnalysisNav steps={["시장성 분석","가격 분석","경쟁사 분석","타겟 분석","트렌드 분석","리스크 분석","상세페이지 개선","마케팅 전략","9단계","10단계"]} currentStep={currentStep} />
      <button 
        onClick={() => window.print()}
        className="print:hidden bg-gray-800 text-white px-4 py-2 rounded mt-4"
      >
        PDF 저장
      </button>
    </div>
  );
}
