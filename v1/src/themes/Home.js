import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import Footer from '../components/Footer/Footer';
import Info from '../components/Info/Info';

class Home extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Hero />
                <Info />
                <Footer />
            </div>
        );
    }
}

export default Home;
