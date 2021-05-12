import React, { Component } from 'react';

import './Preloader.scss';

export default class Preloader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="loader">
        <div className="loader__ring">
          <div className="loader__circle" />
          <div className="loader__circle" />
          <div className="loader__circle" />
        </div>
      </div>
    );
  }
}
