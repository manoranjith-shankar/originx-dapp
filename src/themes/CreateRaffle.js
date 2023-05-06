import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Create from '../components/Create/Create';
import Footer from '../components/Footer/Footer';

class CreateRaffle extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Create />
                <Footer />
            </div>
        );
    }
}

export default CreateRaffle;