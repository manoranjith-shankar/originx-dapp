import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit'; // Replace 'rainbowkit/connect-button' with the correct import path for the RainbowKit Connect Button

const Login = () => {
  const { isConnected } = useAccount();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically redirect to '/home' if the user is connected
    if (isConnected && !isRedirecting) {
      setIsRedirecting(true);
      setTimeout(() => {
        navigate('/');
      }, 2000); // Adjust the delay in milliseconds (e.g., 2000ms = 2 seconds)
    }
  }, [isConnected, isRedirecting, navigate]);

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
      isConnected(true);
    } catch (error) {
      console.error('Error connecting to provider:', error);
    }
  };

  return (
    <div className={`login-page ${isConnected ? 'connected' : ''}`}>
      <div className="login-box">
        {!isConnected ? (
          <div>
            <h1>Get Started by connecting to web3.</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <ConnectButton onClick={handleConnect} />
            </div>
          </div>
        ) : (
          <div>
            <h1>You Are Connected.</h1>
            {isRedirecting && <h2>Redirecting...</h2>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;