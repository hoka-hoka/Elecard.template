import React, { Component, Fragment } from 'react';
import Card from '../Card';
import RadioButton from '../../common/RadioButton';

import { preview, lang, langData, viewMode } from '../../constants';

import './Preview.scss';

export default class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = { catalog: props.catalog };
  }

  changeView = (item) => {
    const { updateState } = this.props;
    if (item.name == lang[langData.cards]) {
      updateState({ update: true }).view = viewMode.cards;
    } else {
      updateState({ update: true }).view = viewMode.list;
    }
  };

  truncCatalog = (catalog, index) => {
    const { currentPage } = this.props;
    const offset = (currentPage - 1) * 10;
    catalog.splice(offset + index, 1);
    return catalog;
  };

  render() {
    const { currentCards = [], updateCatalog } = this.props;
    return (
      <div className="preview">
        <div className="preview__cont">
          <div className="preview__panel">
            {preview.radioBtns.map((item) => (
              <Fragment key={item.id}>
                <div className="preview__panel-item">
                  <RadioButton
                    idFor={`action-${item.id}`}
                    btnName={item.group}
                    btnText={item.name}
                    active={item.active}
                    callback={() => {
                      this.changeView(item);
                    }}
                  />
                </div>
              </Fragment>
            ))}
          </div>
          <div className="preview__cards">
            {currentCards.map((card, index) => (
              <Card
                key={index}
                image={card.image}
                onCardClose={() =>
                  updateCatalog((catalog) => this.truncCatalog(catalog, index))
                }
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
