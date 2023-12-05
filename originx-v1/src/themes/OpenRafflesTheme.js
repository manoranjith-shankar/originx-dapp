import React, { Component } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import OpenRaffles from '../components/OpenRaffles/OpenRaffles';
import LoadingAnimation from '../components/LoadingAnimation/LoadingAnimation';

class OpenRafflesTheme extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    // Simulate loading delay
    setTimeout(() => {
      this.setState({ loading: false });
    }, 3500);
  }

  render() {
    const { loading } = this.state;

    return (
      <div className="main">
        <Header />
        {loading ? <LoadingAnimation /> : <OpenRaffles />}
        <Footer />
      </div>
    );
  }
}

export default OpenRafflesTheme;