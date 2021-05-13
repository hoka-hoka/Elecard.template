import React, { Component } from 'react';
import RadioButton from '../../common/RadioButton';

import { lang, langData, sroting } from '../../constants';

import './Sorting.scss';

export default class Sorting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  sortByCategory = (catalog, index) => {
    const findCategory = sroting.categories[index];
    const rezult = [...catalog];
    let amount = 0;
    rezult.forEach((_, pos) => {
      for (let i = pos; i < pos + 1; ++i) {
        if (rezult[i].category == findCategory) {
          const pullOut = rezult.splice(i, 1)[0];
          rezult.splice(amount, 0, pullOut);
          amount += 1;
        }
      }
    });
    return rezult;
  };

  render() {
    const { updateCatalog } = this.props;
    return (
      <div className="sorting">
        <div className="sorting__cont">
          <div className="sorting__category">
            <div className="sorting__title">{lang[langData.categories]}</div>
            {sroting.categories.map((category, index) => (
              <div className="sorting__item" key={index}>
                <RadioButton
                  idFor={`category-${index}`}
                  btnName="categories"
                  btnText={category}
                  active={!index}
                  callback={() =>
                    updateCatalog((catalog) =>
                      this.sortByCategory(catalog, index),
                    )
                  }
                />
              </div>
            ))}
          </div>
          <div className="sorting__date">
            <div className="sorting__title">{lang[langData.date]}</div>
          </div>
          <div className="sorting__name"></div>
          <div className="sorting__size"></div>
        </div>
      </div>
    );
  }
}
