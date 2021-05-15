import React, { Component } from 'react';
import RadioButton from '../../common/RadioButton';

import { lang, langData, sorting } from '../../constants';

import './Sorting.scss';

export default class Sorting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.resetSorting();
  };

  componentDidUpdate = (_, prevState) => {
    const { sortSections } = this.state;
    const { updateCatalog } = this.props;

    if (!prevState?.sortSections) {
      return;
    }

    if (prevState.sortSections != sortSections) {
      sortSections.map((section) => {
        section.names.map((_, optIndex) => {
          if (section.active == optIndex) {
            updateCatalog((catalog) =>
              this.sortByOptions(catalog, section, optIndex),
            );
          }
        });
      });
    }
  };

  resetSorting = () => {
    const { updateCatalog } = this.props;
    const sortSections = sorting.map((section) => {
      if (section.active == 0) {
        this.sortParams = {};
        this.sortReverse = 0;
        updateCatalog((catalog) => this.sortByOptions(catalog, section, 0));
      }
      return section;
    });
    this.setState({ sortSections });
  };

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
      const sortParams = this.sortParams;
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
      const sortParams = this.sortParams;
      const sortReverse = this.sortReverse;
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
      this.sortParams = {
        ...this.sortParams,
        [cell.type]: cell.names[optIndex],
      };
    } else {
      this.sortReverse = optIndex;
    }
    const arr = sortingByParam();
    return sortingWithoutParam();
  };

  setActiveOption = (secIndex, actOption) => {
    const sections = this.state.sortSections.map((item) => ({ ...item }));
    sections[secIndex].active = actOption;
    this.setState({ sortSections: sections });
  };

  render() {
    const { sortSections } = this.state;
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
                    callback={() => this.setActiveOption(secIndex, optIndex)}
                  />
                </div>
              ))}
            </div>
          ))}
          <div className="sorting__recover">
            <button
              className="btn btn_dark"
              type="button"
              onClick={this.resetSorting}
            >
              {lang[langData.discount]}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
