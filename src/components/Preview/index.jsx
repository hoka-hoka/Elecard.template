import React, { Component, Fragment } from 'react';
import Card from '../Card';
import RadioButton from '../../common/RadioButton';
import ThreeList from '../../common/ThreeList';

import { preview, lang, langData, viewMode } from '../../constants';

import './Preview.scss';

export default class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = { catalog: props.catalog, view: viewMode.cards };
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
    if (item.name == lang[langData.cards]) {
      this.setState({ view: viewMode.cards });
    } else {
      this.setState({ view: viewMode.list });
    }
  };

  render() {
    const { view } = this.state;
    const { currentCards = [] } = this.props;
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

          <div
            className={`preview__cards${
              view != viewMode.cards ? ' preview__cards_hidden' : ''
            }`}
          >
            {currentCards.map((card, index) => (
              <Card
                key={index}
                image={card.image}
                onCardClose={(card) => this.plaingAnimation(card, index)}
              />
            ))}
          </div>

          <div
            className={`preview__list${
              view != viewMode.list ? ' preview__list_hidden' : ''
            }`}
          >
            <ThreeList listMap={currentCards} />
          </div>
        </div>
      </div>
    );
  }
}
