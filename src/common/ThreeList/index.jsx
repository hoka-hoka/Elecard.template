import React, { Component, Fragment } from 'react';
import { CheckboxTree } from '../CheckboxTree';

import './ThreeList.scss';

export default class ThreeList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { listMap } = this.props;
  }

  createSubtree = (item) => {
    if (Array.isArray(item)) {
      this.createSubtree(item);
    }
    const rezult = <div className="">{item.imgname}</div>;
    return rezult;
  };

  render() {
    const { listMap = [] } = this.props;
    return (
      <div className="three-list">
        <div className="three-list__cell">
          <CheckboxTree />
        </div>
        {listMap.map((item, index) => (
          <Fragment key={index}>{this.createSubtree(item)}</Fragment>
        ))}
      </div>
    );
  }
}
