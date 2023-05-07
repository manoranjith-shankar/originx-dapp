import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import OpenRaffles from '../components/OpenRaffles/OpenRaffles';

class OpenRafflesTheme extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <OpenRaffles />
                <Footer />
            </div>
        );
    }
}

export default OpenRafflesTheme;