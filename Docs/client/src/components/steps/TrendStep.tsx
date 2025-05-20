import React from 'react';
import '@/chartjs-setup';
import { Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const TrendStep = ({ data }: { data?: any }) => (
  <div>
    <h3 className="text-lg font-extrabold mb-2 text-blue-500 flex items-center gap-2"><span role="img" aria-label="trend">📈</span> 트렌드 분석 - AI 코치의 트렌디 인사이트!</h3>
    <p className="text-base text-gray-700 mb-2">최신 트렌드, 인기 키워드, 내가 실시간으로 싹 다 분석해줬어! 유행 놓치면 손해~ 🌟</p>
    {data ? (
      <>
        <div className="bg-white/80 p-4 rounded-xl mt-2 text-base space-y-1 shadow">
          <div><b className="text-blue-600">핵심 트렌드:</b> {Array.isArray(data.keywords) ? data.keywords.join(', ') : data.keywords}</div>
          <div><b className="text-pink-500">트렌드 설명:</b> {data.desc}</div>
        </div>
        {Array.isArray(data.keywords) && data.keywords.length > 0 && (
          <div className="mt-6 max-w-xs mx-auto">
            <Doughnut
              data={{
                labels: data.keywords,
                datasets: [
                  {
                    label: '트렌드 키워드 비중',
                    data: data.keywords.map(() => 1), // 비중 데이터가 없으면 균등 분포
                    backgroundColor: [
                      'rgba(59,130,246,0.7)',
                      'rgba(236,72,153,0.7)',
                      'rgba(139,92,246,0.7)',
                      'rgba(34,197,94,0.7)',
                      'rgba(253,224,71,0.7)',
                      'rgba(244,63,94,0.7)',
                    ],
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: { position: 'bottom' },
                  title: { display: false },
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

export default TrendStep;
