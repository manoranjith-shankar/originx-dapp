import React from 'react';

const ComingSoon = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#1a1a1a',
        fontFamily: 'Arial, sans-serif',
        color: '#ffffff',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          maxWidth: '600px',
          padding: '40px',
          background: '#222222',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
        }}
      >
        <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Coming Soon</h1>
        <p style={{ fontSize: '18px', marginBottom: '40px' }}>
          A NFTMint Component is being minted.
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;