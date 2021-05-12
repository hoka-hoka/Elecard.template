import React, { Component } from 'react';
import './RadioButton.scss';

export default class RadioButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handlerChange = () => {
    const { callback } = this.props;
    if (callback) {
      callback();
    }
  };

  render() {
    const { idFor, btnName, btnText, active = false } = this.props;
    return (
      <div className="radio-btn">
        <input
          className="radio-btn__field radio-btn__field_hidden"
          id={idFor}
          name={btnName}
          type="radio"
          onChange={this.handlerChange}
          defaultChecked={active}
        />
        <label className="radio-btn__label" htmlFor={idFor}>
          {btnText}
        </label>
      </div>
    );
  }
}
