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

      // Redirect to the desired page after successful login, for example:
      // window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error connecting to provider:', error);
    }
  };

  return (
    <div className="login-page">
      {isConnected ? (
        <div>
          <h1>Welcome!</h1>
          {/* Display user-specific content or redirect to dashboard after successful login */}
          <p>You are logged in!</p>
          {/* Example: <button onClick={() => window.location.href = '/dashboard'}>Go to Dashboard</button> */}
        </div>
      ) : (
        <div>
          <h1>Login</h1>
          <ConnectButton onClick={handleConnect} />
        </div>
      )}
    </div>
  );
};

export default Login;