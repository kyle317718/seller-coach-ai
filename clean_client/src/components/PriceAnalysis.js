import { Bar } from 'react-chartjs-2';

const data = {
  labels: ["최저가", "평균가", "프리미엄가", "내 제품"],
  datasets: [{
    data: [10000, 60000, 100000, 75000],
    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]
  }]
};

export default () => <Bar data={data} />;
