import React from 'react';

// 간단한 Spinner 대체 (라이브러리 Spinner로 교체 가능)
const Spinner = ({ size = 'lg' }) => (
  <div
    className={`animate-spin rounded-full border-t-4 border-b-4 border-white ${
      size === 'lg' ? 'h-16 w-16' : 'h-8 w-8'
    }`}
    style={{ borderRight: '4px solid transparent', borderLeft: '4px solid transparent' }}
  />
);

const FullScreenLoader = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <Spinner size="lg" />
  </div>
);

export default FullScreenLoader;
