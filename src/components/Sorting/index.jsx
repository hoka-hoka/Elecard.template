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
    this.initSorting();
  };

  componentDidUpdate = (_, prevState) => {
    const { sortSections } = this.state;
    const { updateCatalog } = this.props;
    if (!prevState?.sortSections) {
      return;
    }

    sortSections.map((section, secIndex) => {
      if (
        prevState.sortSections[secIndex].active != sortSections[secIndex].active
      ) {
        section.names.map((name, optIndex) => {
          if (section.active == optIndex) {
            if (name == lang[langData.notset]) {
              this.initSorting({
                fullReset: true,
                startState: this.state.sortSections.map((item) => {
                  if (item.id == section.id) {
                    return { ...item, active: 0 };
                  }
                  return { ...item };
                }),
              });
            }

            updateCatalog(
              !this.fullReset
                ? (catalog) => this.sortByOptions(catalog, section, optIndex)
                : false,
              this.fullReset,
            );
          }
        });
      }
    });
    this.fullReset = false;
  };

  initSorting = ({ fullReset, startState } = {}) => {
    this.sortParams = {};
    this.sortReverse = {};
    this.fullReset = fullReset;
    const sortSections = (startState ?? sorting).map((section) => {
      return section;
    });
    this.setState({ sortSections });
  };

  sortByOptions = (catalog, section, optIndex) => {
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

    const isReversSection = () => {
      const sortReverse = this.sortReverse;
      const type = sortReverse[section.type];
      if (type == lang[langData.byincrease]) {
        return false;
      }
      return true;
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
      const rezult = arr.sort((a, b) => {
        if (!equalToParams(a, sortParams)) {
          return 1;
        }
        if (a[section.type] < b[section.type]) {
          return isReversSection() ? 1 : -1;
        }
        if (a[section.type] > b[section.type]) {
          return isReversSection() ? -1 : 1;
        }
        return 1;
      });
      return rezult;
    };

    const isParameters = [
      lang[langData.bycategory],
      lang[langData.bytimestamp],
    ].includes(section.alias);

    if (isParameters) {
      this.sortParams = {
        ...this.sortParams,
        [section.type]: section.names[optIndex],
      };
    } else {
      this.sortReverse = {
        ...this.sortReverse,
        [section.type]: section.names[optIndex],
      };
    }
    console.log(this.sortParams, this.sortReverse);
    const arr = sortingByParam();
    return sortingWithoutParam();
  };

  resetToggleSections = (section) => {
    section.active = 0;
    return section;
  };

  setActiveOption = (secIndex, actOption) => {
    const sections = this.state.sortSections.map((item) => {
      if (item.toggle) {
        return { ...this.resetToggleSections(item) };
      }
      return { ...item };
    });
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
              onClick={() => this.initSorting({ fullReset: true })}
            >
              {lang[langData.discount]}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
