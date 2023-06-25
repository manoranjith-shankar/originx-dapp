import React from 'react';
import { InfinitySpin } from  'react-loader-spinner'

const LoadingAnimation = () => {
  return (
    <div className="loading-animation">
        <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
      <InfinitySpin 
        width='200'
        color="#4528DC"
        />
    </div>
    </div>
    </div>
  );
};

export default LoadingAnimation;