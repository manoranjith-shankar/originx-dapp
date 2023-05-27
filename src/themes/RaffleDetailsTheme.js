import React, { Component } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import BuyTickets from '../components/BuyTickets/BuyTickets';

class RaffleDetailsTheme extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <BuyTickets />
                <Footer />
            </div>
        );
    }
}

export default RaffleDetailsTheme;