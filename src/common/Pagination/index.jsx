import React, { Component, createRef } from 'react';

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
  }

  componentDidMount() {
    this.gotoPage(1);
  }

  gotoPage = (page) => {
    const { onPageChanged = (f) => f } = this.props;
    const currentPage = Math.max(0, Math.min(page, this.totalPages));
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
    const pages = this.fetchPageNumbers();
    return (
      <nav aria-label="Countries Pagination">
        <ul>
          {pages.map((page, index) => {
            if (page == LEFT_PAGE) {
              return (
                <li key={index}>
                  <a
                    href="#"
                    aria-label="Previous"
                    onClick={this.handleMoveLeft}
                  >
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </li>
              );
            }
            if (page == RIGHT_PAGE) {
              return (
                <li key={index}>
                  <a href="#" aria-label="Next" onClick={this.handleMoveRight}>
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </a>
                </li>
              );
            }
            return (
              <li
                key={index}
                className={`page-item${currentPage === page ? ' active' : ''}`}
              >
                <a href="#" onClick={this.handleClick(page)}>
                  {page}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}
