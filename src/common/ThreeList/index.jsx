import React, { Component, Fragment } from 'react';
import { lang, langData } from '../../constants';
import { CheckboxTree } from '../CheckboxTree';

import './ThreeList.scss';

export default class ThreeList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.prepareListMap();
  }

  prepareListMap = () => {
    const { listMap } = this.props;
    let depth = -1;
    const listFormatting = (elem) => {
      console.log(depth);
      depth += 1;
      return elem.map((item, index) => {
        if (Array.isArray(item)) {
          return {
            childrens: listFormatting(item),
            active: false,
            id: `${depth}|0`,
          };
        }
        return {
          name: item?.imgname ?? '',
          active: false,
          data: item,
          id: `${depth}|${index + 1}`,
        };
      });
    };
    // console.log(
    //   listFormatting([
    //     [
    //       { imgname: 'a' },
    //       [{ imgname: 'b' }, { imgname: 'c' }],
    //       { imgname: 'd' },
    //     ],
    //   ]),
    // );
    this.setState({ listMap: listFormatting([listMap]) });
  };

  createTree = () => {
    const { listMap = [] } = this.state;

    const addBranch = (listMap) => {
      return listMap.map((item, index) => {
        return (
          <li className="three-list__item" key={index}>
            <CheckboxTree
              text={item?.data ? item.data.imgname : lang[langData.section]}
              idFor={`${item.id}`}
              render={() => (
                <ul className="checkbox-tree__childs">
                  {item?.childrens && addBranch(item.childrens)}
                </ul>
              )}
            />
          </li>
        );
      });
    };
    // console.log(addBranch(listMap));
    const rezult = addBranch(listMap);
    return rezult;
  };

  render() {
    return (
      <ul className="three-list">
        {/* <div className="three-list__cell">
          <CheckboxTree text="Root" idFor="tree" />
        </div> */}
        {this.createTree()}
      </ul>
    );
  }
}
