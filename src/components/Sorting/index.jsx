import React, { Component, createRef } from 'react';
import RadioButton from '../../common/RadioButton';

import { lang, langData, sorting } from '../../constants';

import './Sorting.scss';

export default class Sorting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.sortParams = createRef();
  }

  componentDidMount() {
    const { updateCatalog } = this.props;
    sorting.map((item) =>
      updateCatalog((catalog) => this.sortByCategory(catalog, item, 0)),
    );
  }

  sortByCategory = (catalog, cell, optIndex) => {
    this.sortParams.current = {
      ...this.sortParams.current,
      [cell.type]: cell.names[optIndex],
    };
    const sortParams = this.sortParams.current;

    const equalToParams = (elem) => {
      const sortKeys = Object.keys(sortParams);
      const rezult = sortKeys.every((key) => {
        switch (key) {
          case 'timestamp':
            return elem[key].year == sortParams[key];
          case 'imgname':
            return true;
          default:
            return elem[key] == sortParams[key];
        }
      });
      return rezult;
    };

    const sortingByParam = () => {
      const rezult = [...catalog];
      let amount = 0;
      rezult.forEach((_, pos) => {
        for (let i = pos; i < pos + 1; ++i) {
          if (equalToParams(rezult[i])) {
            const pullOut = rezult.splice(i, 1)[0];
            rezult.splice(amount, 0, pullOut);
            amount += 1;
          }
        }
      });
      return rezult;
    };

    const sortingWithoutParam = () => {
      // const ae = equalToParams({
      //   category: 'animals',
      //   timestamp: { hour: 12, minutes: '31', seconds: '09', year: 2012 },
      //   imgname: 'decrease',
      // });
      const rezult = catalog.sort((a, b) => {
        // if (!equalToParams(a)) {
        //   return 0;
        // }
        if (a[cell.type] < b[cell.type]) {
          return -1;
        }
        if (a[cell.type] > b[cell.type]) {
          return 1;
        }
        return 0;
      });
      if (optIndex) {
        return rezult.reverse();
      }
      return rezult;
    };

    const isParameters = [
      lang[langData.category],
      lang[langData.timestamp],
    ].includes(cell.alias);
    if (isParameters) {
      return sortingByParam();
    }
    return sortingWithoutParam();
  };

  render() {
    const { updateCatalog } = this.props;
    return (
      <div className="sorting">
        <div className="sorting__cont">
          {sorting.map((cell) => (
            <div className={`sorting__${cell.type}`} key={cell.id}>
              <div className="sorting__title">{lang[langData[cell.type]]}</div>
              {cell.names.map((name, optIndex) => (
                <div className="sorting__item" key={optIndex}>
                  <RadioButton
                    idFor={`${cell.type}-${optIndex}`}
                    btnName={cell.type}
                    btnText={name}
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
        </div>
      </div>
    );
  }
}
