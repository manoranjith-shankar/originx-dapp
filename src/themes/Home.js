import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import Work from '../components/Work/Work';

class Home extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Hero />
                <Work />
            </div>
        );
    }
}

export default Home;