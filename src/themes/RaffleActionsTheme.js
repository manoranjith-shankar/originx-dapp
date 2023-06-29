import React, { Component } from 'react';
import LoadingAnimation from '../components/LoadingAnimation/LoadingAnimation';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import RaffleActions from '../components/RaffleActions/RaffleActions';

class RaffleActionsTheme extends Component {
  state = {
    isLoading: true,
    isWalletConnected: false,
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

  render() {
    const { isLoading, isWalletConnected } = this.state;

    if (isLoading) {
      return <LoadingAnimation />;
    }

    return (
      <div className="main">
        <Header />
        {isWalletConnected ? (
          <RaffleActions />
        ) : (
          <button onClick={this.connectWallet}>Connect Wallet</button>
        )}
        <Footer />
      </div>
    );
  }
}

export default RaffleActionsTheme;