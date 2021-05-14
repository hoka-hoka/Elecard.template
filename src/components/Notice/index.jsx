import React, { Component, createRef } from 'react';

import './Notice.scss';

import { lang, langData } from '../../constants';

export default class Notice extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.panel = createRef();
  }

  closeModal = () => {
    const { updateState } = this.props;
    updateState({ update: true }).notice = {};
  };

  restoreDelFile = (event) => {
    const { updateState } = this.props;
    updateState({ update: true }).notice = { restore: true };
  };

  popupRef = (popupDiv) => {
    $(popupDiv).show();
    $.event.trigger({ type: 'errInit' });
  };

  render() {
    const { popupText, btn = true } = this.props;
    return (
      <>
        {popupText && (
          <div className="notice" ref={this.popupRef}>
            <div className="notice__cont">
              <img alt="" className="" src="img/notice.png" />
              <div className="notice__text">{popupText}</div>
              {btn && (
                <button
                  className="notice__btn"
                  type="button"
                  onClick={this.restoreDelFile}
                >
                  {lang[langData.recover].toUpperCase()}
                </button>
              )}
              <button className="" type="button" onClick={this.closeModal}>
                <img
                  alt="Закрыть"
                  className="notice__close"
                  src="img/close.png"
                />
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}
