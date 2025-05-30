import { useState } from 'react';
import { saveAnalysis } from '@/api/sellerCoach/storage';

export default function SuccessPayment({ analysisId }: { analysisId: string }) {
  const [satisfaction, setSatisfaction] = useState(5); // 1~10점
  
  const handlePayment = async () => {
    const amount = satisfaction * 10000; // 1점당 1만원 가정
    await fetch('/api/payment', {
      method: 'POST',
      body: JSON.stringify({ analysisId, amount })
    });
    alert(`${amount.toLocaleString()}원 결제 완료!`);
  };

  return (
    <div className="space-y-4">
      <div>
        <label>분석 만족도 (1~10점): </label>
        <input
          type="number"
          min="1"
          max="10"
          value={satisfaction}
          onChange={(e) => setSatisfaction(Number(e.target.value))}
          className="ml-2 p-2 border rounded"
        />
      </div>
      <button 
        onClick={handlePayment}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {satisfaction * 10000}원 결제하기
      </button>
    </div>
  );
}
