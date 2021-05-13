import React, { Component } from 'react';
import Header from './Header';
import Preview from './Preview';
import Footer from './Footer';
import Sorting from './Sorting';
import Pagination from '../common/Pagination';
import Preloader from '../common/Preloader';
import Sprite from '../common/Sprite';

import { viewMode } from '../constants';

import '../scss/normalize.scss';
import './main.scss';

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = { view: viewMode.load, rebuild: false };
  }

  componentDidMount = async () => {
    this.catalog = await this.getData('/frontend_data/catalog.json');
    this.setState({ view: viewMode.cards });
  };

  getData = async (method, data) => {
    const resp = await fetch(`http://contest.elecard.ru${method}`);
    if (!resp?.ok) {
      this.setState({ error: true });
      return new Error('Ответ на запрос пустой');
    }
    return resp.json();
  };

  onPageChanged = (data) => {
    const { catalog } = this;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentCards = catalog.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentCards, totalPages, rebuild: false });
  };

  updateCatalog = (handler) => {
    if (handler && this.catalog) {
      this.catalog = handler(this.catalog);
    }
    this.setState({ rebuild: true });
  };

  updateState({ update = false }) {
    if (update) {
      this.forceUpdate();
    }
    return this.state;
  }

  render() {
    const { view, error, rebuild, currentPage, currentCards } = this.state;
    if (error) return false;
    return (
      <>
        {view == viewMode.load ? (
          <Preloader />
        ) : (
          <div className="home">
            <Header />
            <div className="home__wrapper">
              <Preview
                currentPage={currentPage}
                currentCards={currentCards}
                updateCatalog={(handler) => this.updateCatalog(handler)}
                updateState={(update) => this.updateState(update)}
              />
              <Sorting
                updateCatalog={(handler) => this.updateCatalog(handler)}
                updateState={(update) => this.updateState(update)}
              />
            </div>
            <div className="home__pagination">
              <Pagination
                totalRecords={this.catalog.length}
                pageLimit={10}
                pageNeighbours={2}
                rebuild={rebuild}
                onPageChanged={this.onPageChanged}
              />
            </div>
            <Footer />
            <Sprite />
          </div>
        )}
      </>
    );
  }
}

export default Template;
