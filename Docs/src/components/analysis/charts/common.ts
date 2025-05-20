import { Chart, Colors } from 'chart.js';

// 1. 차트 테마 설정
Chart.defaults.font.family = "'Pretendard', sans-serif";
Chart.defaults.color = '#4B5563';
Colors.setDefaults({
  backgroundColor: '#8A4FFF33',
  borderColor: '#8A4FFF',
});

// 2. 공통 스타일 객체
export const CHART_STYLE = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' as const },
    title: { 
      display: true,
      color: '#1F2937',
      font: { size: 18, weight: 'bold' }
    }
  },
  scales: {
    y: { 
      beginAtZero: true,
      grid: { color: '#E5E7EB' }
    },
    x: { 
      grid: { display: false }
    }
  }
}; 