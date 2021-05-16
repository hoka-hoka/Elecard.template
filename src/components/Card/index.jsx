import React, { Component, createRef } from 'react';

import './Card.scss';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.card = createRef();
  }

  prepareImgPath = () => {
    const { image } = this.props;
    return `http://contest.elecard.ru/frontend_data/${image}`;
  };

  render() {
    const { onCardClose } = this.props;
    return (
      <div className="card" ref={this.card}>
        <img className="card__img" src={this.prepareImgPath()} alt="" />
        <div className="card__text">
          Yep, just some simple content ecapsulated in the card.
        </div>
        <button
          type="button"
          className="card__close"
          onClick={() => onCardClose(this.card.current)}
        />
      </div>
    );
  }
}
