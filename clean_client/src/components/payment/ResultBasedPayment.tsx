import SatisfactionRating from './SatisfactionRating';
import DynamicPricingCalculator from './DynamicPricingCalculator';

export default function ResultBasedPayment() {
  return (
    <div className="p-4 bg-emerald-50 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">🎯 성공한 만큼만 내세요!</h2>
      <SatisfactionRating />
      <DynamicPricingCalculator />
      <button className="mt-4 bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700">
        결과 확인 후 결제하기
      </button>
    </div>
  );
}
