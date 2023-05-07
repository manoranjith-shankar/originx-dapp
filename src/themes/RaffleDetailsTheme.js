import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ItemDetails from '../components/ItemDetail/ItemDetail';

class RaffleDetailsTheme extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <ItemDetails />
                <Footer />
            </div>
        );
    }
}

export default RaffleDetailsTheme;