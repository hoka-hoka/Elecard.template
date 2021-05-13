import React, { Component } from 'react';

import './Pagination.scss';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: 1 };
    const { totalRecords = 1, pageLimit = 30, pageNeighbours = 0 } = props;
    this.totalRecords = totalRecords;
    this.pageLimit = pageLimit;
    this.pageNeighbours = pageNeighbours;
    this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);
  }

  componentDidMount() {
    this.gotoPage(1);
  }

  componentDidUpdate() {
    const { currentPage } = this.state;
    const { rebuild, totalRecords } = this.props;
    this.totalPages = Math.ceil(totalRecords / this.pageLimit);
    if (rebuild) {
      this.gotoPage(currentPage);
    }
  }

  gotoPage = (page) => {
    const { onPageChanged = (f) => f } = this.props;
    const currentPage = page;
    const paginationData = {
      currentPage,
      totalPages: this.totalPages,
      pageLimit: this.pageLimit,
      totalRecords: (this.totalPages = Math.ceil(
        this.totalRecords / this.pageLimit,
      )),
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  };

  handleClick = (page) => (evt) => {
    evt.preventDefault();
    this.gotoPage(page);
  };

  handleMoveLeft = (evt) => {
    const { currentPage } = this.state;
    evt.preventDefault();
    this.gotoPage(currentPage - this.pageNeighbours * 2 - 1);
  };

  handleMoveRight = (evt) => {
    const { currentPage } = this.state;
    evt.preventDefault();
    this.gotoPage(currentPage + this.pageNeighbours * 2 + 1);
  };

  fetchPageNumbers = () => {
    const { currentPage } = this.state;

    const totalNumbers = this.pageNeighbours * 2 + 3; // допы по бокам + 2 стрелки + 1 центр
    const totalBlocks = totalNumbers + 2; // + самые боковые

    if (this.totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - this.pageNeighbours);
      const endPage = Math.min(
        this.totalPages - 1,
        currentPage + this.pageNeighbours,
      );
      let pages = this.range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = this.totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = this.range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = this.range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }
      return [1, ...pages, this.totalPages];
    }
    return this.range(1, this.totalPages);
  };

  range(from, to, step = 1) {
    let i = from;
    const rezult = [];
    while (i <= to) {
      rezult.push(i);
      i += step;
    }
    return rezult;
  }

  render() {
    if (!this.totalRecords || this.totalPages === 1) return null;
    const { currentPage } = this.state;
    return (
      <ul className="pagination" aria-label="Countries Pagination">
        {this.fetchPageNumbers().map((page, index) => {
          if (page == LEFT_PAGE) {
            return (
              <li className="pagination__item" key={index}>
                <button
                  className="pagination__btn pagination__btn_painted pagination__btn_turned"
                  type="button"
                  aria-label="Previous"
                  onClick={this.handleMoveLeft}
                >
                  <svg width="16" height="16">
                    <use xlinkHref="#arrow" />
                  </svg>
                </button>
              </li>
            );
          }
          if (page == RIGHT_PAGE) {
            return (
              <li className="pagination__item" key={index}>
                <button
                  className="pagination__btn pagination__btn_painted"
                  type="button"
                  aria-label="Next"
                  onClick={this.handleMoveRight}
                >
                  <svg width="16" height="16">
                    <use xlinkHref="#arrow" />
                  </svg>
                </button>
              </li>
            );
          }
          return (
            <li key={index} className="pagination__item">
              <button
                className={`pagination__btn${
                  currentPage === page ? ' pagination__btn_active' : ''
                }`}
                type="button"
                onClick={this.handleClick(page)}
              >
                {page}
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}
