import React, { Component } from 'react';
import Header from './Header';
import Preview from './Preview';
import Footer from './Footer';

import '../scss/normalize.scss';
import './main.scss';

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="home">
        <Header />
        <Preview />
        <Footer />
      </div>
    );
  }
}

export default Template;
