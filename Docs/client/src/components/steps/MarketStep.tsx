import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MarketStep = ({ data }: { data?: any }) => (
  <div>
    <h3 className="text-lg font-extrabold mb-2 text-purple-700 flex items-center gap-2"><span role="img" aria-label="market">📊</span> 시장성 분석 - AI 코치의 인사이트!</h3>
    <p className="text-base text-gray-700 mb-2">시장 크기, 성장률, 계절성까지 내가 싹 다 분석해줬어! 트렌드 놓치면 손해~ ��</p>
    {data ? (
      <>
        <div className="bg-white/80 p-4 rounded-xl mt-2 text-base space-y-1 shadow">
          <div><b className="text-blue-600">시장 규모:</b> {data.tam}</div>
          <div><b className="text-pink-500">성장률:</b> {data.growthRate}%</div>
          <div><b className="text-purple-500">계절성:</b> {data.seasonality}</div>
        </div>
        <div className="mt-6">
          <Bar
            data={{
              labels: ['시장 규모', '성장률', '계절성'],
              datasets: [
                {
                  label: '시장성 지표',
                  data: [Number(data.tam), Number(data.growthRate), Number(data.seasonality)],
                  backgroundColor: [
                    'rgba(59,130,246,0.7)', // blue
                    'rgba(236,72,153,0.7)', // pink
                    'rgba(139,92,246,0.7)', // purple
                  ],
                  borderRadius: 12,
                },
              ],
            }}
            options={{
              plugins: {
                legend: { display: false },
                title: { display: false },
              },
              scales: {
                y: { beginAtZero: true },
              },
              responsive: true,
              maintainAspectRatio: false,
            }}
            height={200}
          />
  </div>
      </>
    ) : (
      <div className="bg-gray-50 p-4 rounded mt-2 text-sm text-gray-400">아직 데이터 없어! 상품명 입력하고 분석 한 번 돌려봐~ 😊</div>
    )}
  </div>
);

export default MarketStep;
