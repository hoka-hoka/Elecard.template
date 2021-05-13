import React, { Component } from 'react';
import RadioButton from '../../common/RadioButton';

import { lang, langData, sroting } from '../../constants';

export default class Sorting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const categories = [lang[langData.all], ...sroting.categories];
    return (
      <div className="sorting'">
        <div className="sorting__category">
          {categories.map((category, index) => (
            <RadioButton
              key={index}
              idFor={`category-${index}`}
              btnName="categories"
              btnText={category}
              active={!index}
            />
          ))}
        </div>
        <div className="sorting__date"></div>
        <div className="sorting__name"></div>
        <div className="sorting__size"></div>
      </div>
    );
  }
}
