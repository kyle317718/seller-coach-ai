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

const CompetitorStep = ({ data }: { data?: any }) => {
  console.log('경쟁사 분석 데이터:', data);
  console.log('competitors:', data?.competitors);

  return (
  <div>
      <h3 className="text-lg font-extrabold mb-2 text-blue-700 flex items-center gap-2"><span role="img" aria-label="competitor">🦾</span> 경쟁사 분석 - AI 코치의 전략 간파!</h3>
      <p className="text-base text-gray-700 mb-2">주요 경쟁사랑 차별화 포인트, 내가 싹 다 비교해줬어! 네 강점도 놓치지 말고 챙겨가~ 💪</p>
    {data ? (
        <>
          <div className="bg-white/80 p-4 rounded-xl mt-2 text-base space-y-1 shadow">
            <div><b className="text-blue-600">주요 경쟁사:</b> {data.main}</div>
            <div><b className="text-pink-500">차별화 포인트:</b> {data.diff}</div>
          </div>
          {Array.isArray(data.competitors) && data.competitors.length > 0 && (
            <div className="mt-6">
              <Bar
                data={{
                  labels: data.competitors.map((c:any) => c.name),
                  datasets: [
                    {
                      label: '경쟁 강도',
                      data: data.competitors.map((c:any) => c.strength),
                      backgroundColor: 'rgba(59,130,246,0.7)',
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
          )}
        </>
      ) : (
        <div className="bg-gray-50 p-4 rounded mt-2 text-sm text-gray-400">아직 데이터 없어! 상품명 입력하고 분석 한 번 돌려봐~ 😊</div>
      )}
  </div>
);
};

export default CompetitorStep;
