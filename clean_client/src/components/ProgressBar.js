import React from 'react';

const ProgressBar = ({ current, total }) => (
  <div style={{ background: '#eee', borderRadius: '8px', height: '12px', width: '100%', margin: '16px 0' }}>
    <div
      style={{
        width: `${(current / total) * 100}%`,
        background: 'linear-gradient(90deg, #6a11cb, #2575fc)',
        height: '100%',
        borderRadius: '8px',
        transition: 'width 0.3s',
      }}
    />
  </div>
);

export default ProgressBar;
