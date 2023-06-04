import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import RaffleActions from '../components/RaffleActions/RaffleActions';

class RaffleActionsTheme extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <RaffleActions />
                <Footer />
            </div>
        );
    }
}

export default RaffleActionsTheme;