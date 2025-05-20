'use client';

import React from 'react';
import { AnalysisStep } from '../app/pages/product-analysis';

interface ResultViewProps {
  steps: AnalysisStep[];
}

export const ResultView: React.FC<ResultViewProps> = ({ steps }) => {
  const completedSteps = steps.filter((step) => step.status === 'completed');

  const handleExport = (format: 'PDF' | 'EXCEL') => {
    // TODO: 내보내기 기능 구현
    console.log(`Exporting as ${format}...`);
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">분석 결과</h2>
        <div className="space-x-4">
          <button
            onClick={() => handleExport('PDF')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            PDF 저장
          </button>
          <button
            onClick={() => handleExport('EXCEL')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Excel 저장
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {completedSteps.map((step) => (
          <div key={step.id} className="border-b pb-6 last:border-b-0 last:pb-0">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {step.title}
            </h3>
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded">
                {step.result}
              </pre>
            </div>
          </div>
        ))}
      </div>

      {completedSteps.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          완료된 분석 결과가 없습니다.
        </div>
      )}
    </div>
  );
}; 