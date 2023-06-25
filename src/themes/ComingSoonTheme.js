import React, { Component } from 'react';

import ComingSoon from '../components/ComingSoon/ComingSoon';
import Header from '../components/Header/Header';
class ComingSoonTheme extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <ComingSoon />
            </div>
        );
    }
}

export default ComingSoonTheme;