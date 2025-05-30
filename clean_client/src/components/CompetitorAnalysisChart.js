   import { Doughnut } from 'react-chartjs-2';

   const CompetitorAnalysisChart = () => {
     const data = {
       labels: ['A사', 'B사', 'C사', 'D사', 'E사'],
       datasets: [{
         data: [30, 25, 20, 15, 10],
         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
       }]
     };

     return <Doughnut data={data} />;
   };

   export default CompetitorAnalysisChart;