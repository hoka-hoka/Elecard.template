import React, { Component } from 'react';
import './Preview.scss';

export default class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = { view: 0 };
  }

  render() {
    return (
      <div className="preview">
        <div className="preview__cont"></div>
      </div>
    );
  }
}
