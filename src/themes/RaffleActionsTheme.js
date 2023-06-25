import React, { Component } from 'react';
import LoadingAnimation from '../components/LoadingAnimation/LoadingAnimation';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import RaffleActions from '../components/RaffleActions/RaffleActions';

class RaffleActionsTheme extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    // Simulating data retrieval or other asynchronous tasks
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 20000);
  }

  render() {
    const { isLoading } = this.state;

    return (
      <div className="main">
        <Header />
        {isLoading ? <LoadingAnimation /> : <RaffleActions />}
        <Footer />
      </div>
    );
  }
}

export default RaffleActionsTheme;