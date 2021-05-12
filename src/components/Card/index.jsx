import React, { Component } from 'react';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="card">
        <img className="card__img" src="" alt="" />
        <div className="card__close"></div>
        <div className="card__text"></div>
      </div>
    );
  }
}
