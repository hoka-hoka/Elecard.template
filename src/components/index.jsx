import React, { Component } from 'react';
import Header from './Header';
import Preview from './Preview';
import Footer from './Footer';
import Preloader from '../common/Preloader';
import Sprite from '../common/Sprite';

import { viewMode } from '../constants';

import '../scss/normalize.scss';
import './main.scss';

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = { view: viewMode.load };
  }

  componentDidMount = async () => {
    const resp = await this.getData('/frontend_data/catalog.json');
    this.setState({ view: viewMode.cards });
    return resp || [];
  };

  getData = async (method, data) => {
    const resp = await fetch(`http://contest.elecard.ru${method}`);
    if (!resp?.ok) {
      this.setState({ error: true });
      return new Error('Ответ на запрос пустой');
    }
    return resp.json();
  };

  updateState({ update = false }) {
    if (update) {
      this.forceUpdate();
    }
    return this.state;
  }

  render() {
    const { view } = this.state;
    return (
      <>
        {view == viewMode.load ? (
          <Preloader />
        ) : (
          <div className="home">
            <Header />
            <Preview updateState={(update) => this.updateState(update)} />
            <Footer />
            <Sprite />
          </div>
        )}
      </>
    );
  }
}

export default Template;
