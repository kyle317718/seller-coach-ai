import React from 'react';

// 임시 더미 데이터 및 컴포넌트
const marketData = {
  labels: ['2020', '2021', '2022', '2023'],
  datasets: [
    {
      label: '시장 규모',
      data: [100, 150, 200, 250],
      backgroundColor: 'rgba(99, 102, 241, 0.5)',
    },
  ],
};

const Bar = ({ data }: { data?: any }) => (
  <div style={{height: 200, background: '#eee', textAlign: 'center', lineHeight: '200px'}}>
    {data ? (
      <>
        <div><b>시장 규모:</b> {data.size}</div>
        <div><b>성장률:</b> {data.growth}</div>
      </>
    ) : 'Bar Chart Placeholder'}
  </div>
);
const TrendMatchingIndicator = ({ data }: { data?: any }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg">
    실시간 트렌드 일치율: {data?.trendMatch ?? 'N/A'}
  </div>
);

export default function MarketAnalysisStep() {
  // 시장 규모 차트
  const MarketSizeChart = () => (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">📊 국내 시장 규모 추이</h3>
      <Bar />
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <MarketSizeChart />
      <TrendMatchingIndicator />
    </div>
  );
}
