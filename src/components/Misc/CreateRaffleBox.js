import React from 'react';

const CreateRaffleBox = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '200px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginTop: '20px',
        textAlign: 'center',
      }}
    >
      <a
        href="/create"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          color: '#333',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
      >
        Looks like you don't have any raffles owned<br />
        Create Your First Raffle
      </a>
    </div>
  );
};

export default CreateRaffleBox;
