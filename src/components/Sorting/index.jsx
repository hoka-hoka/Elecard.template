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
    sorting.map((item) =>
      updateCatalog((catalog) => this.sortByCategory(catalog, item, 0)),
    );
  }

  sortByCategory = (catalog, cell, optIndex) => {
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
      let sorting = catalog.sort((a, b) => {
        if (!equalToParams(a, sortParams)) {
          return 0;
        }
        if (a[cell.type] < b[cell.type]) {
          return -1;
        }
        if (a[cell.type] > b[cell.type]) {
          console.log(a, b);
          return 1;
        }
        return 0;
      });

      const sortReverse = this.sortReverse.current;
      if (Number.isInteger(sortReverse) && sortReverse != optIndex) {
        sorting = sorting.reverse();
      }
      this.sortReverse.current = optIndex;
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
      return sortingByParam();
    }
    return sortingWithoutParam();
  };

  recoverSort = () => {};

  render() {
    const { updateCatalog } = this.props;
    return (
      <div className="sorting">
        <div className="sorting__cont">
          {sorting.map((cell) => (
            <div className={`sorting__${cell.type}`} key={cell.id}>
              <div className="sorting__title">{lang[langData[cell.type]]}</div>
              {cell.names.map((opt, optIndex) => (
                <div className="sorting__item" key={optIndex}>
                  <RadioButton
                    idFor={`${cell.type}-${optIndex}`}
                    btnName={cell.type}
                    btnText={opt}
                    active={!optIndex}
                    callback={() =>
                      updateCatalog((catalog) =>
                        this.sortByCategory(catalog, cell, optIndex),
                      )
                    }
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
              {lang[langData.recover]}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
