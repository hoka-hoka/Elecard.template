import React, { Component, createRef } from 'react';
import RadioButton from '../../common/RadioButton';

import { lang, langData, sorting } from '../../constants';

import './Sorting.scss';

export default class Sorting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.sortParams = createRef();
    this.sortReverse = createRef();
  }

  componentDidMount() {
    const { updateCatalog } = this.props;
    const sortSections = sorting.map((sortSec) => {
      updateCatalog((catalog) => this.sortByOptions(catalog, sortSec, 0));
      return sortSec;
    });
    this.setState({ sortSections });
  }

  sortByOptions = (catalog, cell, optIndex) => {
    const equalToParams = (card, params) => {
      const sortKeys = Object.keys(params);
      const rezult = sortKeys.every((item) => {
        if (item == 'timestamp') {
          return card.timestamp.getFullYear() == params[item];
        }
        return card[item] == params[item];
      });
      return rezult;
    };

    const sortingByParam = () => {
      const sortParams = this.sortParams.current;
      const rezult = [...catalog];
      let amount = 0;
      rezult.forEach((_, pos) => {
        for (let i = pos; i < pos + 1; ++i) {
          if (equalToParams(rezult[i], sortParams)) {
            const pullOut = rezult.splice(i, 1)[0];
            rezult.splice(amount, 0, pullOut);
            amount += 1;
          }
        }
      });
      return rezult;
    };

    const sortingWithoutParam = () => {
      const sortParams = this.sortParams.current;
      const sortReverse = this.sortReverse.current;
      let sorting = arr.sort((a, b) => {
        if (!equalToParams(a, sortParams)) {
          return 1;
        }
        if (a[cell.type] < b[cell.type]) {
          return sortReverse ? 1 : -1;
        }
        if (a[cell.type] > b[cell.type]) {
          return sortReverse ? -1 : 1;
        }
        return 1;
      });
      return sorting;
    };

    const isParameters = [
      lang[langData.bycategory],
      lang[langData.bytimestamp],
    ].includes(cell.alias);

    if (isParameters) {
      this.sortParams.current = {
        ...this.sortParams.current,
        [cell.type]: cell.names[optIndex],
      };
    } else {
      this.sortReverse.current = optIndex;
    }

    const arr = sortingByParam();

    return sortingWithoutParam();
  };

  setActiveOption = (secIndex, optIndex) => {
    this.state.sortSections[secIndex].active = optIndex;
    this.forceUpdate();
  };

  render() {
    const { sortSections } = this.state;
    const { updateCatalog } = this.props;
    if (!sortSections) {
      return false;
    }
    return (
      <div className="sorting">
        <div className="sorting__cont">
          {sortSections.map((section, secIndex) => (
            <div className={`sorting__${section.type}`} key={section.id}>
              <div className="sorting__title">{section.alias}</div>
              {section.names.map((opt, optIndex) => (
                <div className="sorting__item" key={optIndex}>
                  <RadioButton
                    idFor={`${section.type}-${optIndex}`}
                    btnName={section.type}
                    btnText={opt}
                    active={optIndex == section.active}
                    callback={() => {
                      this.setActiveOption(secIndex, optIndex);
                      updateCatalog((catalog) =>
                        this.sortByOptions(catalog, section, optIndex),
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
          <div className="sorting__recover">
            <button
              className="btn btn_dark"
              type="button"
              onClick={this.recoverSort}
            >
              {lang[langData.discount]}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
