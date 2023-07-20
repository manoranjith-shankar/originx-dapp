import React, { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit'; // Replace 'rainbowkit/connect-button' with the correct import path for the RainbowKit Connect Button

const Login = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Check if the user is already connected when the component mounts
    if (window.ethereum && window.ethereum.selectedAddress) {
      setIsConnected(true);
    }
  }, []);

  const handleConnect = async () => {
    try {
      if (!window.ethereum) {
        console.warn('No provider detected. Please install MetaMask or another compatible Web3 provider.');
        return;
      }

      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Once connected, you can use the 'accounts' variable to get the connected account address
      console.log('Connected to provider:', accounts[0]);

      // Update connection status to true
      setIsConnected(true);
    } catch (error) {
      console.error('Error connecting to provider:', error);
    }
  };

  return (
    <div className={`login-page ${isConnected ? 'connected' : ''}`}>
      <div className="login-box">
        <h1>Get Started by connecting to web3</h1>
        {!isConnected ? (
          <div>
            <ConnectButton onClick={handleConnect} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Login;