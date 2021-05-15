import React, { Component, Fragment } from 'react';
import { preview, lang, langData, dataURL } from '../../constants';
import { CheckboxTree } from '../CheckboxTree';
import { Thumbnail } from '../Thumbnail';

import './ThreeList.scss';

export default class ThreeList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { listMap } = this.props;
    if (prevProps.listMap != listMap) {
      this.prepareListMap();
    }
  };

  prepareListMap = () => {
    const { listMap } = this.props;
    let depth = -1;
    const listFormatting = (elem) => {
      depth += 1;
      return elem.map((item, index) => {
        if (Array.isArray(item)) {
          return {
            childrens: listFormatting(item),
            id: `${depth}|0`,
          };
        }
        return {
          name: item?.imgname ?? '',
          data: item,
          id: `${depth}|${index + 1}`,
        };
      });
    };
    this.setState({ listMap: listFormatting([listMap]) });
  };

  createTree = () => {
    const { listMap = [] } = this.state;

    const prepareInfo = (branch, info) => {
      const d = branch.data[info.type];
      if (info.name == lang[langData.timestamp]) {
        return d.toLocaleDateString('ru-RU', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      }
      if (info.name == lang[langData.image]) {
        return (
          <Thumbnail url={`${dataURL}${d}`} idFor={`thumb-${branch.id}`} />
        );
      }
      return d;
    };

    const addInfo = (item) => {
      return (
        <div className="checkbox-tree__info">
          {preview.treeInfo.map((info) => (
            <Fragment key={info.name}>
              <div className={`checkbox-tree__title`}>{info.name}</div>
              <div className={`checkbox-tree__${info.type}`}>
                {prepareInfo(item, info)}
              </div>
            </Fragment>
          ))}
        </div>
      );
    };

    const addBranch = (listMap) => {
      return listMap.map((item, index) => {
        return (
          <li className="three-list__item" key={index}>
            <CheckboxTree
              text={item?.data ? item.data.imgname : lang[langData.section]}
              idFor={`tree-${item.id}`}
              render={() => (
                <ul className="checkbox-tree__childs">
                  {item?.childrens ? addBranch(item.childrens) : addInfo(item)}
                </ul>
              )}
            />
          </li>
        );
      });
    };
    const rezult = addBranch(listMap);
    return rezult;
  };

  render() {
    return <ul className="three-list">{this.createTree()}</ul>;
  }
}
