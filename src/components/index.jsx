import React, { Component } from 'react';
import Header from './Header';
import Preview from './Preview';
import Footer from './Footer';
import Sorting from './Sorting';
import Notice from './Notice';
import Pagination from '../common/Pagination';
import Preloader from '../common/Preloader';
import Sprite from '../common/Sprite';

import { viewMode } from '../constants';

import '../scss/normalize.scss';
import './main.scss';

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = { view: viewMode.load, rebuild: false, del: {}, notice: {} };
  }

  componentDidMount = async () => {
    this.catalog = await this.getData('/frontend_data/catalog.json');
    this.prepareDate();
    this.prepareImgName();
    this.setState({ view: viewMode.cards });
  };

  prepareDate = () => {
    this.catalog = this.catalog.map((item) => {
      if (item?.timestamp) {
        item.timestamp = this.convertTimestamp(item.timestamp);
      }
      return item;
    });
  };

  prepareImgName = () => {
    this.catalog = this.catalog.map((item) => {
      if (item?.image) {
        // TODO: может быть ошибка в Safari по ретроспективной проверке в регулярном выражении
        const foundName = item.image.match(/(?<=\/).+(?=\.(png|jpg))/g);
        if (foundName?.length) {
          item.imgname = foundName[0];
        }
      }
      return item;
    });
  };

  convertTimestamp = (time) => {
    const date = new Date(time);
    const rezult = {
      year: date.getFullYear(),
      hour: date.getHours(),
      minutes: `0${date.getMinutes()}`.substr(-2),
      seconds: `0${date.getSeconds()}`.substr(-2),
    };
    return rezult;
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

  updateState({ update = false } = {}) {
    if (update) {
      this.forceUpdate();
    }
    return this.state;
  }

  render() {
    const {
      view,
      error,
      rebuild,
      currentPage,
      currentCards,
      notice,
      del,
    } = this.state;
    if (error) return false;
    return (
      <>
        {view == viewMode.load ? (
          <Preloader />
        ) : (
          <div className="home">
            <Header />
            <div className="home__wrapper">
              <Sorting
                updateCatalog={(handler) => this.updateCatalog(handler)}
                updateState={(update) => this.updateState(update)}
              />
              <Preview
                notice={notice}
                del={del}
                currentPage={currentPage}
                currentCards={currentCards}
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
            <Notice
              popupText={notice?.popupText}
              updateState={(update) => this.updateState(update)}
            />
            <Sprite />
          </div>
        )}
      </>
    );
  }
}

export default Template;
