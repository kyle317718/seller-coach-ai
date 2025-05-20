// 더미 차트 컴포넌트
function CompetitionMapChart() {
  return <div className="w-full h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-blue-500 font-bold">[경쟁 지도 차트]</div>;
}
function ROASCalculator() {
  return <div className="w-full h-32 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold">[ROAS 계산기]</div>;
}
function ProfitSimulation3D() {
  return <div className="w-full h-32 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">[3D 수익 시뮬레이션]</div>;
}
function TaxTimelineChart() {
  return <div className="w-full h-20 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 font-bold">[세금 타임라인]</div>;
}

export default function DetailSection() {
  return (
    <div className="space-y-8 mt-12">
      {/* 경쟁 분석: 리얼타임 경쟁 지도 */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-bold mb-4">🗺️ 경쟁 셀러 지도</h3>
        <CompetitionMapChart />
        <p className="text-gray-600 mt-2">"여기만 피하면 1위 가능!"</p>
      </div>

      {/* 수익 시뮬레이션: 3D 인터랙티브 */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl">
        <h3 className="text-2xl font-bold mb-4">💸 광고비 ROI 예측</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ROASCalculator />
          <ProfitSimulation3D />
        </div>
        <button className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-all">
          실제 매장 데이터로 시뮬레이션 돌리기
        </button>
      </div>

      {/* 세무 가이드: 타임라인 시각화 */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-bold mb-4">📅 세금 일정 타임라인</h3>
        <TaxTimelineChart />
        <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
          ⚠️ "다음 주까지 반드시 준비할 것: 부가세 신고서"
        </div>
      </div>
    </div>
  );
} 