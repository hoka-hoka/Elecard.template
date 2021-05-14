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

  componentDidUpdate = (prevProps, prevState) => {
    this.recoverDelCard(prevProps);
    this.rebuildAfterAnimation(prevState);
  };

  rebuildAfterAnimation = (prevState) => {
    const { animateStat } = this.state;
    const { updateCatalog } = this.props;
    if (animateStat && prevState?.animateStat != animateStat) {
      updateCatalog((catalog) => this.truncCatalog(catalog));
    }
  };

  plaingAnimation = (card, index) => {
    const $target = $(card);
    this.setState({ animateStat: 0 });
    $target.fadeOut(200, () => {
      this.setState({ animateStat: 1, delIndex: index });
    });
    $target.fadeIn(200);
  };

  truncCatalog = (catalog) => {
    const { delIndex } = this.state;
    const { currentPage, updateState } = this.props;
    const offset = (currentPage - 1) * 10;
    const del = catalog.splice(offset + delIndex, 1)[0];
    updateState({}).del = { index: offset + delIndex, elem: del };
    updateState({}).notice = {
      popupText: `${lang[langData.card]} ${del.imgname} была удалена`,
    };
    return catalog;
  };

  recoverDelCard = (prevProps) => {
    const { notice, del, updateCatalog } = this.props;
    if (notice?.restore && prevProps.notice?.restore != notice?.restore) {
      updateCatalog((catalog) => {
        catalog.splice(del.index, 0, del.elem);
        return catalog;
      });
    }
  };

  changeView = (item) => {
    const { updateState } = this.props;
    if (item.name == lang[langData.cards]) {
      updateState({ update: true }).view = viewMode.cards;
    } else {
      updateState({ update: true }).view = viewMode.list;
    }
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
                onCardClose={(card) => this.plaingAnimation(card, index)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
