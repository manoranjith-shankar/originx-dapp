import React, { Component } from 'react';
import NFTSelect from '../components/NFTSelect/NFTSelect';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import LoadingAnimation from '../components/LoadingAnimation/LoadingAnimation';

class NFTSelectTheme extends Component {

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
                {loading ? <LoadingAnimation /> : <NFTSelect /> }
                <Footer />
            </div>
        );
    }
}

export default NFTSelectTheme;
