import React, { Component } from 'react';
import Header from './Header';
import Preview from './Preview';
import Footer from './Footer';
import Sorting from './Sorting';
import Notice from './Notice';
import Pagination from '../common/Pagination';
import Preloader from '../common/Preloader';
import Sprite from '../common/Sprite';

import { pagination } from '../constants';

import '../scss/main.scss';
import './Home.scss';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      rebuild: false,
      del: {},
      notice: {},
      pagination: { ...pagination },
    };
  }

  componentDidMount = async () => {
    this.catalog = await this.getData('/frontend_data/catalog.json');
    this.backUp = [...this.catalog];
    this.prepareDate();
    this.prepareImgName();
    this.computeCountCards();
    this.setState({ loading: false });
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
    const rezult = date;
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

  computeCountCards = (current) => {
    const { pagination } = this.state;
    const currentPage = current ?? pagination.current;
    const offset = (currentPage - 1) * pagination.limit;
    const currentCards = this.catalog.slice(offset, offset + pagination.limit);
    this.setState({
      pagination: { ...pagination, currentCards, current: currentPage },
    });
  };

  onPageChanged = (data) => {
    const { pagination, rebuild } = this.state;
    const { currentPage: current, totalPages: total } = data;
    if (rebuild || pagination.current != current) {
      this.computeCountCards(current);
    }
    this.setState({ rebuild: false });
  };

  updateCatalog = (handler, restore = false) => {
    if (handler && this.catalog && !restore) {
      this.catalog = handler(this.catalog);
    } else {
      this.catalog = this.backUp;
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
    const { loading, error, rebuild, pagination, notice, del } = this.state;
    if (error) return false;
    return (
      <>
        {loading ? (
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
                currentPage={pagination.current}
                currentCards={pagination.currentCards}
                updateCatalog={(handler) => this.updateCatalog(handler)}
                updateState={(update) => this.updateState(update)}
              />
            </div>
            <div className="home__pagination">
              <Pagination
                totalRecords={this.catalog.length}
                pageLimit={pagination.limit}
                pageNeighbours={pagination.neighbours}
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
