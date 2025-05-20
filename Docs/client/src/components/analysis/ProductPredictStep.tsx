// import TrendKeywordChart from './TrendKeywordChart';

export default function ProductPredictStep() {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">🔥 트렌드 딱 타는 상품 골라줄게</h2>
      {/* <TrendKeywordChart /> */}
      <button className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700">
        진입 시기 자동 계산 시작
      </button>
    </div>
  );
}
