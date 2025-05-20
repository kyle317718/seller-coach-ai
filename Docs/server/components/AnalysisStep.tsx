'use client';

import React from 'react';

interface AnalysisStepProps {
  title: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  content: string;
  result: string | null;
  onRetry?: () => void;
  isLast?: boolean;
}

const statusStyles = {
  pending: 'bg-yellow-50',
  processing: 'bg-blue-50',
  completed: 'bg-green-50',
  error: 'bg-red-50',
};

const statusIcons = {
  pending: '⏳',
  processing: '🔄',
  completed: '✅',
  error: '❌',
};

export const AnalysisStep: React.FC<AnalysisStepProps> = ({
  title,
  status,
  content,
  result,
  onRetry,
  isLast = false,
}) => {
  return (
    <div className={`rounded-lg p-4 mb-4 ${statusStyles[status]} relative`}>
      {/* Status indicator */}
      <div className="absolute -left-2 -top-2 w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center">
        <span role="img" aria-label={status}>
          {statusIcons[status]}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold mb-2 pl-5">{title}</h3>

      {/* Content */}
      <p className="text-gray-500 text-sm mb-3">{content}</p>

      {/* Result (if available) */}
      {result && (
        <div className="bg-white p-4 rounded border mt-2">
          <pre className="whitespace-pre-wrap text-sm">{result}</pre>
        </div>
      )}

      {/* Retry button for error state */}
      {status === 'error' && onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
        >
          재시도
        </button>
      )}

      {/* Connector line to next step */}
      {!isLast && (
        <div className="absolute left-1 bottom-0 w-0.5 h-4 bg-gray-300" style={{ transform: 'translateY(100%)' }} />
      )}
    </div>
  );
}; 