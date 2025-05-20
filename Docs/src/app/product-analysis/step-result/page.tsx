import { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const analysisSteps = [
  {
    title: '시장 분석',
    content: '시장 분석 내용...',
    chart: (
      <Bar
        data={{
          labels: ['A사', 'B사', 'C사'],
          datasets: [
            {
              label: '시장 점유율(%)',
              data: [40, 35, 25],
              backgroundColor: ['#8A4FFF', '#2563EB', '#10B981'],
            },
          ],
        }}
        options={{ responsive: true, plugins: { legend: { display: false } } }}
      />
    ),
  },
  {
    title: '가격 분석',
    content: '가격 분석 내용...',
    chart: (
      <Line
        data={{
          labels: ['1월', '2월', '3월', '4월', '5월'],
          datasets: [
            {
              label: '평균 가격',
              data: [20000, 22000, 21000, 25000, 24000],
              borderColor: '#8A4FFF',
              backgroundColor: '#8A4FFF22',
              tension: 0.4,
              fill: true,
            },
          ],
        }}
        options={{ responsive: true, plugins: { legend: { display: false } } }}
      />
    ),
  },
  {
    title: '경쟁사 분석',
    content: '경쟁사 분석 내용...',
    chart: (
      <Pie
        data={{
          labels: ['우리', '경쟁사1', '경쟁사2'],
          datasets: [
            {
              data: [30, 50, 20],
              backgroundColor: ['#8A4FFF', '#2563EB', '#10B981'],
            },
          ],
        }}
        options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }}
      />
    ),
  },
  // ...나머지 단계도 필요시 chart 추가
];

export default function StepAnalysisResult() {
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col items-center py-12">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#8A4FFF] to-[#2563EB] bg-clip-text text-transparent">
        AI 분석 결과 (단계별)
      </h1>
      {/* 상단 탭 */}
      <div className="flex gap-2 mb-8">
        {analysisSteps.map((s, idx) => (
          <button
            key={idx}
            className={`px-4 py-2 rounded-full font-bold transition ${
              step === idx
                ? 'bg-gradient-to-r from-[#8A4FFF] to-[#2563EB] text-white shadow'
                : 'bg-white text-gray-700 border'
            }`}
            onClick={() => setStep(idx)}
          >
            {idx + 1}단계
          </button>
        ))}
      </div>
      {/* 단계별 내용 */}
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#8A4FFF]">{analysisSteps[step].title}</h2>
        <div className="text-lg mb-6">{analysisSteps[step].content}</div>
        {/* 단계별 그래프 */}
        {analysisSteps[step].chart && (
          <div className="mb-4">{analysisSteps[step].chart}</div>
        )}
      </div>
    </div>
  );
}