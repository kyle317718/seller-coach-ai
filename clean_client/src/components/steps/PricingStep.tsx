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

const PricingStep = ({ data }: { data?: any }) => (
  <div>
    <h3 className="text-lg font-extrabold mb-2 text-pink-600 flex items-center gap-2"><span role="img" aria-label="price">💸</span> 가격 분석 - AI 코치의 추천!</h3>
    <p className="text-base text-gray-700 mb-2">이 가격대가 딱이야! 마진도 챙기고, 수익 극대화 꿀팁도 내가 알려줄게 ��</p>
    {data ? (
      <>
        <div className="bg-white/80 p-4 rounded-xl mt-2 text-base space-y-1 shadow">
          <div><b className="text-pink-500">최적 가격:</b> {data.optimal}</div>
          <div><b className="text-purple-600">권장 범위:</b> {data.range}</div>
        </div>
        <div className="mt-6">
          <Bar
            data={{
              labels: ['최적 가격', '권장 범위'],
              datasets: [
                {
                  label: '가격 비교',
                  data: [Number(data.optimal), Number((data.range||'').split('~')[1] || data.optimal)],
                  backgroundColor: [
                    'rgba(236,72,153,0.7)', // pink
                    'rgba(139,92,246,0.7)', // purple
                  ],
                  borderRadius: 12,
                  barPercentage: 0.5,
                  categoryPercentage: 0.5,
                },
              ],
            }}
            options={{
              indexAxis: 'y',
              plugins: {
                legend: { display: false },
                title: { display: false },
              },
              scales: {
                x: { beginAtZero: true },
              },
              responsive: true,
              maintainAspectRatio: false,
            }}

          />
  </div>
      </>
    ) : (
      <div className="bg-gray-50 p-4 rounded mt-2 text-sm text-gray-400">아직 데이터 없어! 상품명 입력하고 분석 한 번 돌려봐~ 😊</div>
    )}
  </div>
);

export default PricingStep;
