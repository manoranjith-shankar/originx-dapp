import React, { Component } from 'react';
import LoadingAnimation from '../components/LoadingAnimation/LoadingAnimation';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import RaffleActions from '../components/RaffleActions/RaffleActions';
import CreateRaffleBox from '../components/Misc/CreateRaffleBox';

class RaffleActionsTheme extends Component {
  state = {
    isLoading: true,
    isWalletConnected: false,
    hasError: false, // Added state variable for tracking errors
  };

  componentDidMount() {
    // Simulating data retrieval or other asynchronous tasks
    setTimeout(() => {
      // Check if the user is connected to their wallet
      if (typeof window.ethereum !== 'undefined') {
        this.setState({ isWalletConnected: true });
      } else {
        this.setState({ isWalletConnected: false });
      }

      this.setState({ isLoading: false });
    }, 2500);
  }

  // Error boundary method to catch errors in the child component
  componentDidCatch(error, info) {
    console.log('Error:', error);
    this.setState({ hasError: true });

    // Redirect to /404 page
    window.location.href = '/405';
  }

  render() {
    const { isLoading, isWalletConnected, hasError } = this.state;

    if (hasError) {
      return null; // Render nothing if an error occurs (to prevent further errors)
    }

    return (
      <div className="main">
        <Header />
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <>
            {isWalletConnected ? (
              <RaffleActions />
            ) : (
              <CreateRaffleBox />
            )}
          </>
        )}
        <Footer />
      </div>
    );
  }
}

export default RaffleActionsTheme;