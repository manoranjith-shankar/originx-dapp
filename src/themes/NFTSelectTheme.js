import React, { Component } from 'react';
import NFTSelect from '../components/NFTSelect/NFTSelect';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

class NFTSelectTheme extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <NFTSelect />
                <Footer />
            </div>
        );
    }
}

export default NFTSelectTheme;
