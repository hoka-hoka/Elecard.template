import React, { Component, createRef, Fragment } from 'react';
import Card from '../Card';
import RadioButton from '../../common/RadioButton';
import Pagination from '../../common/Pagination';

import { preview, lang, langData, viewMode } from '../../constants';

import './Preview.scss';

export default class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = { catalog: props.catalog, rebuild: false };
  }

  changeView = (item) => {
    const { updateState } = this.props;
    if (item.name == lang[langData.cards]) {
      updateState({ update: true }).view = viewMode.cards;
    } else {
      updateState({ update: true }).view = viewMode.list;
    }
  };

  onPageChanged = (data) => {
    const { catalog } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentCards = catalog.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentCards, totalPages, rebuild: false });
  };

  onCardClose = (index) => {
    const { currentPage } = this.state;
    const offset = (currentPage - 1) * 10;
    this.state.catalog.splice(offset + index, 1);
    this.setState({ rebuild: true });
  };

  render() {
    const { currentCards = [], catalog, rebuild } = this.state;
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
                onCardClose={() => this.onCardClose(index)}
              />
            ))}
          </div>
          <div className="preview__pagination">
            <Pagination
              totalRecords={catalog.length}
              pageLimit={10}
              pageNeighbours={2}
              rebuild={rebuild}
              onPageChanged={this.onPageChanged}
            />
          </div>
        </div>
      </div>
    );
  }
}
