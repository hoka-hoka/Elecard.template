import React, { Component } from 'react';

const { body } = document;
const sprite = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    style="display: none"
  >
    <symbol id="arrow" viewBox="0 0 17 18" width="16" height="16">
      <path d="M8.36252 0.984375L16.3781 9L8.36252 17.0156L6.95627 15.6094L12.5344 9.98438H0.346894V8.01562H12.5344L6.95627 2.39062L8.36252 0.984375Z"></path>
    </symbol>
</svg>`;

export default class Sprite extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    body.insertAdjacentHTML('beforeend', sprite);
  }

  render() {
    return <></>;
  }
}
