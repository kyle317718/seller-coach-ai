import React, { useState, useRef } from 'react';
import { Upload, X, Play, Loader } from 'lucide-react';

interface AnalysisResult {
  score: number;
  feedback: string[];
  improvements: string[];
}

export const AnalysisPage = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">분석 페이지</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">분석 기능 개발 중입니다...</p>
      </div>
    </div>
  );
}; 