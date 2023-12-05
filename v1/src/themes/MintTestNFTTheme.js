import React, { Component } from 'react';
import MintTestNFT from '../components/MintTestNFT/MintTestNFT';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

class MintTestNFTTheme extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <MintTestNFT />
                <Footer />
            </div>
        );
    }
}

export default MintTestNFTTheme;